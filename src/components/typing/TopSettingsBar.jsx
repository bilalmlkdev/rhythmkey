import React from "react";
import { Clock, Quote } from "lucide-react";

export default function TopSettingsBar({
  appState,
  isTypingActive,
  isLight,
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
  selectedTime,
  setSelectedTime,
  wordCount,
  setWordCount,
  storyLength,
  setStoryLength,
}) {
  const handleBlurClick = (e, callback) => {
    e.currentTarget.blur();
    callback();
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 relative bottom-6 transition-opacity duration-300 ${
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
          onClick={(e) =>
            handleBlurClick(e, () => setHasPunctuation(!hasPunctuation))
          }
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
          onClick={(e) => handleBlurClick(e, () => setHasNumbers(!hasNumbers))}
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
          onClick={(e) => handleBlurClick(e, () => setHasSymbols(!hasSymbols))}
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

        <div
          className={`w-px h-4 mx-1 ${isLight ? "bg-zinc-200" : "bg-zinc-800"}`}
        ></div>

        <button
          onClick={(e) => handleBlurClick(e, () => setDifficulty("easy"))}
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
          onClick={(e) => handleBlurClick(e, () => setDifficulty("hard"))}
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
          onClick={(e) => handleBlurClick(e, () => setDifficulty("extra_hard"))}
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
        {[
          { type: "time", label: "time", icon: <Clock size={12} /> },
          { type: "words", label: "Aa words", icon: null },
          { type: "stories", label: "stories", icon: null },
          { type: "quotes", label: "quotes", icon: <Quote size={12} /> },
          { type: "infinite", label: "infinite", icon: null },
        ].map((m) => (
          <button
            key={m.type}
            onClick={(e) => handleBlurClick(e, () => setTestType(m.type))}
            className={`inline-flex items-center gap-1 px-2.5 py-[6px] rounded-[10px] transition-all duration-200 ${
              testType === m.type
                ? "bg-[#e26928] text-white shadow-sm"
                : isLight
                  ? "text-zinc-600 hover:text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-300"
            } cursor-pointer`}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* --- Pill 3: Dynamic Config Limits --- */}
      <div
        className={`flex gap-2 items-center rounded-[15px] px-1.5 py-1 text-[10px] ${
          isLight
            ? "bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm"
            : "bg-[#18181b] border border-zinc-800/50 text-zinc-400 shadow-lg"
        }`}
      >
        {testType === "time" &&
          [5, 10, 15, 30, 60, 120].map((t) => (
            <button
              key={t}
              onClick={(e) => handleBlurClick(e, () => setSelectedTime(t))}
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
              onClick={(e) => handleBlurClick(e, () => setWordCount(w))}
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
              onClick={(e) =>
                handleBlurClick(e, () => setStoryLength(s.toLowerCase()))
              }
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
  );
}
