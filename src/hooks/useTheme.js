import { useState, useEffect } from "react";

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function useTheme() {
  // Load theme from localStorage or default to "light"
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("RhythmKey_theme");
    return saved || "light";
  });

  // Resolve immediately from the current system preference instead of
  // defaulting to "dark" and correcting it in an effect afterward - this
  // avoids a state update during the initial render/effect cycle.
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === "system" ? getSystemTheme() : theme,
  );

  useEffect(() => {
    // Save to localStorage whenever theme changes
    localStorage.setItem("RhythmKey_theme", theme);

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: light)");
      // Subscribing to an external system's changes - this is the
      // documented-correct use of setState inside an effect. The initial
      // value is already correct from useState's initializer above; this
      // re-sync only matters if `theme` switches to "system" after mount.
      const listener = (e) => setResolvedTheme(e.matches ? "light" : "dark");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResolvedTheme(media.matches ? "light" : "dark");
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const isLight = resolvedTheme === "light";

  return { theme, setTheme, resolvedTheme, isLight };
}
