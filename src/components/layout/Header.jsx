import React from "react";
import { Volume2, VolumeX, Settings, Github } from "lucide-react";

export default function Header({
  restartTest,
  totalKeystrokes,
  soundEnabled,
  setSoundEnabled,
  setShowSettingsModal,
  isLight,
}) {
  return (
    <header className="flex items-center justify-between px-8 pt-5 max-w-[1084px] w-full mx-auto">
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
          onClick={(e) => {
            e.currentTarget.blur();
            setSoundEnabled(!soundEnabled);
          }}
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
          onClick={(e) => {
            e.currentTarget.blur();
            setShowSettingsModal(true);
          }}
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
          onClick={(e) => e.currentTarget.blur()}
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
  );
}
