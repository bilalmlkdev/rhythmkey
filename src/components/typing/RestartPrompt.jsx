import React, { useState, useEffect, useRef } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { Pause, Play } from "lucide-react";

export default function RestartPrompt({
  appState,
  isTypingActive,
  restartTest,
  isLight,
  isPaused,
  onPauseToggle,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const tabPressedRef = useRef(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const handleBlurClick = (e, callback) => {
    e.currentTarget.blur();
    triggerAnimation();
    callback();
  };

  // Listen for Tab + Enter to restart (animation)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        tabPressedRef.current = true;
      } else if (e.key === "Enter" && tabPressedRef.current) {
        triggerAnimation();
      } else if (e.key !== "Tab") {
        tabPressedRef.current = false;
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
  }, []);

  // Always render, but control visibility via opacity
  return (
    <div
      className={`flex flex-col items-center gap-3 mb-4 transition-opacity duration-300 ${
        appState === "typing" && isTypingActive && !isPaused
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Restart Button */}
        <button
          onClick={(e) => handleBlurClick(e, () => restartTest(false))}
          className={`transition-colors p-2 rounded-full cursor-pointer ${
            isLight
              ? "text-[#5e5e5e] hover:text-black"
              : "text-zinc-400 hover:text-white hover:brightness-150"
          }`}
        >
          <BsArrowCounterclockwise
            size={20}
            className={`-rotate-45 transition-transform duration-400 ease-in-out ${
              isAnimating ? "rotate-[315deg] scale-90" : ""
            }`}
          />
        </button>

        {/* Pause Button */}
        <button
          onClick={onPauseToggle}
          className={`transition-colors p-2 rounded-full cursor-pointer ${
            isLight
              ? "text-[#5e5e5e] hover:text-black"
              : "text-zinc-400 hover:text-white hover:brightness-150"
          }`}
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>

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
        <span className="mx-1">·</span>
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
          space
        </span>
        <span>pause</span>
      </div>
    </div>
  );
}
