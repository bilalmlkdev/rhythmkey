import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Settings,
  Github,
  MousePointer2,
} from "lucide-react";
import Keyboard from "./components/ui/Keyboard";
import ResultScreen from "./components/Result/ResultScreen";
import { WORDS } from "./data/words";
import { NUMBERS } from "./data/numbers";
import { SYMBOLS } from "./data/symbols";

 import { BsArrowCounterclockwise } from "react-icons/bs";
 import SettingsModal from "./components/SettingsModal";
import { Clock, Quote } from "lucide-react";

// Story and Quote banks
const STORY_SMALL = [
  "The quick brown fox jumps over the lazy dog near the river bank.",
  "Pack my box with five dozen liquor jugs.",
];
const STORY_MEDIUM = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Life is what happens when you're busy making other plans.",
];
const STORY_LARGE = [
  "The future belongs to those who believe in the beauty of their dreams. Entrepreneurship is living a few years of your life like most people won't, so that you can spend the rest of your life like most people can't. The only way to do great work is to love what you do. In the middle of difficulty lies opportunity.",
];

const QUOTES = [
  "I think, therefore I am.",
  "To be, or not to be, that is the question.",
  "That which does not kill us makes us stronger.",
  "The only thing we have to fear is fear itself.",
  "In three words I can sum up everything I've learned about life: it goes on.",
];

