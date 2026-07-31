import React from "react";
import {
  Settings,
  X,
  Palette,
  Keyboard,
  Volume2,
  Activity,
  AlignLeft,
  Clock,
  Type,
  MousePointer2,
  Highlighter,
  Languages,
  Play,
  AlertTriangle,
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
  settings,
  updateSetting,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal – centered, larger and scroll‑free */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl rounded-2xl border p-6 shadow-2xl flex flex-col ${
          isLight
            ? "bg-white border-zinc-200 text-zinc-800"
            : "bg-zinc-900 border-zinc-800 text-zinc-200"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Settings size={16} className="text-[#9b72ff]" /> Settings
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight
                ? "hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800"
                : "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Two‑column grid with compact spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm overflow-hidden">
          {/* Column 1 */}
          <div className="space-y-3">
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

            {/* Show Key Press Animation */}
            <SettingToggle
              icon={<Play size={15} className="text-[#9b72ff]" />}
              label="Key Press Animation"
              enabled={settings.showKeyPressAnimation}
              setEnabled={(v) => updateSetting("showKeyPressAnimation", v)}
              isLight={isLight}
            />

            {/* Sound Effects & Volume */}
            <div className="space-y-1">
              <SettingToggle
                icon={<Volume2 size={15} className="text-[#9b72ff]" />}
                label="Sound Effects"
                enabled={soundEnabled}
                setEnabled={setSoundEnabled}
                isLight={isLight}
              />
              <div className="flex items-center gap-3 pl-6">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                  disabled={!soundEnabled}
                  className={`flex-1 accent-[#9b72ff] h-1 rounded-lg cursor-pointer ${
                    !soundEnabled ? "opacity-40 cursor-not-allowed" : ""
                  }`}
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

            {/* Sound Pack */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
              >
                <Volume2 size={15} className="text-[#9b72ff]" /> Sound Pack
              </span>
              <select
                value={settings.soundPack}
                onChange={(e) => updateSetting("soundPack", e.target.value)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium border ${
                  isLight
                    ? "bg-zinc-100 border-zinc-200 text-zinc-800"
                    : "bg-zinc-800 border-zinc-700 text-zinc-200"
                }`}
              >
                <option value="click">Click</option>
                <option value="mechanical">Mechanical</option>
                <option value="typewriter">Typewriter</option>
              </select>
            </div>

            {/* Live Stats */}
            <SettingToggle
              icon={<Activity size={15} className="text-[#9b72ff]" />}
              label="Live Stats (WPM/Acc)"
              enabled={showLiveStats}
              setEnabled={setShowLiveStats}
              isLight={isLight}
            />

            {/* Show Next Words */}
            <SettingToggle
              icon={<AlignLeft size={15} className="text-[#9b72ff]" />}
              label="Show Next Words"
              enabled={showNextWord}
              setEnabled={setShowNextWord}
              isLight={isLight}
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            {/* Idle Timeout */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
              >
                <Clock size={15} className="text-[#9b72ff]" /> Idle Timeout
              </span>
              <div
                className={`flex rounded-lg p-1 border gap-0.5 ${
                  isLight
                    ? "bg-zinc-100 border-zinc-200"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                {[3, 5, 10, 0].map((t) => (
                  <button
                    key={t}
                    onClick={() => updateSetting("idleTimeout", t)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      settings.idleTimeout === t
                        ? "bg-[#9b72ff] text-white shadow-sm"
                        : isLight
                          ? "text-zinc-500 hover:text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {t === 0 ? "never" : `${t}s`}
                  </button>
                ))}
              </div>
            </div>

            {/* Cursor Style */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
              >
                <MousePointer2 size={15} className="text-[#9b72ff]" /> Cursor
                Style
              </span>
              <div
                className={`flex rounded-lg p-1 border gap-0.5 ${
                  isLight
                    ? "bg-zinc-100 border-zinc-200"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                {["block", "line", "underline"].map((style) => (
                  <button
                    key={style}
                    onClick={() => updateSetting("cursorStyle", style)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium capitalize transition-all cursor-pointer ${
                      settings.cursorStyle === style
                        ? "bg-[#9b72ff] text-white shadow-sm"
                        : isLight
                          ? "text-zinc-500 hover:text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
              >
                <Type size={15} className="text-[#9b72ff]" /> Font Size
              </span>
              <div
                className={`flex rounded-lg p-1 border gap-0.5 ${
                  isLight
                    ? "bg-zinc-100 border-zinc-200"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                {[18, 23, 28].map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSetting("fontSize", size)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      settings.fontSize === size
                        ? "bg-[#9b72ff] text-white shadow-sm"
                        : isLight
                          ? "text-zinc-500 hover:text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {size}px
                  </button>
                ))}
              </div>
            </div>

            {/* Mistake Highlight */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
              >
                <Highlighter size={15} className="text-[#9b72ff]" /> Mistake
                Highlight
              </span>
              <div
                className={`flex rounded-lg p-1 border gap-0.5 ${
                  isLight
                    ? "bg-zinc-100 border-zinc-200"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              >
                {["underline", "background", "off"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateSetting("mistakeHighlight", mode)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium capitalize transition-all cursor-pointer ${
                      settings.mistakeHighlight === mode
                        ? "bg-[#9b72ff] text-white shadow-sm"
                        : isLight
                          ? "text-zinc-500 hover:text-zinc-800"
                          : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyboard Layout */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
              >
                <Keyboard size={15} className="text-[#9b72ff]" /> Keyboard
                Layout
              </span>
              <select
                value={settings.keyboardLayout}
                onChange={(e) =>
                  updateSetting("keyboardLayout", e.target.value)
                }
                className={`px-2 py-1 rounded-md text-[11px] font-medium border ${
                  isLight
                    ? "bg-zinc-100 border-zinc-200 text-zinc-800"
                    : "bg-zinc-800 border-zinc-700 text-zinc-200"
                }`}
              >
                <option value="qwerty">QWERTY</option>
                <option value="azerty">AZERTY</option>
                <option value="dvorak">DVORAK</option>
              </select>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between">
              <span
                className={`flex items-center gap-2 ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
              >
                <Languages size={15} className="text-[#9b72ff]" /> Language
              </span>
              <select
                value={settings.language}
                onChange={(e) => updateSetting("language", e.target.value)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium border ${
                  isLight
                    ? "bg-zinc-100 border-zinc-200 text-zinc-800"
                    : "bg-zinc-800 border-zinc-700 text-zinc-200"
                }`}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            {/* Practice Mode */}
            <SettingToggle
              icon={<Activity size={15} className="text-[#9b72ff]" />}
              label="Practice Mode (force correct)"
              enabled={settings.practiceMode}
              setEnabled={(v) => updateSetting("practiceMode", v)}
              isLight={isLight}
            />

            {/* Restart Confirmation */}
            <SettingToggle
              icon={<AlertTriangle size={15} className="text-[#9b72ff]" />}
              label="Restart Confirmation"
              enabled={settings.restartConfirmation}
              setEnabled={(v) => updateSetting("restartConfirmation", v)}
              isLight={isLight}
            />

            {/* Auto Focus */}
            <SettingToggle
              icon={<MousePointer2 size={15} className="text-[#9b72ff]" />}
              label="Auto Focus on Load"
              enabled={settings.autoFocus}
              setEnabled={(v) => updateSetting("autoFocus", v)}
              isLight={isLight}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
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

// Reusable toggle row (unchanged)
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
        className={`relative w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
          enabled ? "bg-[#9b72ff]" : isLight ? "bg-zinc-300" : "bg-zinc-700"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
