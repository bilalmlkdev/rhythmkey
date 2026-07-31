import React from "react";
import { X } from "lucide-react";
import SettingToggle from "./SettingToggle";
import ThemeSelector from "./ThemeSelector";
import SoundSection from "./SoundSection";
import ButtonGroupSetting from "./ButtonGroupSetting";
import SelectSetting from "./SelectSetting";

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
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl rounded-2xl border p-6 shadow-2xl flex flex-col ${
          isLight
            ? "bg-white border-zinc-200 text-zinc-800"
            : "bg-zinc-900 border-zinc-800 text-zinc-200"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold">RhythmKey Settings</h2>
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

        {/* Two‑column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm overflow-hidden">
          {/* Column 1 */}
          <div className="space-y-3">
            <ThemeSelector
              theme={theme}
              setTheme={setTheme}
              isLight={isLight}
            />

            <SettingToggle
              icon="Keyboard"
              label="Show Keyboard"
              enabled={showKeyboard}
              setEnabled={setShowKeyboard}
              isLight={isLight}
            />

            <SettingToggle
              icon="Play"
              label="Key Press Animation"
              enabled={settings.showKeyPressAnimation}
              setEnabled={(v) => updateSetting("showKeyPressAnimation", v)}
              isLight={isLight}
            />

            <SoundSection
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              soundVolume={soundVolume}
              setSoundVolume={setSoundVolume}
              soundPack={settings.soundPack}
              setSoundPack={(v) => updateSetting("soundPack", v)}
              isLight={isLight}
            />

            <SettingToggle
              icon="Activity"
              label="Live Stats (WPM/Acc)"
              enabled={showLiveStats}
              setEnabled={setShowLiveStats}
              isLight={isLight}
            />

            <SettingToggle
              icon="AlignLeft"
              label="Show Next Words"
              enabled={showNextWord}
              setEnabled={setShowNextWord}
              isLight={isLight}
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <ButtonGroupSetting
              icon="Clock"
              label="Idle Timeout"
              options={[3, 5, 10, 0]}
              value={settings.idleTimeout}
              onChange={(v) => updateSetting("idleTimeout", v)}
              formatLabel={(v) => (v === 0 ? "never" : `${v}s`)}
              isLight={isLight}
            />

            <ButtonGroupSetting
              icon="MousePointer2"
              label="Cursor Style"
              options={["block", "line", "underline"]}
              value={settings.cursorStyle}
              onChange={(v) => updateSetting("cursorStyle", v)}
              isLight={isLight}
            />

            <ButtonGroupSetting
              icon="Type"
              label="Font Size"
              options={[18, 23, 28]}
              value={settings.fontSize}
              onChange={(v) => updateSetting("fontSize", v)}
              formatLabel={(v) => `${v}px`}
              isLight={isLight}
            />

            <ButtonGroupSetting
              icon="Highlighter"
              label="Mistake Highlight"
              options={["underline", "background", "off"]}
              value={settings.mistakeHighlight}
              onChange={(v) => updateSetting("mistakeHighlight", v)}
              isLight={isLight}
            />

            <SelectSetting
              icon="Keyboard"
              label="Keyboard Layout"
              value={settings.keyboardLayout}
              onChange={(v) => updateSetting("keyboardLayout", v)}
              options={[
                { value: "qwerty", label: "QWERTY" },
                { value: "azerty", label: "AZERTY" },
                { value: "dvorak", label: "DVORAK" },
              ]}
              isLight={isLight}
            />

            <SelectSetting
              icon="Languages"
              label="Language"
              value={settings.language}
              onChange={(v) => updateSetting("language", v)}
              options={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
                { value: "de", label: "German" },
              ]}
              isLight={isLight}
            />

            <SettingToggle
              icon="Activity"
              label="Practice Mode (force correct)"
              enabled={settings.practiceMode}
              setEnabled={(v) => updateSetting("practiceMode", v)}
              isLight={isLight}
            />

            <SettingToggle
              icon="AlertTriangle"
              label="Restart Confirmation"
              enabled={settings.restartConfirmation}
              setEnabled={(v) => updateSetting("restartConfirmation", v)}
              isLight={isLight}
            />

            <SettingToggle
              icon="MousePointer2"
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
            className="px-4 py-1.5 bg-[#9b72ff] hover:bg-[#9b72ff]/80 text-white text-xs font-medium rounded-[8px] transition-colors shadow-sm cursor-pointer"
          >
            Close Modal
          </button>
        </div>
      </div>
    </>
  );
}
