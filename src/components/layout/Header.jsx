import React from "react";
import { Link } from "react-router-dom";
import {
  Volume2,
  VolumeX,
  Settings,
  Github,
  BarChart2,
  Info,
  Share2, // add this
} from "lucide-react";
import SettingsModal from "../modals/SettingsModal";

export default function Header({
  restartTest,
  totalKeystrokes,
  soundEnabled,
  setSoundEnabled,
  showSettingsModal,
  setShowSettingsModal,
  isLight,
  theme,
  setTheme,
  showKeyboard,
  setShowKeyboard,
  soundVolume,
  setSoundVolume,
  showLiveStats,
  setShowLiveStats,
  showNextWord,
  setShowNextWord,
  settings,
  updateSetting,
  onShare, // new prop
}) {
  return (
    <header className="flex items-center justify-between px-8 pt-5 max-w-[1084px] w-full mx-auto relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => restartTest(false)}
      >
        <span className="text-[#9b72ff] text-xl font-bold tracking-tighter">
          keythm
        </span>
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
          <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm opacity-50"></div>
        </div>
      </div>
      <div className="hidden md:block relative text-xs text-[#9b72ff]">
        {totalKeystrokes.toLocaleString()}{" "}
        <span
          className={`opacity-50 tracking-wide ${isLight ? "text-black" : "text-white"}`}
        >
          strokes and counting
        </span>
      </div>
      <div className="flex items-center gap-2">
        {/* Link to Stats Page */}
        <Link
          to="/stats"
          className="flex items-center gap-2 px-3 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer"
        >
          <BarChart2 size={14} /> Stats{" "}
          <span
            className={`py-0.5 px-1.5 rounded-[5px] text-[10px] ${
              isLight
                ? "bg-zinc-200 text-zinc-600"
                : "bg-[#2b2b2f] text-zinc-300"
            }`}
          >
            ⌘S
          </span>
        </Link>

        {/* About Button */}
        <Link
          to="/about"
          className="flex items-center gap-2 px-3 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer"
        >
          <Info size={14} /> About
        </Link>

        {/* Audio Button */}
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            setSoundEnabled(!soundEnabled);
          }}
          className={`relative overflow-hidden flex items-center gap-2 px-3.5 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer ${
            isLight
              ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
              : "bg-[#1c1c1f] hover:bg-[#252529] text-zinc-300"
          } ${soundEnabled ? "opacity-100" : "opacity-70"}`}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          {soundEnabled ? "Audio On" : "Audio Off"}
          {!soundEnabled && (
            <span className="absolute inset-x-0 top-1/2 h-[1.5px] bg-red-500/80 -rotate-12 pointer-events-none" />
          )}
        </button>

        {/* Settings Button */}
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            setShowSettingsModal(!showSettingsModal);
          }}
          className={`flex items-center gap-2 px-3.5 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer ${
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

        {/* Share Button (NEW) */}
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            onShare();
          }}
          className="flex items-center gap-2 px-3 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer"
        >
          <Share2 size={14} /> Share
        </button>

        {/* Settings Modal */}
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
          settings={settings}
          updateSetting={updateSetting}
        />

        {/* GitHub Button */}
        <a
          href="https://github.com/byllzz/keythm"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4.5 py-[6px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer ${
            isLight
              ? "bg-zinc-900 hover:bg-black text-white"
              : "bg-[#FFFFFF] hover:bg-white/90 text-black"
          }`}
        >
          <Github size={14} /> GitHub
        </a>
      </div>
    </header>
  );
}
