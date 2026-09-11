import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { ArrowRight, Sparkles } from "lucide-react";
import { borderColor } from "./utils";

export default function CTASection({ isLight }) {
  const borderCol = borderColor(isLight);

  return (
    <div
      className={`border-l border-r mx-6.5 border-t relative overflow-hidden ${borderCol}`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: "blur(60px) brightness(1.1)",
          opacity: isLight ? 0.35 : 0.55,
          background: `radial-gradient(circle at 45% 35%, rgb(155, 114, 255) 0%, rgb(155, 114, 255) 25%, rgba(0,0,0,0) 65%),
            radial-gradient(circle at 75% 55%, rgb(190, 140, 255) 0%, rgb(190, 140, 255) 20%, rgba(0,0,0,0) 60%),
            radial-gradient(circle at 30% 75%, rgb(115, 75, 220) 0%, rgb(115, 75, 220) 25%, rgba(0,0,0,0) 70%)`,
        }}
      />
      <div className="relative flex flex-col items-center justify-center text-center py-16 px-6">
        <Sparkles size={20} className="text-[#9b72ff] mb-3" />
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-md">
          Find your rhythm, one keystroke at a time
        </h2>
        <p
          className={`mt-2 text-sm max-w-sm ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
        >
          No sign-up, no setup. Your next personal best is one test away.
        </p>
        <TransitionLink
          to="/app/taketypingtest"
          className={`group mt-6 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
            isLight
              ? "bg-zinc-900 text-white hover:bg-black"
              : "bg-white text-black hover:bg-white/90"
          }`}
        >
          Start Typing
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </TransitionLink>
      </div>
    </div>
  );
}
