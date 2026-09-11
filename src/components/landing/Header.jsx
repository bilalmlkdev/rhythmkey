import React, { useState, useRef, useEffect } from "react";
import { TransitionLink } from "../layout/PageTransition";
import { borderColor } from "./utils";

export default function Header({ isLight, theme, setTheme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const borderCol = borderColor(isLight);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentThemeLabel =
    theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";

  return (
    <header className={`border-b-[0.5px] w-full ${borderCol}`}>
      <div className="flex items-center justify-between max-w-[1100px] w-full mx-auto py-3.5 px-6">
        <div className="flex items-center gap-2">
          <span className="text-[#9b72ff] text-xl font-bold tracking-tighter">
            RhythmKey
          </span>
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
            <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm opacity-50"></div>
          </div>
          <nav
            className={`hidden md:flex relative top-[1px] items-center ml-10 gap-5 text-[13px] font-medium ${
              isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            <a
              href="#features"
              className="hover:text-[#9b72ff] transition-colors"
            >
              Features
            </a>
            <TransitionLink
              to="/about"
              className="hover:text-[#9b72ff] transition-colors"
            >
              Details
            </TransitionLink>
            <TransitionLink
              to="/stats"
              className="hover:text-[#9b72ff] transition-colors"
            >
              Track Your's Stats
            </TransitionLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                isLight
                  ? "text-zinc-600 bg-zinc-100"
                  : "text-zinc-400 bg-white/5"
              }`}
            >
              {currentThemeLabel} Mode
            </button>
            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-1 w-32 rounded-lg shadow-lg border backdrop-blur-sm z-50 overflow-hidden ${
                  isLight
                    ? "bg-white border-zinc-200"
                    : "bg-[#1c1c1f] border-white/10"
                }`}
              >
                {["Light", "Dark", "System"].map((label) => {
                  const value = label.toLowerCase();
                  const isActive = theme === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setTheme(value);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        isActive
                          ? isLight
                            ? "bg-zinc-100 text-zinc-900 font-medium"
                            : "bg-white/10 text-white font-medium"
                          : isLight
                            ? "text-zinc-600 hover:bg-zinc-50"
                            : "text-zinc-400 hover:bg-white/5"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <TransitionLink
            to="/app/taketypingtest"
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all active:scale-95 ${
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
