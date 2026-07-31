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
}) {
  return (
    <div
      key={textKey}
      className="relative w-full max-w-5xl h-[120px] overflow-hidden text-[23px] tracking-wide mb-2 leading-[40px] select-none left-5"
    >
      {appState === "unfocused" && (
        <div
          className={`absolute inset-0 flex items-center justify-center z-10 backdrop-blur-[2px] rounded-lg transition-opacity duration-300 ${
            isLight ? "bg-white/20" : "bg-[#111113]/60"
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

      {/* Smooth container translation for line shifting */}
      <div
        ref={innerContainerRef}
        className={`${
          appState === "unfocused" ? "blur-[3px] opacity-40" : ""
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
                  colorClass =
                    typedChar === char
                      ? isLight
                        ? "text-zinc-900 font-medium"
                        : "text-[#d4d4d8]"
                      : "text-[#9b72ff] border-b-2 border-[#9b72ff]";
                }

                return (
                  <span
                    key={charIdx}
                    className={`${colorClass} ${
                      isCursor
                        ? "border-l-2 border-[#9b72ff] animate-pulse -ml-[2px]"
                        : ""
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
