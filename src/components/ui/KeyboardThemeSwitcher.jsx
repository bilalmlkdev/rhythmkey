import React from "react";
import { KEYBOARD_THEMES } from "./Keyboard";

const THEME_LABELS = {
  classic: "Classic",
  mint: "Mint",
  royal: "Royal",
  dolch: "Dolch",
  sand: "Sand",
  scarlet: "Scarlet",
};

export default function KeyboardThemeSwitcher({ value, onChange, isLight }) {
  return (
    <div className="flex items-center justify-center mt-8">
      <div
        className={`flex items-center gap-1 p-1 rounded-full border ${
          isLight ? "bg-zinc-100 border-zinc-200" : "bg-white/5 border-white/10"
        }`}
      >
        {KEYBOARD_THEMES.map((name) => {
          const active = value === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              aria-pressed={active}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                active
                  ? "bg-[#9b72ff] text-white shadow-sm"
                  : isLight
                    ? "text-zinc-500 hover:text-zinc-800"
                    : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {THEME_LABELS[name] || name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
