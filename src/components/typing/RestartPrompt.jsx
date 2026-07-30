import React from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";

export default function RestartPrompt({
  appState,
  isTypingActive,
  restartTest,
  isLight,
}) {
  const handleBlurClick = (e, callback) => {
    e.currentTarget.blur();
    callback();
  };

  return (
    <div
      className={`flex flex-col items-center gap-3 mb-4 transition-opacity duration-300  ${
        appState === "typing" && isTypingActive
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
    >
      <button
        onClick={(e) => handleBlurClick(e, () => restartTest(false))}
        className={`transition-colors p-2 rounded-full cursor-pointer ${
          isLight
            ? "text-[#5e5e5e] hover:text-black"
            : "text-zinc-400 hover:text-white hover:brightness-150"
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
  );
}
