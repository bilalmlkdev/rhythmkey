import React, { useEffect } from "react";
import Keyboard from "./components/ui/Keyboard";
import ResultScreen from "./components/Result/ResultScreen";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import TopSettingsBar from "./components/typing/TopSettingsBar";
import LiveStats from "./components/typing/LiveStats";
import TypingArea from "./components/typing/TypingArea";
import RestartPrompt from "./components/typing/RestartPrompt";

import { useTheme } from "./hooks/useTheme";
import { useTypingTest } from "./hooks/useTypingTest";

export default function App() {
  const { theme, setTheme, isLight } = useTheme();
  const { config, state, refs, actions } = useTypingTest();

  const [showSettingsModal, setShowSettingsModal] = React.useState(false);
  const [showKeyboard, setShowKeyboard] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true); // Default sound on
  const [soundVolume, setSoundVolume] = React.useState(0.8); // Default 80% volume
  const [showLiveStats, setShowLiveStats] = React.useState(true);
  const [showNextWord, setShowNextWord] = React.useState(true);

  // Global Keyboard Shortcut for Settings (⌘K / Ctrl+K)
  useEffect(() => {
    const handleGlobalShortcuts = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSettingsModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, []);

  // Main keydown listener for typing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (state.appState === "finished" || showSettingsModal) return;

      if (state.appState === "unfocused") {
        state.setAppState("idle");
        actions.resetIdleTimer();
        return;
      }

      actions.resetIdleTimer();

      actions.setIsTypingActive(true);
      clearTimeout(actions.typingTimeoutRef.current);
      actions.typingTimeoutRef.current = setTimeout(() => {
        actions.setIsTypingActive(false);
      }, 1000);

      if (
        e.key === "Tab" ||
        (e.key === "Enter" && state.userInput.length === 0)
      ) {
        e.preventDefault();
        actions.restartTest(false);
        return;
      }

      if (e.key.length === 1) {
        actions.setTotalKeystrokes((prev) => prev + 1);

        if (state.appState === "idle") {
          state.setAppState("typing");
          actions.setStartTime(Date.now());
        }

        const expectedChar = state.currentText[state.userInput.length];
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
            config.testType === "quotes" ||
            config.testType === "time"
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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    state.appState,
    state.userInput,
    state.currentText,
    config.testType,
    config.wordCount,
    actions,
    showSettingsModal,
  ]);

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

  const wordsList = [];
  let charIdxCounter = 0;
  state.currentText.split(" ").forEach((w, i, arr) => {
    const wordStr = i < arr.length - 1 ? w + " " : w;
    wordsList.push({
      word: wordStr,
      start: charIdxCounter,
      end: charIdxCounter + wordStr.length,
    });
    charIdxCounter += wordStr.length;
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
            />

            <RestartPrompt
              appState={state.appState}
              isTypingActive={state.isTypingActive}
              restartTest={actions.restartTest}
              isLight={isLight}
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
    </div>
  );
}
