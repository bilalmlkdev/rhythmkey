import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { generateText } from "../utils/textGenerator";

export function useTypingTest({
  idleTimeout = 5,
  autoFocus = true,
  isPaused = false,
  initialConfig = {},
} = {}) {
  // states
  const [hasPunctuation, setHasPunctuation] = useState(
    initialConfig.punctuation ?? false,
  );
  const [hasNumbers, setHasNumbers] = useState(initialConfig.numbers ?? false);
  const [hasSymbols, setHasSymbols] = useState(initialConfig.symbols ?? false);
  const [difficulty, setDifficulty] = useState(
    initialConfig.difficulty ?? "easy",
  );

  const [testType, setTestType] = useState(initialConfig.type ?? "time");
  const [wordCount, setWordCount] = useState(initialConfig.words ?? 10);
  const [storyLength, setStoryLength] = useState(
    initialConfig.story ?? "medium",
  );
  const [selectedTime, setSelectedTime] = useState(initialConfig.time ?? 30);

  const [appState, setAppState] = useState(autoFocus ? "idle" : "unfocused");
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [endTime, setEndTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);

  const [lineOffset, setLineOffset] = useState(0);
  const activeWordRef = useRef(null);
  const innerContainerRef = useRef(null);
  const containerRef = useRef(null);

  const [history, setHistory] = useState([]);
  const statsRef = useRef({ userInputLength: 0, mistakes: 0, startTime: null });

  useEffect(() => {
    statsRef.current = {
      userInputLength: userInput.length,
      mistakes,
      startTime,
    };
  }, [userInput, mistakes, startTime]);

  const [totalKeystrokes, setTotalKeystrokes] = useState(() => {
    const saved = localStorage.getItem("RhythmKey_totalKeystrokes");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [textKey, setTextKey] = useState(0);
  const [isTypingActive, setIsTypingActive] = useState(false);
  const typingTimeoutRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // NEW – custom text loaded from localStorage
  const [customText, setCustomText] = useState(() => {
    const saved = localStorage.getItem("RhythmKey_customText");
    return saved || "";
  });
  const [isCustomTextReady, setIsCustomTextReady] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "RhythmKey_totalKeystrokes",
      totalKeystrokes.toString(),
    );
  }, [totalKeystrokes]);

  // save customText whenever it changes
  useEffect(() => {
    localStorage.setItem("RhythmKey_customText", customText);
  }, [customText]);

  const getNewText = useCallback(
    (countOverride = null) => {
      if (testType === "custom") {
        return customText || "Please paste your custom text.";
      }
      return generateText({
        testType,
        wordCount,
        storyLength,
        difficulty,
        hasNumbers,
        hasSymbols,
        hasPunctuation,
        countOverride,
        language: "en",
      });
    },
    [
      testType,
      wordCount,
      storyLength,
      difficulty,
      hasNumbers,
      hasSymbols,
      hasPunctuation,
      customText,
    ],
  );

  const restartTest = useCallback(
    (keepPreviousText = false) => {
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(idleTimeoutRef.current);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      setIsTypingActive(false);
      setAppState((prev) => (prev === "unfocused" ? "unfocused" : "idle"));
      setUserInput("");
      setStartTime(null);
      setEndTime(null);
      setMistakes(0);
      setBackspaceCount(0);
      setHistory([]);
      setLineOffset(0);

      if (testType === "time") setTimeLeft(selectedTime);
      else setTimeLeft(0);

      if (!keepPreviousText) {
        setCurrentText(getNewText());
      }
      setTextKey((prev) => prev + 1);
    },
    [testType, selectedTime, getNewText],
  );

  // Regenerate the test whenever the user changes a test-configuration
  // option (word count, difficulty, time, etc). This is reacting to
  // external config changes, not deriving state from other state — the
  // lint rule can't distinguish that from the risky pattern.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    restartTest(false);
  }, [
    testType,
    wordCount,
    storyLength,
    difficulty,
    hasPunctuation,
    hasNumbers,
    hasSymbols,
    selectedTime,
    restartTest,
  ]);

  // Custom text
  // Syncs currentText to the user-provided customText whenever either
  // changes — legitimate external sync, not derivable during render.
  useEffect(() => {
    if (testType === "custom" && customText) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentText(customText);
      setTextKey((prev) => prev + 1);
    }
  }, [testType, customText]);

  // Timer for time mode - now respects pause
  useEffect(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (appState === "typing" && testType === "time" && !isPaused) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
            setEndTime(Date.now());
            setAppState("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [appState, testType, isPaused]);

  // Graph history - now respects pause
  useEffect(() => {
    let graphInterval;
    if (appState === "typing" && !isPaused) {
      graphInterval = setInterval(() => {
        const { userInputLength, mistakes, startTime } = statsRef.current;
        if (!startTime) return;

        const now = Date.now();
        const elapsedMins = (now - startTime) / 60000;
        const currentWpm = Math.round(userInputLength / 5 / elapsedMins) || 0;
        const currentAcc =
          userInputLength > 0
            ? Math.round(((userInputLength - mistakes) / userInputLength) * 100)
            : 100;

        setHistory((prev) => {
          const newTime = Math.round((now - startTime) / 1000);
          if (prev.length > 0 && prev[prev.length - 1].time === newTime)
            return prev;
          return [
            ...prev,
            { time: newTime, wpm: currentWpm, accuracy: currentAcc },
          ];
        });
      }, 1000);
    }
    return () => clearInterval(graphInterval);
  }, [appState, isPaused]);

  // Infinite mode text generation
  // Extends currentText as the user approaches the end of it — reacts to
  // userInput (an external, user-driven value) and calls the impure
  // getNewText(), so it can't be computed directly during render.
  useEffect(() => {
    if (testType === "infinite" && appState === "typing") {
      if (userInput.length > currentText.length - 100) {
        const chunk = getNewText(50);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentText((prev) => prev + " " + chunk);
        setTextKey((prev) => prev + 1);
      }
    }
  }, [userInput, testType, appState, currentText.length, getNewText]);

  // Line offset calculation — follows userInput to scroll the typing
  // area as the user types past the visible line. Intentionally lags
  // behind input by one render, which is the correct scroll-follow
  // behavior; not derivable synchronously during render.
  const lineHeight = 40;
  const charWidth = 14;
  const containerWidth = 1024;
  const charsPerLine = Math.floor(containerWidth / charWidth);

  useEffect(() => {
    if (userInput.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLineOffset(0);
      return;
    }
    const currentLine = Math.floor(userInput.length / charsPerLine);
    const targetLine = 1;
    const newOffset = Math.max(0, (currentLine - targetLine) * lineHeight);
    setLineOffset(newOffset);
  }, [userInput, charsPerLine, lineHeight]);

  // Idle timer
  const resetIdleTimer = useCallback(() => {
    clearTimeout(idleTimeoutRef.current);
    if (appState !== "finished" && appState !== "unfocused") {
      idleTimeoutRef.current = setTimeout(() => {
        setAppState("unfocused");
      }, idleTimeout * 1000);
    }
  }, [appState, idleTimeout]);

  useEffect(() => {
    if (appState === "idle" || appState === "typing") {
      resetIdleTimer();
    } else {
      clearTimeout(idleTimeoutRef.current);
    }
    return () => clearTimeout(idleTimeoutRef.current);
  }, [appState, resetIdleTimer]);

  // Click to focus
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        if (appState === "unfocused") {
          setAppState("idle");
        }
        resetIdleTimer();
      }
    };

    window.addEventListener("mousedown", handleGlobalClick);
    return () => window.removeEventListener("mousedown", handleGlobalClick);
  }, [appState, resetIdleTimer]);

  const actions = useMemo(
    () => ({
      restartTest,
      setUserInput,
      setMistakes,
      setBackspaceCount,
      setStartTime,
      setEndTime,
      setHistory,
      setLineOffset,
      setTotalKeystrokes,
      setIsTypingActive,
      typingTimeoutRef,
      idleTimeoutRef,
      timerIntervalRef,
      resetIdleTimer,
      setCustomText,
      setIsCustomTextReady,
    }),
    [restartTest, resetIdleTimer],
  );

  return {
    config: {
      hasPunctuation,
      setHasPunctuation,
      hasNumbers,
      setHasNumbers,
      hasSymbols,
      setHasSymbols,
      difficulty,
      setDifficulty,
      testType,
      setTestType,
      wordCount,
      setWordCount,
      storyLength,
      setStoryLength,
      selectedTime,
      setSelectedTime,
    },
    state: {
      appState,
      setAppState,
      currentText,
      userInput,
      startTime,
      timeLeft,
      endTime,
      mistakes,
      backspaceCount,
      history,
      textKey,
      isTypingActive,
      totalKeystrokes,
      lineOffset,
      customText,
      isCustomTextReady,
    },
    refs: {
      containerRef,
      innerContainerRef,
      activeWordRef,
    },
    actions,
  };
}
