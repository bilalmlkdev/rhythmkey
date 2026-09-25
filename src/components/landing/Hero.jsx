import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { ArrowUpRight } from "lucide-react";

export default function Hero({ isLight }) {
  return (
    <section
      className="flex flex-col items-center text-center px-6 pt-20 pb-16 sm:pt-24 sm:pb-20"
    >
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.04]">
        Find your rhythm,
        <br />
        beat your <span className="italic">record</span>.
      </h1>
      <p
        className={`mt-5 max-w-[520px] text-sm sm:text-base leading-relaxed ${
          isLight ? "text-zinc-600" : "text-zinc-400"
        }`}
      >
        RhythmKey tracks your speed, highlights your mistakes, and adapts to
        how you type. Live stats. Custom tests. Zero clutter.
      </p>
      <div className="mt-7 flex items-center gap-3">
        <TransitionLink
          to="/app/taketypingtest"
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${
            isLight
              ? "bg-zinc-900 text-white hover:bg-black"
              : "bg-white text-black hover:bg-white/90"
          }`}
        >
          Start Typing
        </TransitionLink>
        <a
          href="https://github.com/bilalmlkdev/rhythmkey.git"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
            isLight
              ? "bg-zinc-900 text-white hover:bg-black"
              : "bg-white text-black hover:bg-white/90"
          }`}
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
