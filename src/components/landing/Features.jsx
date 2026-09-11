import React from "react";
import { FEATURES } from "./data";
import { borderColor } from "./utils";

export default function Features({ isLight }) {
  const borderCol = borderColor(isLight);

  return (
    <div
      id="features"
      className={`border-l border-r mx-6.5 border-t ${borderCol}`}
    >
      <div className="pt-12 pb-4 px-6">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-[#9b72ff]">
          Why RhythmKey
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
          Built to feel invisible while you type
        </h2>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 border-t ${borderCol}`}>
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const isLastCol = i % 2 === 1;
          const isLastRow = i >= FEATURES.length - 2;
          return (
            <div
              key={f.title}
              className={`text-left p-7 ${!isLastCol ? `sm:border-r ${borderCol}` : ""} ${
                !isLastRow ? `border-b ${borderCol}` : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${
                  isLight ? "bg-[#9b72ff]/10" : "bg-[#9b72ff]/15"
                }`}
              >
                <Icon size={17} className="text-[#9b72ff]" />
              </div>
              <h3 className="text-[15px] font-semibold">{f.title}</h3>
              <p
                className={`mt-1.5 text-[13px] leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
              >
                {f.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
