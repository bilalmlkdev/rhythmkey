import React from "react";

// Shown while a lazy-loaded route chunk is still downloading. Mirrors the
// pulseScale loader in PageTransition.jsx so a slow chunk load looks
// identical to a normal route transition instead of a blank flash.
export default function RouteLoader({ isLight }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${
        isLight ? "bg-white" : "bg-[#0b0b0d]"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="grid grid-cols-2 gap-1 animate-[pulseScale_0.6s_ease-in-out_infinite]">
          <div className="w-2.5 h-2.5 bg-[#9b72ff] rounded-sm" />
          <div className="w-2.5 h-2.5 bg-[#9b72ff] rounded-sm" />
          <div className="w-2.5 h-2.5 bg-[#9b72ff] rounded-sm" />
          <div className="w-2.5 h-2.5 bg-[#9b72ff] rounded-sm opacity-50" />
        </div>
        <span
          className={`text-xs tracking-wide ${
            isLight ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          RhythmKey
        </span>
      </div>
    </div>
  );
}
