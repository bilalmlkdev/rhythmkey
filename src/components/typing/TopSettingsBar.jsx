import React from "react";
import { Clock, Quote, FileText } from "lucide-react";

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

  const isRightPillHidden =
    testType === "infinite" || testType === "quotes" || testType === "custom";

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 relative bottom-6 transition-opacity duration-300 ${
        appState === "typing" && isTypingActive
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
    >
      {/* pill - 01 - left */}
      <div
        className={`flex gap-3 items-center rounded-[15px] px-4 py-[6px] text-[11px] font-medium h-[36px] ${
          isLight
            ? "bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm"
            : "bg-[#18181b] border border-zinc-800/50 text-zinc-400 shadow-lg"
        }`}
      >
        <button
          onClick={(e) =>
            handleBlurClick(e, () => setHasPunctuation(!hasPunctuation))
          }
          className={`transition-all duration-150 active:scale-90 select-none cursor-pointer ${
            hasPunctuation
              ? "text-[#CEBCFC]"
              : isLight
                ? "hover:text-zinc-900"
                : "hover:text-zinc-300"
          }`}
        >
          @ punctuation
        </button>
        <button
          onClick={(e) => handleBlurClick(e, () => setHasNumbers(!hasNumbers))}
          className={`transition-all duration-150 active:scale-90 select-none cursor-pointer ${
            hasNumbers
              ? "text-[#9b72ff]"
              : isLight
                ? "hover:text-zinc-900"
                : "hover:text-zinc-300"
          }`}
        >
          # numbers
        </button>
        <button
          onClick={(e) => handleBlurClick(e, () => setHasSymbols(!hasSymbols))}
          className={`transition-all duration-150 active:scale-90 select-none cursor-pointer ${
            hasSymbols
              ? "text-[#9b72ff]"
              : isLight
                ? "hover:text-zinc-900"
                : "hover:text-zinc-300"
          }`}
        >
          & symbols
        </button>

        <div
          className={`w-px h-4 ${isLight ? "bg-zinc-200" : "bg-zinc-800"}`}
        />

        <div className="flex gap-1 items-center">
          <button
            onClick={(e) => handleBlurClick(e, () => setDifficulty("easy"))}
            className={`inline-flex items-center px-2.5 py-[6px] rounded-[10px] transition-all duration-150 active:scale-95 select-none cursor-pointer ${
              difficulty === "easy"
                ? "bg-[#9a72ff1b] text-[#9b72ff] shadow-sm"
                : isLight
                  ? "hover:text-zinc-900"
                  : "hover:text-zinc-300"
            }`}
          >
            easy
          </button>
          <button
            onClick={(e) => handleBlurClick(e, () => setDifficulty("hard"))}
            className={`inline-flex items-center px-2.5 py-[6px] rounded-[10px] transition-all duration-150 active:scale-95 select-none cursor-pointer ${
              difficulty === "hard"
                ? "bg-[#9a72ff1b] text-[#9b72ff] shadow-sm"
                : isLight
                  ? "hover:text-zinc-900"
                  : "hover:text-zinc-300"
            }`}
          >
            hard
          </button>
          <button
            onClick={(e) =>
              handleBlurClick(e, () => setDifficulty("extra_hard"))
            }
            className={`inline-flex items-center px-2.5 py-[6px] rounded-[10px] transition-all duration-150 active:scale-95 select-none cursor-pointer ${
              difficulty === "extra_hard"
                ? "bg-[#9a72ff1b] text-[#9b72ff] shadow-sm"
                : isLight
                  ? "hover:text-zinc-900"
                  : "hover:text-zinc-300"
            }`}
          >
            extra hard
          </button>
        </div>
      </div>

      {/* pill - 02 - center */}
      <div
        className={`flex gap-1 items-center rounded-[15px] px-1 py-[6px] text-[11px] font-medium h-[36px] ${
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
          { type: "custom", label: "custom", icon: <FileText size={12} /> },
        ].map((m) => (
          <button
            key={m.type}
            onClick={(e) => {
              handleBlurClick(e, () => setTestType(m.type));
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-[6px] relative bottom-[0.5px] rounded-[12px] transition-all duration-150 active:scale-95 select-none cursor-pointer ${
              testType === m.type
                ? "bg-[#9a72ff1b] text-[#9b72ff] shadow-sm"
                : isLight
                  ? "text-zinc-600 hover:text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-300"
            }`}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* pill - 03 - right */}
      <div
        className={`flex items-center justify-center gap-1.5 rounded-[15px] px-1 py-1 text-[11px] font-medium h-[36px] transition-all duration-200 ${
          isRightPillHidden
            ? "invisible opacity-0 pointer-events-none"
            : "opacity-100"
        } ${
          isLight
            ? "bg-zinc-100 border border-zinc-200 text-zinc-600 shadow-sm"
            : "bg-[#18181b] border border-zinc-800/50 text-zinc-400 shadow-lg"
        }`}
      >
        {testType === "time" &&
          [15, 30, 60, 120].map((t) => (
            <button
              key={t}
              onClick={(e) => handleBlurClick(e, () => setSelectedTime(t))}
              className={`inline-flex items-center px-2 py-[6px] rounded-[12px] relative bottom-[0.5px] transition-all duration-150 active:scale-95 select-none cursor-pointer ${
                selectedTime === t
                  ? "bg-[#9a72ff1b] text-[#9b72ff] shadow-sm"
                  : isLight
                    ? "text-zinc-600 hover:text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {t}s
            </button>
          ))}

        {testType === "words" &&
          [10, 25, 50, 100].map((w) => (
            <button
              key={w}
              onClick={(e) => handleBlurClick(e, () => setWordCount(w))}
              className={`inline-flex items-center px-2.5 py-[6px] rounded-[12px] relative bottom-[0.5px] transition-all duration-150 active:scale-95 select-none cursor-pointer ${
                wordCount === w
                  ? "bg-[#9a72ff1b] text-[#9b72ff] shadow-sm"
                  : isLight
                    ? "text-zinc-600 hover:text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-300"
              }`}
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
              className={`inline-flex items-center px-3 py-[6px] rounded-[12px] relative bottom-[0.5px] transition-all duration-150 active:scale-95 select-none cursor-pointer ${
                storyLength === s.toLowerCase()
                  ? "bg-[#9a72ff1b] text-[#9b72ff] shadow-sm"
                  : isLight
                    ? "text-zinc-600 hover:text-zinc-900"
                    : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {s}
            </button>
          ))}
      </div>
    </div>
  );
}
