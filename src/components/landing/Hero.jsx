import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { Github, ArrowRight } from "lucide-react";
import TextureStrip from "./TextureStrip";
import ResultsTicker from "./ResultsTicker";
import { borderColor } from "./utils";
import previewAppLight from "../../assets/previewAppLight.webp";
import previewAppDark from "../../assets/previewAppDark.webp";

export default function Hero({ isLight }) {
  const borderCol = borderColor(isLight);

  return (
    <div className={`border-l border-r mx-6.5 ${borderCol}`}>
      <TextureStrip isLight={isLight} />
      <div className={`flex flex-col border-t border-b pt-10 ${borderCol}`}>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1]">
          Your Typing Practice, Perfected <br /> One Keystroke at a Time
        </h1>
        <p
          className={`mt-3 text-xs sm:text-base max-w-[93%] sm:max-w-[550px] mx-auto leading-relaxed ${
            isLight ? "text-zinc-600" : "text-zinc-400"
          }`}
        >
          RhythmKey tracks your speed, highlights your mistakes, and adapts to
          how you type. Live stats. Custom tests. Zero clutter.
        </p>
        <div className="flex items-center justify-center gap-3 mt-4 relative top-4.5 pb-6">
          <a
            href="https://github.com/bilalmlkdev/rhythmkey.git"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all active:scale-95 text-sm tracking-tight font-medium cursor-pointer ${
              isLight
                ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
                : "bg-[#1c1c1f] hover:bg-[#252529] text-zinc-300"
            }`}
          >
            <Github
              size={15}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="relative top-[1px]">Source Code</span>
          </a>
          <TransitionLink
            to="/app/taketypingtest"
            className={`group flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
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

        <div className={`border-b border-t ${borderCol}`}>
          <TextureStrip isLight={isLight} />
        </div>

        {/* App Preview Screenshot */}
        <div className={` mb-0 overflow-hidden border ${borderCol}`}>
          <img
            src={isLight ? previewAppLight : previewAppDark}
            alt="RhythmKey app preview"
            className="w-full h-auto block"
          />
        </div>
      </div>

      <ResultsTicker isLight={isLight} />

      <TextureStrip isLight={isLight} />
    </div>
  );
}
