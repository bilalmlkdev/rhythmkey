import React from "react";
import { FaInfinity } from "react-icons/fa";

export default function LiveStats({
  showLiveStats,
  appState,
  isLight,
  testType,
  timeLeft,
  userInput,
  wordCount,
  currentText,
  wpm,
  accuracy,
  isPaused,
}) {
  if (!showLiveStats) return null;

  return (
    <div
      className={`w-full max-w-5xl flex justify-end items-center text-[18px] font-bold tracking-tight px-4 transition-opacity duration-300  ${
        appState === "typing" ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex gap-3">
        {isPaused && <div className="text-[#9b72ff] animate-pulse">PAUSED</div>}
        <div
          className={`text-lg ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
        >
          {testType === "time" && (
            <span>
              <span className="text-[#9b72ff]">{timeLeft}s</span>
            </span>
          )}
          {testType === "words" && (
            <span className="text-[#9b72ff]">
              {userInput.trim() === ""
                ? 0
                : userInput.trim().split(/\s+/).length}{" "}
              / {wordCount}
            </span>
          )}
          {(testType === "stories" ||
            testType === "quotes" ||
            testType === "custom") && (
            <span className="text-[#9b72ff]">
              {userInput.length} / {currentText.length}
            </span>
          )}
          {testType === "infinite" && <span className="text-zinc-400">
            <FaInfinity size={15} /></span>}
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
  );
}
