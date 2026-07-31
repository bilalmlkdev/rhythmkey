import { useMemo } from "react";

export function useResultGraph(history, wpm) {
  const validHistory = useMemo(
    () => history.filter((h) => h.time > 0),
    [history],
  );
  const chartHeight = 140;
  const chartWidth = 900;

  const maxTime = useMemo(
    () => Math.max(...validHistory.map((d) => d.time), 1),
    [validHistory],
  );
  const maxWpm = useMemo(
    () => Math.max(...validHistory.map((d) => d.wpm), wpm + 10, 40),
    [validHistory, wpm],
  );
  const minWpm = 0;

  const wpmPoints = useMemo(
    () =>
      validHistory
        .map((d, i) => {
          const x = (d.time / maxTime) * chartWidth;
          const y =
            chartHeight - ((d.wpm - minWpm) / (maxWpm - minWpm)) * chartHeight;
          return `${i === 0 ? "M" : "L"} ${x},${y}`;
        })
        .join(" "),
    [validHistory, maxTime, maxWpm],
  );

  const accPoints = useMemo(
    () =>
      validHistory
        .map((d, i) => {
          const x = (d.time / maxTime) * chartWidth;
          const accScaled = Math.max(d.accuracy, 50);
          const y = chartHeight - ((accScaled - 50) / 50) * chartHeight;
          return `${i === 0 ? "M" : "L"} ${x},${y}`;
        })
        .join(" "),
    [validHistory, maxTime],
  );

  return {
    validHistory,
    chartHeight,
    chartWidth,
    maxTime,
    maxWpm,
    minWpm,
    wpmPoints,
    accPoints,
  };
}
