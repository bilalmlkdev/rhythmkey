import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { borderColor } from "./utils";

export default function CTASection({ isLight }) {
  const borderCol = borderColor(isLight);

  return (
    <section
      className={`flex flex-col items-center text-center px-6 py-20 border-t ${borderCol}`}
    >
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">
        Your next personal best
        <br />
        starts <span className="italic">here</span>.
      </h2>
      <TransitionLink
        to="/app/taketypingtest"
        className={`mt-7 px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${
          isLight
            ? "bg-zinc-900 text-white hover:bg-black"
            : "bg-white text-black hover:bg-white/90"
        }`}
      >
        Start Typing
      </TransitionLink>
      <p className={`mt-3.5 text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>
        No sign-up. Your stats never leave your browser.
      </p>
    </section>
  );
}
