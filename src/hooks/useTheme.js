import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("RhythmKey_theme");
    if (saved === "system") return "dark";
    return saved || "dark";
  });

  useEffect(() => {
    localStorage.setItem("RhythmKey_theme", theme);
  }, [theme]);

  const isLight = theme === "light";

  return { theme, setTheme, isLight };
}
