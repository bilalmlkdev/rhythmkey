import React from "react";
import TextureStrip from "./TextureStrip";
import { STEPS } from "./data";
import { borderColor } from "./utils";

export default function HowItWorks({ isLight }) {
  const borderCol = borderColor(isLight);

  return (
    <div className={`border-l border-r mx-6.5 border-t ${borderCol}`}>
      <div className="pt-12 pb-4 px-6 text-left">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-[#9b72ff]">
          How it works
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
          Three steps, no setup
        </h2>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-3 border-t ${borderCol}`}>
        {STEPS.map((s, i) => (
          <div
            key={s.step}
            className={`text-left p-7 ${
              i !== STEPS.length - 1 ? `sm:border-r ${borderCol}` : ""
            } ${i !== STEPS.length - 1 ? `border-b sm:border-b-0 ${borderCol}` : ""}`}
          >
            <span
              className={`text-xs font-mono ${isLight ? "text-zinc-400" : "text-zinc-600"}`}
            >
              {s.step}
            </span>
            <h3 className="text-[15px] font-semibold mt-2">{s.title}</h3>
            <p
              className={`mt-1.5 text-[13px] leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
      <TextureStrip isLight={isLight} />
    </div>
  );
}
