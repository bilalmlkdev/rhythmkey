import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { Sun, Moon } from "lucide-react";
import { ui } from "./utils";

function LogoMark({ isLight }) {
  const u = ui(isLight);
  return (
    <span className="flex items-center gap-2">
      <span className={`${u.accent} text-xl font-bold tracking-tighter`}>RhythmKey</span>
      <span className="grid grid-cols-2 gap-0.5">
        <span className={`w-1.5 h-1.5 ${u.accentBg} rounded-sm`}></span>
        <span className={`w-1.5 h-1.5 ${u.accentBg} rounded-sm`}></span>
        <span className={`w-1.5 h-1.5 ${u.accentBg} rounded-sm`}></span>
        <span className={`w-1.5 h-1.5 ${u.accentBg} rounded-sm opacity-50`}></span>
      </span>
    </span>
  );
}

export default function Header({ isLight, setTheme }) {
  const u = ui(isLight);
  const link = `${u.muted} hover:text-current transition-colors`;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-md ${u.line} ${
        u.nav
      }`}
    >
      <div className="max-w-[1120px] mx-auto flex items-center justify-between px-6 h-14">
        <TransitionLink to="/" aria-label="RhythmKey home">
          <LogoMark isLight={isLight} />
        </TransitionLink>

        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium">
          <a href="#features" className={link}>Features</a>
          <a href="#modes" className={link}>Modes</a>
          <TransitionLink to="/about" className={link}>Details</TransitionLink>
          <TransitionLink to="/stats" className={link}>Stats</TransitionLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className={`p-2 rounded-lg transition-colors ${
              isLight ? "text-zinc-600 hover:bg-zinc-200/70" : "text-zinc-400 hover:bg-white/10"
            }`}
            title={isLight ? "Switch to dark mode" : "Switch to light mode"}
            aria-label="Toggle theme"
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <TransitionLink
            to="/app/taketypingtest"
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 ${u.btn}`}
          >
            Start Typing
          </TransitionLink>
        </div>
      </div>
    </header>
  );
}
