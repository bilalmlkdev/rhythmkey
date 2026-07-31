import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Volume2,
  VolumeX,
  Settings,
  Github,
  BarChart2,
  Info,
  Share2,
} from "lucide-react";
import SettingsModal from "../modals/settings/SettingsModal";

export default function Header({
  restartTest,
  totalKeystrokes,
  showSettingsModal,
  setShowSettingsModal,
  isLight,
  theme,
  setTheme,
  settings, //  receive unified settings
  updateSetting, //  receive updateSetting
  onShare,
  resetSettings,
}) {
  const [showNotification, setShowNotification] = useState(false);

  const handleShareClick = (e) => {
    e.currentTarget.blur();
    if (typeof onShare === "function") {
      onShare();
    }
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <header className="flex items-center justify-between px-8 pt-5 max-w-[1084px] w-full mx-auto relative">
      {/* Share Notification Panel */}
      <div
        className={`absolute left-8 -bottom-10 z-50 flex items-center gap-2 px-3.5 py-2 rounded-lg shadow-xl text-xs font-medium transition-all duration-300 ease-out transform ${
          showNotification
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-6 pointer-events-none"
        } ${
          isLight
            ? "bg-zinc-900 text-white shadow-zinc-500/10"
            : "bg-[#1c1c1f] text-zinc-200 border border-zinc-800/80 shadow-black/40"
        }`}
      >
        <Share2 size={13} className="text-[#9b72ff]" />
        <span>URL copied to clipboard!</span>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => restartTest(false)}
      >
        <span className="text-[#9b72ff] text-xl font-bold tracking-tighter">
          RhythmKey
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
        <Link
          to="/stats"
          className="flex items-center gap-2 px-2 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer"
        >
          <BarChart2 size={14} /> Stats{" "}
        </Link>

        <Link
          to="/about"
          className="flex items-center gap-2 px-2 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer"
        >
         About
        </Link>

        <button
          onClick={handleShareClick}
          className="flex items-center gap-2 pl-2 pr-3 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer"
        >
         Copy Link
        </button>

        {/* Audio Button – using settings */}
        <button
          onClick={(e) => {
            e.currentTarget.blur();
            updateSetting("soundEnabled", !settings.soundEnabled);
          }}
          className={`relative overflow-hidden flex items-center gap-2 px-3.5 py-[7px] rounded-full transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer ${
            isLight
              ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
              : "bg-[#1c1c1f] hover:bg-[#252529] text-zinc-300"
          } ${settings.soundEnabled ? "opacity-100" : "opacity-70"}`}
        >
          {settings.soundEnabled ? (
            <Volume2 size={14} />
          ) : (
            <VolumeX size={14} />
          )}
          {settings.soundEnabled ? "Audio On" : "Audio Off"}
          {!settings.soundEnabled && (
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
        </button>

        {/* Settings Modal */}
        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          isLight={isLight}
          theme={theme}
          setTheme={setTheme}
          settings={settings}
          updateSetting={updateSetting}
          resetSettings={resetSettings}
        />

        {/* GitHub Button */}
        <a
          href="https://github.com/byllzz/rhythmkey.git"
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
