import React from "react";
import {
  Settings,
  X,
  Palette,
  Keyboard,
  Volume2,
  Activity,
  AlignLeft,
} from "lucide-react";

export default function SettingsModal({
  isOpen,
  onClose,
  isLight,
  theme,
  setTheme,
  showKeyboard,
  setShowKeyboard,
  soundEnabled,
  setSoundEnabled,
  soundVolume,
  setSoundVolume,
  showLiveStats,
  setShowLiveStats,
  showNextWord,
  setShowNextWord,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop to handle outside clicks */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Dropdown Card */}
      <div
        className={`absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border p-5 shadow-2xl z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2 ${
          isLight
            ? "bg-white border-zinc-200 text-zinc-800"
            : "bg-zinc-900 border-zinc-800 text-zinc-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Settings size={16} className="text-[#9b72ff]" /> Settings
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight
                ? "hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800"
                : "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <X size={15} />
          </button>
        </div>

        {/* Settings list */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <span
              className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
            >
              <Palette size={15} className="text-[#9b72ff]" /> Theme
            </span>
            <div
              className={`flex rounded-lg p-1 border gap-0.5 ${
                isLight
                  ? "bg-zinc-100 border-zinc-200"
                  : "bg-zinc-800 border-zinc-700"
              }`}
            >
              {["dark", "light", "system"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all cursor-pointer ${
                    theme === t
                      ? "bg-[#9b72ff] text-white shadow-sm"
                      : isLight
                        ? "text-zinc-500 hover:text-zinc-800"
                        : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Show Keyboard */}
          <SettingToggle
            icon={<Keyboard size={15} className="text-[#9b72ff]" />}
            label="Show Keyboard"
            enabled={showKeyboard}
            setEnabled={setShowKeyboard}
            isLight={isLight}
          />

          {/* Sound & Volume */}
          <div className="space-y-2 pt-1">
            <SettingToggle
              icon={<Volume2 size={15} className="text-[#9b72ff]" />}
              label="Sound Effects"
              enabled={soundEnabled}
              setEnabled={setSoundEnabled}
              isLight={isLight}
            />
            {/* Always shown volume slider */}
            <div className="flex items-center gap-3 pl-6 animate-in slide-in-from-left-2 duration-200">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={soundVolume}
                onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                className="flex-1 accent-[#9b72ff] h-1 rounded-lg cursor-pointer"
              />
              <span
                className={`text-[11px] w-10 text-right ${
                  isLight ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                {Math.round(soundVolume * 100)}%
              </span>
            </div>
          </div>

          {/* Live Stats */}
          <SettingToggle
            icon={<Activity size={15} className="text-[#9b72ff]" />}
            label="Live Stats (WPM/Acc)"
            enabled={showLiveStats}
            setEnabled={setShowLiveStats}
            isLight={isLight}
          />

          {/* Next Words */}
          <SettingToggle
            icon={<AlignLeft size={15} className="text-[#9b72ff]" />}
            label="Show Next Words"
            enabled={showNextWord}
            setEnabled={setShowNextWord}
            isLight={isLight}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#9b72ff] hover:bg-[#9b72ff]/80 text-white text-xs font-medium rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}

// Reusable toggle row
function SettingToggle({ icon, label, enabled, setEnabled, isLight }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
      >
        {icon} {label}
      </span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-9 h-4.5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
          enabled ? "bg-[#9b72ff]" : isLight ? "bg-zinc-300" : "bg-zinc-700"
        }`}
      >
        <div
          className={`bg-white w-3.5 h-3.5 rounded-full shadow transform transition-transform ${
            enabled ? "translate-x-4.5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
