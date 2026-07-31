import { useEffect, useRef } from "react";

export function useTypingHandlers({
  state,
  config,
  actions,
  isPaused,
  showSettingsModal,
  settings,
  setLastKeyPressed,
  setIsPaused,
  showCustomTextModal,
  playWrongSound,
}) {
  const tabPressedRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showCustomTextModal) return;

      if (state.appState === "finished" || showSettingsModal) return;

      if (e.key === "Tab") {
        e.preventDefault();
        tabPressedRef.current = true;
        return;
      }

      if (tabPressedRef.current && e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
        return;
      }

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
      }

      if (isPaused) return;

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

      setLastKeyPressed(e.key);

      if (e.key.length === 1) {
        actions.setTotalKeystrokes((prev) => prev + 1);

        if (state.appState === "idle") {
          state.setAppState("typing");
          actions.setStartTime(Date.now());
        }

        const expectedChar = state.currentText[state.userInput.length];
        if (settings.practiceMode && e.key !== expectedChar) {
          return;
        }

        //  this plays wrong sound when mistake occurs
        if (e.key !== expectedChar) {
          actions.setMistakes((m) => m + 1);
          if (playWrongSound) playWrongSound();
        }

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
            config.testType === "custom"
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
    setLastKeyPressed,
    setIsPaused,
    showCustomTextModal,
    playWrongSound, 
  ]);
}
