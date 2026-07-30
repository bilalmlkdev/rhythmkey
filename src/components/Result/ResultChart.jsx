import React, { useState, useRef, useCallback } from "react";

export default function ResultChart({
  svgRef,
  chartWidth,
  chartHeight,
  maxWpm,
  maxTime,
  minWpm,
  validHistory,
  wpmPoints,
  accPoints,
  isLight,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current || validHistory.length === 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const targetTime = percentage * maxTime;

      let closestIdx = 0;
      let minDiff = Infinity;
      validHistory.forEach((d, idx) => {
        const diff = Math.abs(d.time - targetTime);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setHoveredIndex(closestIdx);
    },
    [validHistory, maxTime],
  );

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const generateAreaPath = () => {
    if (validHistory.length === 0) return "";
    const firstX = (validHistory[0].time / maxTime) * chartWidth;
    const lastX =
      (validHistory[validHistory.length - 1].time / maxTime) * chartWidth;

    let path = `M ${firstX},${chartHeight} `;
    path += validHistory
      .map((d, i) => {
        const x = (d.time / maxTime) * chartWidth;
        const y =
          chartHeight - ((d.wpm - minWpm) / (maxWpm - minWpm)) * chartHeight;
        return `L ${x},${y}`;
      })
      .join(" ");
    path += ` L ${lastX},${chartHeight} Z`;
    return path;
  };

  const activePoint = hoveredIndex !== null ? validHistory[hoveredIndex] : null;

  return (
    <div className="w-full max-w-4xl relative flex flex-col mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-12 mb-2 text-[10px] font-medium">
        <div className="text-zinc-500 uppercase tracking-wider">
          Performance Timeline
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-1.5 ${isLight ? "text-zinc-700" : "text-zinc-300"}`}
          >
            <span className="w-2 h-2 rounded-full bg-[#e26928]"></span> WPM
          </div>
          <div
            className={`flex items-center gap-1.5 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
          >
            <span
              className={`w-2 h-0.5 border-t border-dashed ${isLight ? "border-zinc-500" : "border-zinc-400"}`}
            ></span>{" "}
            Accuracy (%)
          </div>
        </div>
      </div>

      <div className="flex px-4 relative">
        <div className="flex flex-col justify-between text-[9px] text-zinc-500 pb-5 pr-3 h-[140px] w-10 text-right">
          <span>{maxWpm}</span>
          <span>{Math.round(maxWpm * 0.66)}</span>
          <span>{Math.round(maxWpm * 0.33)}</span>
          <span>0</span>
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex-1 relative h-[140px] cursor-crosshair"
        >
          {activePoint && (
            <div
              className={`absolute -top-12 -translate-x-1/2 ${
                isLight
                  ? "bg-white border-zinc-200 text-zinc-800"
                  : "bg-[#18181b] border-zinc-700/80 text-zinc-200"
              } border px-3 py-1.5 rounded-lg shadow-xl text-[11px] z-30 pointer-events-none flex items-center gap-3 animate-in fade-in zoom-in-95 duration-100`}
              style={{
                left: `${(activePoint.time / maxTime) * 100}%`,
              }}
            >
              <div>
                <span className="text-zinc-500 text-[9px] block">TIME</span>
                <span className="font-bold">{activePoint.time}s</span>
              </div>
              <div
                className={`w-px h-5 ${isLight ? "bg-zinc-200" : "bg-zinc-800"}`}
              ></div>
              <div>
                <span className="text-zinc-500 text-[9px] block">WPM</span>
                <span className="text-[#e26928] font-bold">
                  {activePoint.wpm}
                </span>
              </div>
              <div
                className={`w-px h-5 ${isLight ? "bg-zinc-200" : "bg-zinc-800"}`}
              ></div>
              <div>
                <span className="text-zinc-500 text-[9px] block">ACC</span>
                <span className="font-bold">{activePoint.accuracy}%</span>
              </div>
            </div>
          )}

          <svg
            ref={svgRef}
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e26928" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#e26928" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * (chartHeight / 3)}
                x2={chartWidth}
                y2={i * (chartHeight / 3)}
                stroke={isLight ? "#e4e4e7" : "#27272a"}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {validHistory.length > 0 && (
              <path d={generateAreaPath()} fill="url(#wpmGradient)" />
            )}

            {validHistory.length > 0 && (
              <path
                d={accPoints}
                fill="none"
                stroke={isLight ? "#a1a1aa" : "#3f3f46"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 4"
              />
            )}

            {validHistory.length > 0 && (
              <path
                d={wpmPoints}
                fill="none"
                stroke="#e26928"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />
            )}

            {activePoint && (
              <line
                x1={(activePoint.time / maxTime) * chartWidth}
                y1="0"
                x2={(activePoint.time / maxTime) * chartWidth}
                y2={chartHeight}
                stroke="#e26928"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            )}

            {validHistory.map((d, i) => {
              const cx = (d.time / maxTime) * chartWidth;
              const cy =
                chartHeight -
                ((d.wpm - minWpm) / (maxWpm - minWpm)) * chartHeight;
              const isHovered = hoveredIndex === i;

              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={isHovered ? "5" : "3"}
                  fill={isHovered ? "#e26928" : isLight ? "#ffffff" : "#111113"}
                  stroke="#e26928"
                  strokeWidth="2"
                  className="transition-all duration-75"
                />
              );
            })}
          </svg>

          <div className="absolute top-[140px] w-full flex justify-between text-[9px] text-zinc-500 pt-1.5">
            <span>0s</span>
            <span>{Math.round(maxTime / 2)}s</span>
            <span>{maxTime}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
