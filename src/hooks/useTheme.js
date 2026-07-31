import { useState, useEffect } from "react";

export function useTheme() {
  // Load theme from localStorage or default to "dark"
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("RhythmKey_theme");
    return saved || "dark";
  });

  const [resolvedTheme, setResolvedTheme] = useState("dark");

  useEffect(() => {
    // Save to localStorage whenever theme changes
    localStorage.setItem("RhythmKey_theme", theme);

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: light)");
      setResolvedTheme(media.matches ? "light" : "dark");
      const listener = (e) => setResolvedTheme(e.matches ? "light" : "dark");
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const isLight = resolvedTheme === "light";

  return { theme, setTheme, resolvedTheme, isLight };
}
