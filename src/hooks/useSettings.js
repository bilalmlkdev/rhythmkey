import { useState, useEffect } from "react";

export function useSettings() {
  const defaultSettings = {
    idleTimeout: 5,
    practiceMode: false,
    cursorStyle: "block", // "block", "line", "underline"
    fontSize: 23,
    mistakeHighlight: "underline", // "underline", "background", "off"
    soundPack: "click", // "click", "mechanical", "typewriter"
    language: "en",
    autoFocus: true,
    showKeyPressAnimation: true,
    restartConfirmation: false,
    keyboardLayout: "qwerty", // "qwerty", "azerty", "dvorak"
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("keythm_settings");
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

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.8);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showLiveStats, setShowLiveStats] = useState(true);
  const [showNextWord, setShowNextWord] = useState(true);

  useEffect(() => {
    localStorage.setItem("keythm_settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    updateSetting,
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
    showKeyboard,
    setShowKeyboard,
    showLiveStats,
    setShowLiveStats,
    showNextWord,
    setShowNextWord,
  };
}
