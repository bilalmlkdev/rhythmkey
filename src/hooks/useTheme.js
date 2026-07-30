import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("dark");
  const [resolvedTheme, setResolvedTheme] = useState("dark");

  useEffect(() => {
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
