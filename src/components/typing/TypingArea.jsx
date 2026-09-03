import React, { useLayoutEffect, useState } from "react";
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
  const [cursorPos, setCursorPos] = useState({ left: 0, top: 0 });

  // Use useLayoutEffect for synchronous position update before paint
  useLayoutEffect(() => {
    if (!innerContainerRef.current) return;

    const targetSpan = innerContainerRef.current.querySelector(
      `[data-index="${userInput.length}"]`,
    );

    if (targetSpan) {
      setCursorPos({
        left: targetSpan.offsetLeft,
        top: targetSpan.offsetTop,
      });
    } else {
      // Fallback to the previous character's end position
      const prevSpan = innerContainerRef.current.querySelector(
        `[data-index="${userInput.length - 1}"]`,
      );
      if (prevSpan) {
        setCursorPos({
          left: prevSpan.offsetLeft + prevSpan.offsetWidth,
          top: prevSpan.offsetTop,
        });
      }
    }
  }, [userInput, fontSize, lineOffset, wordsList, innerContainerRef]);

  const getSmoothCursorProps = () => {
    const base =
      "absolute pointer-events-none bg-[#9b72ff] will-change-transform backface-hidden animate-pulse duration-0.5";
    const top = cursorPos.top + 3;
    const left = cursorPos.left;
    const height = fontSize;
    const charWidth = fontSize * 0.6;

    // Fast, smooth easing without bounce
    const transition = "transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    switch (cursorStyle) {
      case "underline":
        return {
          className: `${base}`,
          style: {
            transform: `translate3d(${left}px, ${top + height - 2}px, 0)`,
            width: `${charWidth}px`,
            height: "2px",
            transition,
          },
        };
      case "line":
      default:
        return {
          className: `${base}`,
          style: {
            transform: `translate3d(${left}px, ${top}px, 0)`,
            width: "0.5px",
            height: `${height}px`,
            transition,
          },
        };
    }
  };

  const getMistakeClass = (isTyped, typedChar, char, isLight) => {
    if (!isTyped) return isLight ? "text-zinc-400" : "text-[#5e5e5e]";
    if (typedChar === char) {
      return isLight ? "text-zinc-900 font-medium" : "text-[#d4d4d8]";
    }
    // Wrong character — style depends on the user's Mistake Highlight setting
    switch (mistakeHighlight) {
      case "background":
        return "text-red-500 bg-red-500/15 rounded-[2px]";
      case "off":
        return "text-red-500/70";
      case "underline":
      default:
        return "text-red-500 underline decoration-red-500 underline-offset-2";
    }
  };

  const cursorProps = getSmoothCursorProps();

  return (
    <div
      key={textKey}
      className="relative font-grotesk w-full max-w-5xl h-[120px] overflow-hidden mb-5 select-none left-5"
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: "40px",
        letterSpacing: "0.03em",
      }}
    >
      {appState === "unfocused" && (
        <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300">
          <div
            className={`flex items-center gap-1.5 text-sm tracking-wide font-normal cursor-pointer ${
              isLight ? "text-black/80" : "text-zinc-300"
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
        } transition-transform duration-300 ease-out flex flex-wrap relative`}
        style={{ transform: `translateY(-${lineOffset}px)` }}
      >
        {appState !== "unfocused" && <div {...cursorProps} />}

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
              className={`inline-block whitespace-nowrap font-grotesk mr-[0.4em] ${wordOpacityClass} ${
                isWordError ? "border-b-2 border-red-500" : ""
              }`}
            >
              {word.split("").map((char, charIdx) => {
                const globalIdx = start + charIdx;
                const typedChar = userInput[globalIdx];
                const isTyped = globalIdx < userInput.length;

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
                    data-index={globalIdx}
                    className={`${colorClass}`}
                  >
                    {char}
                  </span>
                );
              })}
              {isCurrentWord && userInput.length > end && (
                <span className="text-[#9b72ff] bg-red-900/20 underline">
                  {userInput
                    .slice(end)
                    .split("")
                    .map((extraChar, extraIdx) => (
                      <span key={extraIdx} data-index={end + extraIdx + 1}>
                        {extraChar}
                      </span>
                    ))}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
