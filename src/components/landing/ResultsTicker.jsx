import React, { useState, useEffect } from "react";
import ResultAvatar from "./ResultAvatar";
import { INITIAL_RESULTS, generateRandomResult } from "./data";
import { borderColor } from "./utils";

export default function ResultsTicker({ isLight }) {
  const [results, setResults] = useState(INITIAL_RESULTS);
  const borderCol = borderColor(isLight);

  useEffect(() => {
    const interval = setInterval(() => {
      setResults((prevResults) => {
        const newResults = [...prevResults];
        const randomIndex = Math.floor(Math.random() * newResults.length);
        newResults[randomIndex] = generateRandomResult();
        return newResults;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`border-y ${borderCol}`}>
      <div
        className={`grid grid-cols-2 sm:grid-cols-4 ${
          isLight
            ? "divide-x divide-y divide-zinc-200/80"
            : "divide-x divide-y divide-white/10"
        } sm:divide-y-0`}
      >
        {results.map((r, index) => (
          <div
            key={index}
            className={`px-4 py-5 flex flex-col items-center justify-start gap-2 ${
              index >= 4 ? "" : "sm:border-b " + borderCol
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ResultAvatar seed={r.name} size={30} />
              <div className="text-sm font-medium truncate text-center max-w-[110px]">
                {r.name}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="text-2xl font-bold text-[#9b72ff] leading-none">
                {r.wpm}
                <span className="text-xs font-normal opacity-70 ml-1">wpm</span>
              </div>
              <span className="opacity-30 text-lg">/</span>
              <div className={`text-sm font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                {r.acc}% acc
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
