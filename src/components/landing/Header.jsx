import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { borderColor } from "./utils";
import { Sun, Moon } from "lucide-react";

function LogoMark() {
  return (
    <span className="flex items-center gap-2">
      <span className="text-[#9b72ff] text-xl font-bold tracking-tighter">
        RhythmKey
      </span>
      <span className="grid grid-cols-2 gap-0.5">
        <span className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></span>
        <span className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></span>
        <span className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></span>
        <span className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm opacity-50"></span>
      </span>
    </span>
  );
}

export default function Header({ isLight, setTheme }) {
  const borderCol = borderColor(isLight);

  return (
    <header className={`border-b-[0.5px] w-full ${borderCol}`}>
      <div className="relative flex items-center justify-between px-6 py-3.5">
        <nav
          className={`hidden md:flex items-center gap-6 text-[13px] font-medium ${
            isLight ? "text-zinc-600" : "text-zinc-400"
          }`}
        >
          <a href="#features" className="hover:text-[#9b72ff] transition-colors">
            Features
          </a>
          <TransitionLink to="/about" className="hover:text-[#9b72ff] transition-colors">
            Details
          </TransitionLink>
          <TransitionLink to="/stats" className="hover:text-[#9b72ff] transition-colors">
            Stats
          </TransitionLink>
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2">
          <TransitionLink to="/" aria-label="RhythmKey home">
            <LogoMark />
          </TransitionLink>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className={`p-2 rounded-lg transition-colors ${
              isLight
                ? "text-zinc-600 bg-zinc-100 hover:bg-zinc-200"
                : "text-zinc-400 bg-white/5 hover:bg-white/10"
            }`}
            title={isLight ? "Switch to dark mode" : "Switch to light mode"}
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <TransitionLink
            to="/app/taketypingtest"
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 ${
              isLight
                ? "bg-zinc-900 text-white hover:bg-black"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            Start Typing
          </TransitionLink>
        </div>
      </div>
    </header>
  );
}
