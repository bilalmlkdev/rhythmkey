import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { borderColor } from "./utils";

export default function Footer({ isLight }) {
  const borderCol = borderColor(isLight);

  return (
    <footer className={`border-t mt-auto ${borderCol}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
        <TransitionLink to="/" className="flex items-center gap-2" aria-label="RhythmKey home">
          <span className="text-[#9b72ff] text-sm font-bold tracking-tighter">
            RhythmKey
          </span>
          <span className="grid grid-cols-2 gap-0.5">
            <span className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></span>
            <span className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></span>
            <span className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></span>
            <span className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm opacity-50"></span>
          </span>
        </TransitionLink>

        <nav className={`flex items-center gap-5 text-xs font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
          <a href="#features" className="hover:text-[#9b72ff] transition-colors">
            Features
          </a>
          <TransitionLink to="/about" className="hover:text-[#9b72ff] transition-colors">
            Details
          </TransitionLink>
          <TransitionLink to="/stats" className="hover:text-[#9b72ff] transition-colors">
            Stats
          </TransitionLink>
          <a
            href="https://github.com/bilalmlkdev/rhythmkey.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9b72ff] transition-colors"
          >
            GitHub
          </a>
        </nav>

        <span className={`text-xs ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
          &copy; {new Date().getFullYear()} RhythmKey
        </span>
      </div>
    </footer>
  );
}
