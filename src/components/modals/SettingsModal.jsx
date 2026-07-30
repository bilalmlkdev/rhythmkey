import { Settings, X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card – scales in */}
      <div
        className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-all duration-200 animate-in zoom-in-95 ${
          isLight
            ? "bg-white border-zinc-200 text-zinc-800"
            : "bg-zinc-900 border-zinc-800 text-zinc-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Settings size={18} className="text-[#e26928]" /> Settings
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight
                ? "hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800"
                : "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Settings list */}
        <div className="space-y-5 text-sm">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <span className={isLight ? "text-zinc-600" : "text-zinc-300"}>
              Theme
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
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                    theme === t
                      ? "bg-[#e26928] text-white shadow-sm"
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
            label="Show Keyboard"
            enabled={showKeyboard}
            setEnabled={setShowKeyboard}
            isLight={isLight}
          />

          {/* Sound & Volume */}
          <div className="space-y-3 pt-1">
            <SettingToggle
              label="Sound Effects"
              enabled={soundEnabled}
              setEnabled={setSoundEnabled}
              isLight={isLight}
            />
            {soundEnabled && (
              <div className="flex items-center gap-3 pl-2 animate-in slide-in-from-left-2 duration-200">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                  className="flex-1 accent-[#e26928] h-1 rounded-lg"
                />
                <span
                  className={`text-xs w-10 text-right ${
                    isLight ? "text-zinc-500" : "text-zinc-400"
                  }`}
                >
                  {Math.round(soundVolume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Live Stats */}
          <SettingToggle
            label="Live Stats (WPM/Acc)"
            enabled={showLiveStats}
            setEnabled={setShowLiveStats}
            isLight={isLight}
          />

          {/* Next Words */}
          <SettingToggle
            label="Show Next Words"
            enabled={showNextWord}
            setEnabled={setShowNextWord}
            isLight={isLight}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#e26928] hover:bg-[#cf5d22] text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable toggle row
function SettingToggle({ label, enabled, setEnabled, isLight }) {
  return (
    <div className="flex items-center justify-between">
      <span className={isLight ? "text-zinc-600" : "text-zinc-300"}>
        {label}
      </span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
          enabled ? "bg-[#e26928]" : isLight ? "bg-zinc-300" : "bg-zinc-700"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
