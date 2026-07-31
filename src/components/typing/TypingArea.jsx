import React from "react";
import { MousePointer2 } from "lucide-react";

export default function TypingArea({
  textKey,
  appState,
  isLight,
  innerContainerRef,
  lineOffset,
  wordsList,
  userInput,
  showNextWord,
  activeWordRef,
  currentIdx,
  mistakeHighlight,
  cursorStyle,
  fontSize,
}) {
  const getCursorStyle = () => {
    switch (cursorStyle) {
      case "block":
        return "border-l-2 border-[#9b72ff] animate-pulse -ml-[2px]";
      case "line":
        return "border-b-2 border-[#9b72ff] animate-pulse";
      case "underline":
        return "border-b-2 border-[#9b72ff] animate-pulse";
      default:
        return "border-l-2 border-[#9b72ff] animate-pulse -ml-[2px]";
    }
  };

  const getMistakeClass = (isTyped, typedChar, char, isLight) => {
    if (!isTyped) return isLight ? "text-zinc-400" : "text-[#5e5e5e]";
    if (typedChar === char) {
      return isLight ? "text-zinc-900 font-medium" : "text-[#d4d4d8]";
    } else {
      // Mistake
      switch (mistakeHighlight) {
        case "underline":
          return "text-[#9b72ff] border-b-2 border-[#9b72ff]";
        case "background":
          return "bg-red-500/20 text-[#9b72ff]";
        case "off":
          return "text-[#9b72ff]";
        default:
          return "text-[#9b72ff] border-b-2 border-[#9b72ff]";
      }
    }
  };

  return (
    <div
      key={textKey}
      className="relative w-full max-w-5xl h-[120px] overflow-hidden mb-2 select-none left-5" // Increased height to 160px for 4 lines
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: "40px",
        letterSpacing: "0.05em",
      }}
    >
      {/* Overlay for unfocused state - covers only the text area */}
      {appState === "unfocused" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-[2px] rounded-lg transition-opacity duration-300">
          <div
            className={`flex items-center gap-1.5 text-sm tracking-wide font-normal cursor-pointer ${
              isLight
                ? "bg-white/50 text-zinc-700"
                : "bg-zinc-900/80 text-zinc-300"
            }`}
          >
            <MousePointer2 size={16} /> Click or press any key to focus
          </div>
        </div>
      )}

      <div
        ref={innerContainerRef}
        className={`${
          appState === "unfocused" ? "opacity-30" : ""
        } transition-transform duration-300 ease-out font-mono flex flex-wrap`}
        style={{ transform: `translateY(-${lineOffset}px)` }}
      >
        {wordsList.map((wObj, wordIdx) => {
          const { word, start, end } = wObj;
          const isCurrentWord =
            userInput.length >= start && userInput.length <= end;
          const isFutureWord = wordIdx > currentIdx;

          const wordOpacityClass =
            !showNextWord && isFutureWord ? "opacity-15" : "opacity-100";

          const typedPart = userInput.slice(start, end);
          const isWordError =
            typedPart.split("").some((char, idx) => char !== word[idx]) ||
            typedPart.length > word.length;

          return (
            <span
              key={wordIdx}
              ref={isCurrentWord ? activeWordRef : null}
              className={`inline-block whitespace-nowrap mr-[0.5em] ${wordOpacityClass} ${
                isWordError ? "border-b-2 border-[#9b72ff]" : ""
              }`}
            >
              {word.split("").map((char, charIdx) => {
                const globalIdx = start + charIdx;
                const typedChar = userInput[globalIdx];
                const isTyped = globalIdx < userInput.length;
                const isCursor =
                  globalIdx === userInput.length && appState !== "unfocused";

                let colorClass = isLight ? "text-zinc-400" : "text-[#5e5e5e]";
                if (isTyped) {
                  colorClass = getMistakeClass(
                    isTyped,
                    typedChar,
                    char,
                    isLight,
                  );
                }

                return (
                  <span
                    key={charIdx}
                    className={`${colorClass} ${
                      isCursor ? getCursorStyle() : ""
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
              {isCurrentWord && userInput.length > end && (
                <span className="text-[#9b72ff] bg-red-900/20 underline">
                  {userInput.slice(end)}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