export default function App() {
  // --- Config States ---
  const [hasPunctuation, setHasPunctuation] = useState(false);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasSymbols, setHasSymbols] = useState(false);
  const [difficulty, setDifficulty] = useState("easy"); // "easy" | "hard" | "extra_hard"

  // Test Modes: 'time' | 'words' | 'stories' | 'quotes' | 'infinite'
  const [testType, setTestType] = useState("time");
  const [wordCount, setWordCount] = useState(10);
  const [storyLength, setStoryLength] = useState("medium");
  const [selectedTime, setSelectedTime] = useState(30);

  // --- Settings Panel States ---
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [theme, setTheme] = useState("dark"); // "dark" | "light" | "system"
  const [resolvedTheme, setResolvedTheme] = useState("dark");
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.08);
  const [showLiveStats, setShowLiveStats] = useState(true);
  const [showNextWord, setShowNextWord] = useState(true);

  // Theme resolver for system preference
  useEffect(() => {
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: light)");
      setResolvedTheme(media.matches ? "light" : "dark");
      const listener = (e) => setResolvedTheme(e.matches ? "light" : "dark");
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const isLight = resolvedTheme === "light";

  // App States: 'unfocused', 'idle', 'typing', 'finished'
  const [appState, setAppState] = useState("unfocused");
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [endTime, setEndTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);

  // Line scrolling and tracking for 3-line fixed view
  const [lineOffset, setLineOffset] = useState(0);
  const activeWordRef = useRef(null);
  const innerContainerRef = useRef(null);

  // History tracking for the dynamic graph
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
    const saved = localStorage.getItem("totalKeystrokes");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [textKey, setTextKey] = useState(0);
  const [isTypingActive, setIsTypingActive] = useState(false);
  const typingTimeoutRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const containerRef = useRef(null);


  useEffect(() => {
    localStorage.setItem("totalKeystrokes", totalKeystrokes.toString());
  }, [totalKeystrokes]);

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

  // Generate text based on current test type and configurations
  const generateNewText = useCallback(
    (countOverride = null) => {
      if (testType === "stories") {
        let bank = [];
        if (storyLength === "small") bank = STORY_SMALL;
        else if (storyLength === "medium") bank = STORY_MEDIUM;
        else if (storyLength === "large") bank = STORY_LARGE;
        return bank[Math.floor(Math.random() * bank.length)];
      }

      if (testType === "quotes") {
        return QUOTES[Math.floor(Math.random() * QUOTES.length)];
      }

      let pool = [];
      let wordPool = WORDS;
      if (difficulty === "easy") {
        wordPool = WORDS.filter((w) => w.length <= 5);
        if (wordPool.length === 0) wordPool = WORDS;
      } else if (difficulty === "hard") {
        wordPool = WORDS.filter((w) => w.length > 5 && w.length <= 8);
        if (wordPool.length === 0) wordPool = WORDS;
      } else if (difficulty === "extra_hard") {
        wordPool = WORDS.filter((w) => w.length > 8);
        if (wordPool.length === 0) wordPool = WORDS;
      }

      pool.push(...wordPool);
      if (hasNumbers) pool.push(...NUMBERS);
      if (hasSymbols) pool.push(...SYMBOLS);
      if (pool.length === 0) pool = WORDS;

      let totalWords = countOverride !== null ? countOverride : 35;
      if (testType === "words") totalWords = wordCount;
      else if (testType === "infinite") totalWords = 250;

      let generated = [];
      for (let i = 0; i < totalWords; i++) {
        generated.push(pool[Math.floor(Math.random() * pool.length)]);
      }

      let textString = generated.join(" ");
      if (hasPunctuation) {
        textString =
          textString.charAt(0).toUpperCase() + textString.slice(1) + ".";
      }
      return textString;
    },
    [
      testType,
      wordCount,
      storyLength,
      difficulty,
      hasNumbers,
      hasSymbols,
      hasPunctuation,
    ],
  );

  useEffect(() => {
    setUserInput("");
    setMistakes(0);
    setBackspaceCount(0);
    setStartTime(null);
    setEndTime(null);
    setHistory([]);
    setLineOffset(0);
    setCurrentText(generateNewText());
    setTextKey((prev) => prev + 1);

    if (testType === "time") {
      setTimeLeft(selectedTime);
    } else {
      setTimeLeft(0);
    }

    setAppState((prev) => {
      if (prev === "typing" || prev === "finished") return "idle";
      return prev;
    });

    clearTimeout(typingTimeoutRef.current);
    clearTimeout(idleTimeoutRef.current);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, [
    testType,
    wordCount,
    storyLength,
    difficulty,
    hasPunctuation,
    hasNumbers,
    hasSymbols,
    selectedTime,
    generateNewText,
  ]);

  useEffect(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (appState === "typing" && testType === "time") {
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
  }, [appState, testType]);

  useEffect(() => {
    let graphInterval;
    if (appState === "typing") {
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
  }, [appState]);

  useEffect(() => {
    if (testType === "infinite" && appState === "typing") {
      if (userInput.length > currentText.length - 100) {
        const chunk = generateNewText(50);
        setCurrentText((prev) => prev + " " + chunk);
      }
    }
  }, [userInput, testType, appState, currentText.length, generateNewText]);

  useEffect(() => {
    if (activeWordRef.current && innerContainerRef.current) {
      const top = activeWordRef.current.offsetTop;
      const lineHeight = 40;
      const currentLine = Math.floor(top / lineHeight);
      if (currentLine >= 2) {
        setLineOffset((currentLine - 1) * lineHeight);
      } else {
        setLineOffset(0);
      }
    }
  }, [userInput]);

  const resetIdleTimer = useCallback(() => {
    clearTimeout(idleTimeoutRef.current);
    if (appState !== "finished" && appState !== "unfocused") {
      idleTimeoutRef.current = setTimeout(() => {
        setAppState("unfocused");
      }, 5000);
    }
  }, [appState]);

  useEffect(() => {
    if (appState === "idle" || appState === "typing") {
      resetIdleTimer();
    } else {
      clearTimeout(idleTimeoutRef.current);
    }
    return () => clearTimeout(idleTimeoutRef.current);
  }, [appState, resetIdleTimer]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (appState === "finished" || showSettingsModal) return;

      if (appState === "unfocused") {
        setAppState("idle");
        resetIdleTimer();
        return;
      }

      resetIdleTimer();

      setIsTypingActive(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTypingActive(false);
      }, 1000);

      if (e.key === "Tab" || (e.key === "Enter" && userInput.length === 0)) {
        e.preventDefault();
        restartTest(false);
        return;
      }

      if (e.key.length === 1) {
        setTotalKeystrokes((prev) => prev + 1);

        if (appState === "idle") {
          setAppState("typing");
          setStartTime(Date.now());
        }

        const expectedChar = currentText[userInput.length];
        if (e.key !== expectedChar) setMistakes((m) => m + 1);

        setUserInput((prev) => {
          const newVal = prev + e.key;

          if (testType === "words") {
            const typedWords = newVal.trim().split(/\s+/).length;
            if (typedWords === wordCount && newVal.trim() !== "") {
              setEndTime(Date.now());
              setAppState("finished");
              setIsTypingActive(false);
              clearTimeout(typingTimeoutRef.current);
              clearTimeout(idleTimeoutRef.current);
              if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
              }
            }
          } else if (
            testType === "stories" ||
            testType === "quotes" ||
            testType === "time"
          ) {
            if (newVal.length === currentText.length) {
              setEndTime(Date.now());
              setAppState("finished");
              setIsTypingActive(false);
              clearTimeout(typingTimeoutRef.current);
              clearTimeout(idleTimeoutRef.current);
              if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
              }
            }
          }

          return newVal;
        });
      } else if (e.key === "Backspace") {
        setUserInput((prev) => {
          if (prev.length > 0) {
            setBackspaceCount((c) => c + 1);
            return prev.slice(0, -1);
          }
          return prev;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    appState,
    userInput,
    currentText,
    testType,
    wordCount,
    resetIdleTimer,
    showSettingsModal,
  ]);

  const restartTest = useCallback(
    (keepPreviousText = false) => {
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(idleTimeoutRef.current);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      setIsTypingActive(false);
      setAppState("idle");
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
        setCurrentText(generateNewText());
      }
      setTextKey((prev) => prev + 1);
    },
    [testType, selectedTime, generateNewText],
  );

  const activeEndTime = endTime || Date.now();
  const timeElapsed = startTime ? (activeEndTime - startTime) / 60000 : 1 / 60;
  const wpm = Math.round(userInput.length / 5 / (timeElapsed || 0.001));
  const accuracy =
    userInput.length > 0
      ? Math.round(((userInput.length - mistakes) / userInput.length) * 100)
      : 100;

  const correctChars = userInput
    .split("")
    .filter((char, i) => char === currentText[i]).length;
  const incorrectChars = mistakes;
  const totalChars = currentText.length;

  const wordsList = [];
  let charIdxCounter = 0;
  currentText.split(" ").forEach((w, i, arr) => {
    const wordStr = i < arr.length - 1 ? w + " " : w;
    wordsList.push({
      word: wordStr,
      start: charIdxCounter,
      end: charIdxCounter + wordStr.length,
    });
    charIdxCounter += wordStr.length;
  });

  const activeWordIdx = wordsList.findIndex(
    (w) => userInput.length >= w.start && userInput.length <= w.end,
  );
  const currentIdx =
    activeWordIdx !== -1
      ? activeWordIdx
      : userInput.length === 0
        ? 0
        : wordsList.length - 1;

  // for indicator

  return (
    <div
      className={`min-h-screen  ${
        isLight ? "bg-white text-zinc-800" : "bg-[#111113] text-[#5e5e5e]"
      } font-grotesk flex flex-col selection:bg-orange-500/30 transition-colors duration-200`}
      ref={containerRef}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 max-w-[1084px] w-full mx-auto">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => restartTest(false)}
        >
          <span className="text-[#e26928] text-xl font-bold tracking-tighter">
            keythm
          </span>
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-[#e26928] rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-[#e26928] rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-[#e26928] rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-[#e26928] rounded-sm opacity-50"></div>
          </div>
        </div>
        <div className="hidden md:block relative left-30 text-xs text-white">
          {totalKeystrokes.toLocaleString()}{" "}
          <span className="opacity-50 tracking-wide">thocks and counting</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-3.5 py-[7px] rounded-full transition-colors text-[13px] tracking-tight font-medium cursor-pointer ${
              isLight
                ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
                : "bg-[#1c1c1f] hover:bg-[#252529] text-zinc-300"
            } ${soundEnabled ? "opacity-100" : "opacity-30"}`}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {soundEnabled ? "Audio On" : "Audio Off"}
          </button>
          <button
            onClick={() => setShowSettingsModal(true)}
            className={`flex items-center gap-2 px-3.5 py-[7px] rounded-full transition-colors text-[13px] tracking-tight font-medium cursor-pointer ${
              isLight
                ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
                : "bg-[#1c1c1f] hover:bg-[#252529] text-zinc-300"
            }`}
          >
            <Settings size={14} /> Settings{" "}
            <span
              className={`py-0.5 px-1.5 rounded-[5px] text-[10px] ${
                isLight
                  ? "bg-zinc-200 text-zinc-600"
                  : "bg-[#2b2b2f] text-zinc-300"
              }`}
            >
              ⌘K
            </span>
          </button>
          <button
            className={`flex items-center gap-2 px-4.5 py-[6px] rounded-full transition-colors text-[13px] tracking-tight font-medium cursor-pointer ${
              isLight
                ? "bg-zinc-900 hover:bg-black text-white"
                : "bg-white hover:bg-white/90 text-zinc-900"
            }`}
          >
            <Github size={14} /> GitHub
          </button>
        </div>
      </header>
      {/* Main Area */}
      <main className="flex-1 flex flex-col items-center w-full max-w-[1200px] mx-auto px-8 pt-1">
        {appState !== "finished" ? (
          <>
            {/* Top Settings Bar */}
            <div
              className={`flex flex-wrap items-center justify-center gap-3 mb-10  transition-opacity duration-300 ${
                appState === "typing" && isTypingActive
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              {/* --- Pill 1: Modifiers --- */}
              <div
                className={`flex gap-4 items-center rounded-[15px] px-5 py-2.5 text-[10px] ${
                  isLight
                    ? "bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm"
                    : "bg-[#18181b] border border-zinc-800/50 text-zinc-400 shadow-lg"
                }`}
              >
                <button
                  onClick={() => setHasPunctuation(!hasPunctuation)}
                  className={`${
                    hasPunctuation
                      ? "text-[#e26928]"
                      : isLight
                        ? "hover:text-zinc-900"
                        : "hover:text-zinc-300"
                  } transition-colors cursor-pointer`}
                >
                  @ punctuation
                </button>
                <button
                  onClick={() => setHasNumbers(!hasNumbers)}
                  className={`${
                    hasNumbers
                      ? "text-[#e26928]"
                      : isLight
                        ? "hover:text-zinc-900"
                        : "hover:text-zinc-300"
                  } transition-colors cursor-pointer`}
                >
                  # numbers
                </button>
                <button
                  onClick={() => setHasSymbols(!hasSymbols)}
                  className={`${
                    hasSymbols
                      ? "text-[#e26928]"
                      : isLight
                        ? "hover:text-zinc-900"
                        : "hover:text-zinc-300"
                  } transition-colors cursor-pointer`}
                >
                  & symbols
                </button>

                {/* Internal divider */}
                <div
                  className={`w-px h-4 mx-1 ${
                    isLight ? "bg-zinc-200" : "bg-zinc-800"
                  }`}
                ></div>

                <button
                  onClick={() => setDifficulty("easy")}
                  className={`${
                    difficulty === "easy"
                      ? "text-[#e26928]"
                      : isLight
                        ? "hover:text-zinc-900"
                        : "hover:text-zinc-300"
                  } transition-colors cursor-pointer`}
                >
                  easy
                </button>
                <button
                  onClick={() => setDifficulty("hard")}
                  className={`${
                    difficulty === "hard"
                      ? "text-[#e26928]"
                      : isLight
                        ? "hover:text-zinc-900"
                        : "hover:text-zinc-300"
                  } transition-colors cursor-pointer`}
                >
                  hard
                </button>
                <button
                  onClick={() => setDifficulty("extra_hard")}
                  className={`${
                    difficulty === "extra_hard"
                      ? "text-[#e26928]"
                      : isLight
                        ? "hover:text-zinc-900"
                        : "hover:text-zinc-300"
                  } transition-colors cursor-pointer`}
                >
                  extra hard
                </button>
              </div>

              {/* --- Pill 2: Mode Selectors --- */}
              <div
                className={`flex gap-1 items-center rounded-[15px] px-1.5 py-1 text-[10px] ${
                  isLight
                    ? "bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm"
                    : "bg-[#18181b] border border-zinc-800/50 text-zinc-400 shadow-lg"
                }`}
              >
                <button
                  onClick={() => setTestType("time")}
                  className={`inline-flex items-center gap-1 px-2.5 py-[6px] rounded-[10px] transition-all duration-200 ${
                    testType === "time"
                      ? "bg-[#e26928] text-white shadow-sm"
                      : isLight
                        ? "text-zinc-600 hover:text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-300"
                  } cursor-pointer`}
                >
                  <Clock size={12} />
                  time
                </button>

                <button
                  onClick={() => setTestType("words")}
                  className={`inline-flex items-center gap-1 px-2.5 py-[6px] rounded-[10px]  transition-all duration-200 ${
                    testType === "words"
                      ? "bg-[#e26928] text-white shadow-sm"
                      : isLight
                        ? "text-zinc-600 hover:text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-300"
                  } cursor-pointer`}
                >
                  Aa words
                </button>

                <button
                  onClick={() => setTestType("stories")}
                  className={`inline-flex items-center gap-1 px-2.5 py-[6px] rounded-[10px]  transition-all duration-200 ${
                    testType === "stories"
                      ? "bg-[#e26928] text-white shadow-sm"
                      : isLight
                        ? "text-zinc-600 hover:text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-300"
                  } cursor-pointer`}
                >
                  stories
                </button>

                <button
                  onClick={() => setTestType("quotes")}
                  className={`inline-flex items-center gap-1 px-2.5 py-[6px] rounded-[10px]  transition-all duration-200 ${
                    testType === "quotes"
                      ? "bg-[#e26928] text-white shadow-sm"
                      : isLight
                        ? "text-zinc-600 hover:text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-300"
                  } cursor-pointer`}
                >
                  <Quote size={12} />
                  quotes
                </button>

                <button
                  onClick={() => setTestType("infinite")}
                  className={`inline-flex items-center gap-1 px-2.5 py-[6px] rounded-[10px]  transition-all duration-200 ${
                    testType === "infinite"
                      ? "bg-[#e26928] text-white shadow-sm"
                      : isLight
                        ? "text-zinc-600 hover:text-zinc-900"
                        : "text-zinc-400 hover:text-zinc-300"
                  } cursor-pointer`}
                >
                  infinite
                </button>
              </div>

              {/* --- Pill 3: Dynamic Config Limits --- */}
              <div
                className={`flex gap-2 items-center rounded-[15px]  px-1.5 py-1 text-[10px]  ${
                  isLight
                    ? "bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm"
                    : "bg-[#18181b] border border-zinc-800/50 text-zinc-400 shadow-lg"
                }`}
              >
                {testType === "time" &&
                  [5, 10, 15, 30, 60, 120].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`inline-flex items-center gap-3 px-2 py-[6px] rounded-[8px] transition-all duration-200 ${
                        selectedTime === t
                          ? "bg-[#e26928] text-white shadow-sm"
                          : isLight
                            ? "text-zinc-600 hover:text-zinc-900"
                            : "text-zinc-400 hover:text-zinc-300"
                      } cursor-pointer`}
                    >
                      {t}s
                    </button>
                  ))}

                {testType === "words" &&
                  [10, 25, 50, 100].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWordCount(w)}
                      className={`inline-flex items-center gap-3 px-2 py-[6px] rounded-[8px] transition-all duration-200 ${
                        wordCount === w
                          ? "bg-[#e26928] text-white shadow-sm"
                          : isLight
                            ? "text-zinc-600 hover:text-zinc-900"
                            : "text-zinc-400 hover:text-zinc-300"
                      } cursor-pointer`}
                    >
                      {w}
                    </button>
                  ))}

                {testType === "stories" &&
                  ["Small", "Medium", "Large"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStoryLength(s.toLowerCase())}
                      className={`inline-flex items-center gap-3 px-4 py-[6px] rounded-[8px] transition-all duration-200 ${
                        storyLength === s.toLowerCase()
                          ? "bg-[#e26928] text-white shadow-sm"
                          : isLight
                            ? "text-zinc-600 hover:text-zinc-900"
                            : "text-zinc-400 hover:text-zinc-300"
                      } cursor-pointer`}
                    >
                      {s}
                    </button>
                  ))}

                {(testType === "infinite" || testType === "quotes") && (
                  <span className="text-zinc-400 px-2">—</span>
                )}
              </div>
            </div>

            {/* Live Stats Bar */}
            {showLiveStats && (
              <div
                className={`w-full max-w-5xl flex justify-end items-center text-[18px] font-bold tracking-tight px-4 transition-opacity duration-300 ${
                  appState === "typing" ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`text-lg ${
                      isLight ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    {testType === "time" && (
                      <span>
                        <span className="text-[#e26928]">{timeLeft}s</span>
                      </span>
                    )}
                    {testType === "words" && (
                      <span className="text-[#e26928]">
                        {userInput.trim() === ""
                          ? 0
                          : userInput.trim().split(/\s+/).length}{" "}
                        / {wordCount}
                      </span>
                    )}
                    {(testType === "stories" || testType === "quotes") && (
                      <span className="text-[#e26928]">
                        {userInput.length} / {currentText.length}
                      </span>
                    )}
                    {testType === "infinite" && (
                      <span className="text-zinc-400">♾️</span>
                    )}
                  </div>
                  <div className={isLight ? "text-zinc-800" : "text-[#d4d4d8]"}>
                    {wpm}{" "}
                    <span
                      className={`text-sm font-medium ${
                        isLight ? "text-zinc-400" : "text-[#5e5e5e]"
                      }`}
                    >
                      wpm
                    </span>
                  </div>
                  <div className={isLight ? "text-zinc-800" : "text-[#d4d4d8]"}>
                    {accuracy}{" "}
                    <span
                      className={`text-sm font-medium ${
                        isLight ? "text-zinc-400" : "text-[#5e5e5e]"
                      }`}
                    >
                      % acc
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Typing Area (Fixed 3-Line View with Smooth Line Shifting & Dimmed Next Words) */}
            <div
              key={textKey}
              className="relative w-full max-w-5xl h-[120px] overflow-hidden text-[23px] tracking-wide mb-2 leading-[40px] select-none"
            >
              {appState === "unfocused" && (
                <div
                  className={`absolute inset-0 flex items-center justify-center z-10 backdrop-blur-[2px] rounded-lg ${
                    isLight ? "bg-white/70" : "bg-[#111113]/60"
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 text-sm tracking-wide font-normal cursor-pointer ${
                      isLight ? "text-zinc-700" : "text-zinc-300"
                    }`}
                  >
                    <MousePointer2 size={16} /> Click or press any key to focus
                  </div>
                </div>
              )}

              <div
                ref={innerContainerRef}
                className={`${
                  appState === "unfocused" ? "blur-[3px] opacity-40" : ""
                } transition-transform duration-200 ease-out font-mono flex flex-wrap`}
                style={{ transform: `translateY(-${lineOffset}px)` }}
              >
                {wordsList.map((wObj, wordIdx) => {
                  const { word, start, end } = wObj;
                  const isCurrentWord =
                    userInput.length >= start && userInput.length <= end;
                  const isFutureWord = wordIdx > currentIdx;

                  // If Show Next Words is disabled, dim future words instead of hiding them completely
                  const wordOpacityClass =
                    !showNextWord && isFutureWord
                      ? "opacity-15 transition-opacity duration-150"
                      : "opacity-100";

                  const typedPart = userInput.slice(start, end);
                  const isWordError =
                    typedPart
                      .split("")
                      .some((char, idx) => char !== word[idx]) ||
                    typedPart.length > word.length;

                  return (
                    <span
                      key={wordIdx}
                      ref={isCurrentWord ? activeWordRef : null}
                      className={`inline-block whitespace-nowrap mr-[0.5em] ${wordOpacityClass} ${
                        isWordError ? "border-b-2 border-[#e26928]" : ""
                      }`}
                    >
                      {word.split("").map((char, charIdx) => {
                        const globalIdx = start + charIdx;
                        const typedChar = userInput[globalIdx];
                        const isTyped = globalIdx < userInput.length;
                        const isCursor =
                          globalIdx === userInput.length &&
                          appState !== "unfocused";

                        let colorClass = isLight
                          ? "text-zinc-400"
                          : "text-[#5e5e5e]";
                        if (isTyped) {
                          colorClass =
                            typedChar === char
                              ? isLight
                                ? "text-zinc-900 font-medium"
                                : "text-[#d4d4d8]"
                              : "text-[#e26928] border-b-2 border-[#e26928]";
                        }

                        return (
                          <span
                            key={charIdx}
                            className={`${colorClass} ${
                              isCursor
                                ? "border-l-2 border-[#e26928] animate-pulse -ml-[2px]"
                                : ""
                            }`}
                          >
                            {char}
                          </span>
                        );
                      })}
                      {isCurrentWord && userInput.length > end && (
                        <span className="text-[#e26928] bg-red-900/20 underline">
                          {userInput.slice(end)}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Restart Instructions */}
            <div
              className={`flex flex-col items-center gap-3 mb-6 transition-opacity duration-300 ${
                appState === "typing" && isTypingActive
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <button
                onClick={() => restartTest(false)}
                className={`transition-colors p-2 rounded-full cursor-pointer ${
                  isLight
                    ? "text-[#5e5e5e] hover-text-black"
                    : "text-zinc-400 hover:text-white hover:brightness-150 "
                }`}
              >
                <BsArrowCounterclockwise size={20} className="-rotate-45" />
              </button>
              <div className="flex items-center gap-1.5 mt-1 text-[10px] tracking-wide font-normal">
                <span
                  className={`px-2 py-0.5 rounded ${
                    isLight
                      ? "bg-zinc-200 text-zinc-700"
                      : "bg-[#2b2b2f8d] text-zinc-400"
                  }`}
                >
                  tab
                </span>
                <span>+</span>
                <span
                  className={`px-2 py-0.5 rounded ${
                    isLight
                      ? "bg-zinc-200 text-zinc-700"
                      : "bg-[#2b2b2f8d] text-zinc-400"
                  }`}
                >
                  enter
                </span>
                <span>restart</span>
              </div>
            </div>

            {/* Mechanical Keyboard */}
            {showKeyboard && (
              <div
                className={`transition-opacity duration-300 ${
                  appState === "typing" && isTypingActive
                    ? "opacity-40"
                    : "opacity-100"
                }`}
              >
                <Keyboard
                  soundEnabled={soundEnabled}
                  soundVolume={soundVolume}
                />
              </div>
            )}
          </>
        ) : (
          <ResultScreen
            wpm={wpm}
            accuracy={accuracy}
            correctChars={correctChars}
            incorrectChars={incorrectChars}
            totalChars={totalChars}
            corrections={backspaceCount}
            selectedTime={testType === "time" ? selectedTime : timeElapsed * 60}
            timeLeft={testType === "time" ? timeLeft : 0}
            testType={testType}
            history={history}
            onRestart={() => restartTest(true)}
            onNextTest={() => restartTest(false)}
          />
        )}
      </main>
      {/* Footer */}
      <footer
        className={`text-center py-6 text-xs tracking-wide relative bottom-0.5 ${
          isLight ? "text-zinc-400" : "text-[#5e5e5e]"
        }`}
      >
        Built by{" "}
        <span className={isLight ? "text-zinc-700" : "text-zinc-400"}>
          Bilal Malik
        </span>
        . The source code is available on{" "}
        <span className={isLight ? "text-zinc-700" : "text-zinc-400"}>
          GitHub
        </span>
        .
      </footer>
      {/* --- Settings Panel Popup (inset-0) --- */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        isLight={isLight}
        theme={theme}
        setTheme={setTheme}
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        soundVolume={soundVolume}
        setSoundVolume={setSoundVolume}
        showLiveStats={showLiveStats}
        setShowLiveStats={setShowLiveStats}
        showNextWord={showNextWord}
        setShowNextWord={setShowNextWord}
      />
    </div>
  );
}
