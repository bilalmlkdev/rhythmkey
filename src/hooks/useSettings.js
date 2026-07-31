import { useState, useEffect } from "react";

const defaultSettings = {
  idleTimeout: 5,
  practiceMode: false,
  cursorStyle: "block",
  fontSize: 23,
  mistakeHighlight: "underline",
  soundPack: "click",
  language: "en",
  autoFocus: true,
  showKeyPressAnimation: true,
  restartConfirmation: false,
  keyboardLayout: "qwerty",
  soundEnabled: true,
  soundVolume: 0.8,
  showKeyboard: true,
  showLiveStats: true,
  showNextWord: true,
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("RhythmKey_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultSettings, ...parsed };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("RhythmKey_settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // NEW: reset all settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return { settings, updateSetting, resetSettings };
}
