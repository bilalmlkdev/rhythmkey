import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { ui } from "./utils";

export default function Footer({ isLight }) {
  const u = ui(isLight);
  const link = `${u.muted} hover:text-current transition-colors`;

  return (
    <footer className="mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-10 py-6">
        <TransitionLink to="/" className="flex items-center gap-2" aria-label="RhythmKey home">
          <span className={`${u.accent} text-sm font-bold tracking-tighter`}>RhythmKey</span>
          <span className="grid grid-cols-2 gap-0.5">
            <span className={`w-1.5 h-1.5 ${u.accentBg} rounded-sm`}></span>
            <span className={`w-1.5 h-1.5 ${u.accentBg} rounded-sm`}></span>
            <span className={`w-1.5 h-1.5 ${u.accentBg} rounded-sm`}></span>
            <span className={`w-1.5 h-1.5 ${u.accentBg} rounded-sm opacity-50`}></span>
          </span>
        </TransitionLink>

        <nav className="flex items-center gap-5 text-xs font-medium">
          <a href="#features" className={link}>Features</a>
          <a href="#modes" className={link}>Modes</a>
          <TransitionLink to="/about" className={link}>Details</TransitionLink>
          <TransitionLink to="/stats" className={link}>Stats</TransitionLink>
          <a href="https://github.com/bilalmlkdev/rhythmkey.git" target="_blank" rel="noopener noreferrer" className={link}>
            GitHub
          </a>
        </nav>

        <span className={`text-xs ${u.faint}`}>&copy; {new Date().getFullYear()} RhythmKey</span>
      </div>
    </footer>
  );
}
