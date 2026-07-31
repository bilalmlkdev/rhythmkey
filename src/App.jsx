import React, { useEffect, useMemo, useRef } from "react";
import { Routes, Route, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Keyboard from "./components/ui/keyboard/Keyboard";
import ResultScreen from "./components/Result/ResultScreen";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import TopSettingsBar from "./components/typing/TopSettingsBar";
import LiveStats from "./components/typing/LiveStats";
import TypingArea from "./components/typing/TypingArea";
import RestartPrompt from "./components/typing/RestartPrompt";
import KeyDisplay from "./components/typing/KeyDisplay";
import CustomTextModal from "./components/modals/CustomTextModal";

import { useTheme } from "./hooks/useTheme";
import { useTypingTest } from "./hooks/useTypingTest";
import { useSettings } from "./hooks/useSettings";
import { useStats } from "./hooks/useStats";
import StatsPage from "./pages/StatsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { theme, setTheme, isLight } = useTheme();
  const {
    settings,
    updateSetting,
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
    showKeyboard,
    setShowKeyboard,
    showLiveStats,
    setShowLiveStats,
    showNextWord,
    setShowNextWord,
  } = useSettings();

  const [showSettingsModal, setShowSettingsModal] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showCustomTextModal, setShowCustomTextModal] = React.useState(false);
  const [lastKeyPressed, setLastKeyPressed] = React.useState("");

  // ---- Parse URL params for initial config ----
  const initialConfig = useMemo(() => {
    const type = searchParams.get("type") || "time";
    const time = parseInt(searchParams.get("time")) || 30;
    const words = parseInt(searchParams.get("words")) || 10;
    const story = searchParams.get("story") || "medium";
    const punctuation = searchParams.get("punctuation") === "true";
    const numbers = searchParams.get("numbers") === "true";
    const symbols = searchParams.get("symbols") === "true";
    const difficulty = searchParams.get("difficulty") || "easy";
    return { type, time, words, story, punctuation, numbers, symbols, difficulty };
  }, []);

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
    initialConfig, // pass parsed config
  });

  const { saveResult } = useStats();

  // Tab key state for shortcuts
  const tabPressedRef = useRef(false);

  // Store previous test type for revert logic
  const previousTestTypeRef = useRef("time");

  // Compute WPM and Accuracy
  const activeEndTime = state.endTime || Date.now();
  const timeElapsed = state.startTime
    ? (activeEndTime - state.startTime) / 60000
    : 1 / 60;
  const wpm = Math.round(state.userInput.length / 5 / (timeElapsed || 0.001));
  const accuracy =
    state.userInput.length > 0
      ? Math.round(
          ((state.userInput.length - state.mistakes) / state.userInput.length) *
            100,
        )
      : 100;

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

  // Save stats when test finishes
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

  // Global Keyboard Shortcuts (Settings, Stats)
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
  }, []);

  // Track previous test type when switching to custom
  useEffect(() => {
    if (config.testType !== "custom") {
      previousTestTypeRef.current = config.testType;
    }
  }, [config.testType]);

  // When testType becomes "custom", open modal if no custom text is set
  useEffect(() => {
    if (config.testType === "custom") {
      if (!state.customText) {
        setShowCustomTextModal(true);
      }
    } else {
      setShowCustomTextModal(false);
    }
  }, [config.testType, state.customText]);

  // ---- Sync config to URL (except custom) ----
  useEffect(() => {
    if (config.testType === "custom") return; // skip for custom
    const params = new URLSearchParams();
    params.set("type", config.testType);
    if (config.testType === "time") params.set("time", config.selectedTime);
    if (config.testType === "words") params.set("words", config.wordCount);
    if (config.testType === "stories") params.set("story", config.storyLength);
    params.set("punctuation", config.hasPunctuation ? "true" : "false");
    params.set("numbers", config.hasNumbers ? "true" : "false");
    params.set("symbols", config.hasSymbols ? "true" : "false");
    params.set("difficulty", config.difficulty);
    // Only update if the params actually changed to avoid infinite loops
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

  // Main keydown listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (state.appState === "finished" || showSettingsModal) return;

      // ---- Tab handling (modifier for shortcuts) ----
      if (e.key === "Tab") {
        e.preventDefault(); // prevent focus change
        tabPressedRef.current = true;
        return;
      }

      // ---- Pause toggle (Tab + Space) ----
      if (tabPressedRef.current && e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
        return;
      }

      // ---- Restart (Tab + Enter, or Enter alone when input empty) ----
      if (e.key === "Enter") {
        if (tabPressedRef.current) {
          e.preventDefault();
          if (settings.restartConfirmation) {
            if (!window.confirm("Restart the test?")) return;
          }
          actions.restartTest(false);
          return;
        } else if (state.userInput.length === 0) {
          e.preventDefault();
          if (settings.restartConfirmation) {
            if (!window.confirm("Restart the test?")) return;
          }
          actions.restartTest(false);
          return;
        }
        // Otherwise, Enter does nothing (no newline in typing)
      }

      // ---- If paused, ignore all typing keys ----
      if (isPaused) return;

      // ---- Unfocus handling ----
      if (state.appState === "unfocused") {
        state.setAppState("idle");
        actions.resetIdleTimer();
        return;
      }

      // ---- Normal typing ----
      actions.resetIdleTimer();

      actions.setIsTypingActive(true);
      clearTimeout(actions.typingTimeoutRef.current);
      actions.typingTimeoutRef.current = setTimeout(() => {
        actions.setIsTypingActive(false);
      }, 1000);

      // ---- Update last pressed key ----
      setLastKeyPressed(e.key);

      if (e.key.length === 1) {
        actions.setTotalKeystrokes((prev) => prev + 1);

        if (state.appState === "idle") {
          state.setAppState("typing");
          actions.setStartTime(Date.now());
        }

        const expectedChar = state.currentText[state.userInput.length];
        if (settings.practiceMode && e.key !== expectedChar) {
          // In practice mode, incorrect key is ignored
          return;
        }

        if (e.key !== expectedChar) actions.setMistakes((m) => m + 1);

        actions.setUserInput((prev) => {
          const newVal = prev + e.key;

          if (config.testType === "words") {
            const typedWords = newVal.trim().split(/\s+/).length;
            if (typedWords === config.wordCount && newVal.trim() !== "") {
              actions.setEndTime(Date.now());
              state.setAppState("finished");
              actions.setIsTypingActive(false);
              clearTimeout(actions.typingTimeoutRef.current);
              clearTimeout(actions.idleTimeoutRef.current);
              if (actions.timerIntervalRef.current) {
                clearInterval(actions.timerIntervalRef.current);
                actions.timerIntervalRef.current = null;
              }
            }
          } else if (
            config.testType === "stories" ||
            config.testType === "quotes"
          ) {
            if (newVal.length === state.currentText.length) {
              actions.setEndTime(Date.now());
              state.setAppState("finished");
              actions.setIsTypingActive(false);
              clearTimeout(actions.typingTimeoutRef.current);
              clearTimeout(actions.idleTimeoutRef.current);
              if (actions.timerIntervalRef.current) {
                clearInterval(actions.timerIntervalRef.current);
                actions.timerIntervalRef.current = null;
              }
            }
          }
          // For time mode, the test ends when timer hits 0, not here.
          return newVal;
        });
      } else if (e.key === "Backspace") {
        actions.setUserInput((prev) => {
          if (prev.length > 0) {
            actions.setBackspaceCount((c) => c + 1);
            return prev.slice(0, -1);
          }
          return prev;
        });
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Tab") {
        tabPressedRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    state.appState,
    state.userInput,
    state.currentText,
    config.testType,
    config.wordCount,
    actions,
    showSettingsModal,
    isPaused,
    settings.practiceMode,
    settings.restartConfirmation,
  ]);

  // Active word index
  const activeWordIdx = wordsList.findIndex(
    (w) => state.userInput.length >= w.start && state.userInput.length <= w.end,
  );
  const currentIdx =
    activeWordIdx !== -1
      ? activeWordIdx
      : state.userInput.length === 0
        ? 0
        : wordsList.length - 1;

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  const handleCustomTextStart = (text) => {
    actions.setCustomText(text);
    actions.setIsCustomTextReady(true);
    actions.restartTest(false);
  };

  // ---- Share URL ----
  const shareUrl = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert("URL copied to clipboard!");
      });
    } else {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("URL copied to clipboard!");
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            className={`min-h-screen ${
              isLight ? "bg-[#FFFFFF] text-zinc-800" : "bg-[#111113] text-[#5e5e5e]"
            } font-grotesk flex flex-col justify-between selection:bg-orange-500/30 transition-colors duration-200`}
            ref={refs.containerRef}
          >
            <Header
              restartTest={actions.restartTest}
              totalKeystrokes={state.totalKeystrokes}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              showSettingsModal={showSettingsModal}
              setShowSettingsModal={setShowSettingsModal}
              isLight={isLight}
              theme={theme}
              setTheme={setTheme}
              showKeyboard={showKeyboard}
              setShowKeyboard={setShowKeyboard}
              soundVolume={soundVolume}
              setSoundVolume={setSoundVolume}
              showLiveStats={showLiveStats}
              setShowLiveStats={setShowLiveStats}
              showNextWord={showNextWord}
              setShowNextWord={setShowNextWord}
              settings={settings}
              updateSetting={updateSetting}
              onShare={shareUrl} // NEW prop
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
                    showLiveStats={showLiveStats}
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
                    showNextWord={showNextWord}
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
                  />

                  <RestartPrompt
                    appState={state.appState}
                    isTypingActive={state.isTypingActive}
                    restartTest={actions.restartTest}
                    isLight={isLight}
                    isPaused={isPaused}
                    onPauseToggle={handlePauseToggle}
                  />

                  {showKeyboard && (
                    <div
                      className={`transition-opacity duration-300 mt-1 ${
                        state.appState === "typing" && state.isTypingActive
                          ? "opacity-40"
                          : "opacity-100"
                      }`}
                    >
                      <Keyboard
                        soundEnabled={soundEnabled}
                        soundVolume={soundVolume}
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
                if (config.testType === "custom" && !state.customText) {
                  config.setTestType(previousTestTypeRef.current);
                }
              }}
              onStart={handleCustomTextStart}
              isLight={isLight}
            />
          </div>
        }
      />

      <Route path="/stats" element={<StatsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
