import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Keyboard from "../components/ui/keyboard/Keyboard";
import ResultScreen from "../components/Result/ResultScreen";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopSettingsBar from "../components/typing/TopSettingsBar";
import LiveStats from "../components/typing/LiveStats";
import TypingArea from "../components/typing/TypingArea";
import RestartPrompt from "../components/typing/RestartPrompt";
import KeyDisplay from "../components/typing/KeyDisplay";
import CustomTextModal from "../components/modals/CustomTextModal";
import { useTypingTest } from "../hooks/useTypingTest";
import { useSettings } from "../hooks/useSettings";
import { useStats } from "../hooks/useStats";
import { useTypingHandlers } from "../hooks/useTypingHandlers";

// wrong sound import
import wrongSound from "../sounds/wrong.mp3";

export default function MainPage({ isLight, theme, setTheme }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // unified settings
  const { settings, updateSetting, resetSettings } = useSettings();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCustomTextModal, setShowCustomTextModal] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState("");

  // Parse URL params
  const initialConfig = useMemo(() => {
    const type = searchParams.get("type") || "time";
    const time = parseInt(searchParams.get("time")) || 30;
    const words = parseInt(searchParams.get("words")) || 50;
    const story = searchParams.get("story") || "medium";
    const punctuation = searchParams.get("punctuation") === "true";
    const numbers = searchParams.get("numbers") === "true";
    const symbols = searchParams.get("symbols") === "true";
    const difficulty = searchParams.get("difficulty") || "easy";
    return {
      type,
      time,
      words,
      story,
      punctuation,
      numbers,
      symbols,
      difficulty,
    };
  }, [searchParams]);

  const { config, state, refs, actions } = useTypingTest({
    idleTimeout: settings.idleTimeout,
    practiceMode: settings.practiceMode,
    cursorStyle: settings.cursorStyle,
    fontSize: settings.fontSize,
    mistakeHighlight: settings.mistakeHighlight,
    soundPack: settings.soundPack,
    language: settings.language,
    autoFocus: settings.autoFocus,
    isPaused,
    initialConfig,
  });

  const { saveResult } = useStats();
  const tabPressedRef = useRef(false);
  const previousTestTypeRef = useRef("time");
  const customTextSubmittedRef = useRef(false);

  // Memoised WPM and accuracy
  const activeEndTime = state.endTime || Date.now();
  const timeElapsed = state.startTime
    ? (activeEndTime - state.startTime) / 60000
    : 1 / 60;
  const wpm = useMemo(
    () => Math.round(state.userInput.length / 5 / (timeElapsed || 0.001)),
    [state.userInput.length, timeElapsed],
  );
  const accuracy = useMemo(
    () =>
      state.userInput.length > 0
        ? Math.round(
            ((state.userInput.length - state.mistakes) /
              state.userInput.length) *
              100,
          )
        : 100,
    [state.userInput.length, state.mistakes],
  );

  const correctChars = state.userInput
    .split("")
    .filter((char, i) => char === state.currentText[i]).length;
  const incorrectChars = state.mistakes;
  const totalChars = state.currentText.length;

  // Memoize words list
  const wordsList = useMemo(() => {
    const list = [];
    let charIdxCounter = 0;
    state.currentText.split(" ").forEach((w, i, arr) => {
      const wordStr = i < arr.length - 1 ? w + " " : w;
      list.push({
        word: wordStr,
        start: charIdxCounter,
        end: charIdxCounter + wordStr.length,
      });
      charIdxCounter += wordStr.length;
    });
    return list;
  }, [state.currentText]);

  // Save stats on finish
  useEffect(() => {
    if (state.appState === "finished") {
      const timeTaken =
        config.testType === "time"
          ? config.selectedTime - state.timeLeft
          : (state.endTime - state.startTime) / 1000;
      saveResult({
        wpm,
        accuracy,
        testType: config.testType,
        timeTaken: Math.round(timeTaken),
        date: new Date().toISOString(),
      });
    }
  }, [
    state.appState,
    saveResult,
    wpm,
    accuracy,
    config.testType,
    config.selectedTime,
    state.timeLeft,
    state.endTime,
    state.startTime,
  ]);

  // Global shortcuts
  useEffect(() => {
    const handleGlobalShortcuts = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSettingsModal((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        navigate("/stats");
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, [navigate]);

  // Track previous test type
  useEffect(() => {
    if (config.testType !== "custom") {
      previousTestTypeRef.current = config.testType;
      actions.setCustomText("");
      actions.setIsCustomTextReady(false);
    }
  }, [config.testType, actions]);

  // Show custom modal when needed
  useEffect(() => {
    if (config.testType === "custom") {
      if (!state.customText) {
        customTextSubmittedRef.current = false;
        setShowCustomTextModal(true);
      }
    } else {
      setShowCustomTextModal(false);
    }
  }, [config.testType, state.customText]);

  // Sync URL (except custom)
  useEffect(() => {
    if (config.testType === "custom") return;
    const params = new URLSearchParams();
    params.set("type", config.testType);
    if (config.testType === "time") params.set("time", config.selectedTime);
    if (config.testType === "words") params.set("words", config.wordCount);
    if (config.testType === "stories") params.set("story", config.storyLength);
    params.set("punctuation", config.hasPunctuation ? "true" : "false");
    params.set("numbers", config.hasNumbers ? "true" : "false");
    params.set("symbols", config.hasSymbols ? "true" : "false");
    params.set("difficulty", config.difficulty);

    const currentParams = new URLSearchParams(searchParams);
    if (currentParams.toString() !== params.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [
    config.testType,
    config.selectedTime,
    config.wordCount,
    config.storyLength,
    config.hasPunctuation,
    config.hasNumbers,
    config.hasSymbols,
    config.difficulty,
    searchParams,
    setSearchParams,
  ]);

  // wrong sound player
  const [wrongAudio, setWrongAudio] = useState(null);
  useEffect(() => {
    if (!settings.soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      fetch(wrongSound)
        .then((res) => res.arrayBuffer())
        .then((buf) => ctx.decodeAudioData(buf))
        .then((decoded) => {
          setWrongAudio({ ctx, buffer: decoded });
        })
        .catch(console.error);
    } catch (e) {
      console.error(e);
    }
  }, [settings.soundEnabled]);

  const playWrongSound = () => {
    if (!settings.soundEnabled || !wrongAudio) return;
    try {
      const { ctx, buffer } = wrongAudio;
      if (ctx.state === "suspended") ctx.resume();
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(settings.soundVolume, ctx.currentTime);
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch (e) {
      console.error(e);
    }
  };

  // Typing handlers with playWrongSound
  useTypingHandlers({
    state,
    config,
    actions,
    isPaused,
    showSettingsModal,
    settings,
    setLastKeyPressed,
    setIsPaused,
    showCustomTextModal,
    playWrongSound, // NEW
  });

  const activeWordIdx = wordsList.findIndex(
    (w) => state.userInput.length >= w.start && state.userInput.length <= w.end,
  );
  const currentIdx =
    activeWordIdx !== -1
      ? activeWordIdx
      : state.userInput.length === 0
        ? 0
        : wordsList.length - 1;

  const handlePauseToggle = () => setIsPaused((prev) => !prev);

  const handleCustomTextStart = (text) => {
    customTextSubmittedRef.current = true;
    actions.setCustomText(text);
    actions.setIsCustomTextReady(true);
    setShowCustomTextModal(false);
    actions.restartTest(false);
  };

  // Url share logic
  const shareUrl = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isLight ? "bg-[#FFFFFF] text-zinc-800" : "bg-[#111113] text-[#5e5e5e]"
      } font-grotesk flex flex-col justify-between selection:bg-orange-500/30 transition-colors duration-200`}
      ref={refs.containerRef}
    >
      <Header
        restartTest={actions.restartTest}
        totalKeystrokes={state.totalKeystrokes}
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
        isLight={isLight}
        theme={theme}
        setTheme={setTheme}
       // passing settings and updateSetting
        settings={settings}
        updateSetting={updateSetting}
        onShare={shareUrl}
        resetSettings={resetSettings}
      />

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto px-8">
        {state.appState !== "finished" ? (
          <div className="w-full flex flex-col items-center justify-center">
            <TopSettingsBar
              appState={state.appState}
              isTypingActive={state.isTypingActive}
              isLight={isLight}
              hasPunctuation={config.hasPunctuation}
              setHasPunctuation={config.setHasPunctuation}
              hasNumbers={config.hasNumbers}
              setHasNumbers={config.setHasNumbers}
              hasSymbols={config.hasSymbols}
              setHasSymbols={config.setHasSymbols}
              difficulty={config.difficulty}
              setDifficulty={config.setDifficulty}
              testType={config.testType}
              setTestType={config.setTestType}
              selectedTime={config.selectedTime}
              setSelectedTime={config.setSelectedTime}
              wordCount={config.wordCount}
              setWordCount={config.setWordCount}
              storyLength={config.storyLength}
              setStoryLength={config.setStoryLength}
            />

            <LiveStats
              showLiveStats={settings.showLiveStats} // from settings
              appState={state.appState}
              isLight={isLight}
              testType={config.testType}
              timeLeft={state.timeLeft}
              userInput={state.userInput}
              wordCount={config.wordCount}
              currentText={state.currentText}
              wpm={wpm}
              accuracy={accuracy}
              isPaused={isPaused}
            />

            <TypingArea
              textKey={state.textKey}
              appState={state.appState}
              isLight={isLight}
              innerContainerRef={refs.innerContainerRef}
              lineOffset={state.lineOffset}
              wordsList={wordsList}
              userInput={state.userInput}
              showNextWord={settings.showNextWord} //  from settings
              activeWordRef={refs.activeWordRef}
              currentIdx={currentIdx}
              mistakeHighlight={settings.mistakeHighlight}
              cursorStyle={settings.cursorStyle}
              fontSize={settings.fontSize}
            />

            <KeyDisplay
              lastKey={
                state.appState === "typing" && state.isTypingActive && !isPaused
                  ? lastKeyPressed
                  : ""
              }
              isLight={isLight}
              showKeyboard={settings.showKeyboard} // NEW
            />

            <RestartPrompt
              appState={state.appState}
              isTypingActive={state.isTypingActive}
              restartTest={actions.restartTest}
              isLight={isLight}
              isPaused={isPaused}
              onPauseToggle={handlePauseToggle}
            />

            {settings.showKeyboard && ( //  from settings
              <div
                className={`transition-opacity duration-300 mt-1 ${
                  state.appState === "typing" && state.isTypingActive
                    ? "opacity-40"
                    : "opacity-100"
                }`}
              >
                <Keyboard
                  soundEnabled={settings.soundEnabled}
                  soundVolume={settings.soundVolume}
                  isLight={isLight}
                  layout={settings.keyboardLayout}
                />
              </div>
            )}
          </div>
        ) : (
          <ResultScreen
            wpm={wpm}
            accuracy={accuracy}
            correctChars={correctChars}
            incorrectChars={incorrectChars}
            totalChars={totalChars}
            corrections={state.backspaceCount}
            selectedTime={
              config.testType === "time"
                ? config.selectedTime
                : timeElapsed * 60
            }
            timeLeft={config.testType === "time" ? state.timeLeft : 0}
            testType={config.testType}
            history={state.history}
            onRestart={() => actions.restartTest(true)}
            onNextTest={() => actions.restartTest(false)}
            isLight={isLight}
          />
        )}
      </main>

      {state.appState !== "finished" && <Footer isLight={isLight} />}

      <CustomTextModal
        isOpen={showCustomTextModal}
        onClose={() => {
          setShowCustomTextModal(false);
          if (
            config.testType === "custom" &&
            !state.customText &&
            !customTextSubmittedRef.current
          ) {
            config.setTestType(previousTestTypeRef.current);
          }
        }}
        onStart={handleCustomTextStart}
        isLight={isLight}
      />
    </div>
  );
}
