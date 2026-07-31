import { useState, useEffect, useCallback } from "react";

export function useStats() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("keythm_stats");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("keythm_stats", JSON.stringify(stats));
  }, [stats]);

  const saveResult = useCallback((result) => {
    setStats((prev) => {
      const newStats = [result, ...prev];
      // Keep only last 100 results
      if (newStats.length > 100) newStats.pop();
      return newStats;
    });
  }, []);

  const clearStats = useCallback(() => {
    setStats([]);
  }, []);

  return { stats, saveResult, clearStats };
}
