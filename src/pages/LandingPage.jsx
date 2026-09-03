import React, { useState, useRef, useEffect } from "react";
import { TransitionLink } from "../components/layout/PageTransition";
import { Github, ArrowRight } from "lucide-react";

const INITIAL_RESULTS = [
  { name: "kx_alpha", wpm: 128, acc: 98 },
  { name: "juno.codes", wpm: 96, acc: 94 },
  { name: "typewiz", wpm: 142, acc: 99 },
  { name: "devrae", wpm: 87, acc: 91 },
  { name: "nn_scripts", wpm: 110, acc: 96 },
  { name: "ghostkey", wpm: 156, acc: 97 },
];

const NAME_PARTS = [
  "nova",
  "pixel",
  "byte",
  "key",
  "type",
  "code",
  "dev",
  "zen",
  "flux",
  "sync",
  "wave",
  "blitz",
  "vibe",
  "loop",
  "grid",
  "hex",
  "alpha",
  "beta",
  "gamma",
  "delta",
  "echo",
  "neo",
  "cyber",
  "turbo",
  "quick",
  "swift",
  "ninja",
  "raptor",
  "phoenix",
  "falcon",
  "drift",
  "spark",
  "frost",
  "shadow",
  "blaze",
  "storm",
  "rider",
  "wizard",
  "ghost",
  "phantom",
];

const SUFFIXES = [
  ".dev",
  ".io",
  ".co",
  ".xyz",
  "_pro",
  "_x",
  ".codes",
  ".gg",
  ".net",
  ".app",
  ".online",
  "_wpm",
  ".fast",
  ".type",
  ".key",
  "",
  "",
  "",
  "", // sometimes no suffix
];

function generateRandomResult() {
  const base = NAME_PARTS[Math.floor(Math.random() * NAME_PARTS.length)];
  const maybeSecond =
    Math.random() > 0.5
      ? "_" + NAME_PARTS[Math.floor(Math.random() * NAME_PARTS.length)]
      : "";
  const maybeNumber = Math.random() > 0.7 ? Math.floor(Math.random() * 99) : "";
  const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  const name = `${base}${maybeSecond}${maybeNumber}${suffix}`;
  const wpm = Math.floor(Math.random() * (170 - 70 + 1)) + 70; // 70-170
  const acc = Math.floor(Math.random() * (100 - 88 + 1)) + 88; // 88-100
  return { name, wpm, acc };
}

export default function LandingPage({ isLight, theme, setTheme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [results, setResults] = useState(INITIAL_RESULTS);
  const dropdownRef = useRef(null); // Close dropdown on outside click

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // Simulate live activity: replace one random result every 4 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setResults((prevResults) => {
        const newResults = [...prevResults];
        const randomIndex = Math.floor(Math.random() * newResults.length);
        newResults[randomIndex] = generateRandomResult();
        return newResults;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentThemeLabel =
    theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";

  return (
    <div
      className={`h-screen overflow-hidden font-grotesk ${
        isLight ? "bg-white text-zinc-900" : "bg-[#0b0b0d] text-zinc-100"
      }`}
    >
        {" "}
      <header
        className={`border-b-[0.5px] w-full ${
          isLight ? "border-zinc-200/80" : "border-white/10"
        }`}
      >
           {" "}
        <div className="flex items-center justify-between max-w-[1100px] w-full mx-auto py-3.5 px-6">
              {" "}
          <div className="flex items-center gap-2">
                 {" "}
            <span className="text-[#9b72ff] text-xl font-bold tracking-tighter">
                     RhythmKey      {" "}
            </span>
                 {" "}
            <div className="grid grid-cols-2 gap-0.5">
                    {" "}
              <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
                 <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
                   {" "}
              <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm"></div>
                {" "}
              <div className="w-1.5 h-1.5 bg-[#9b72ff] rounded-sm opacity-50"></div>
                   {" "}
            </div>
                 {" "}
            <nav
              className={`hidden md:flex relative top-[1px] items-center ml-10 gap-5 text-[13px] font-medium ${
                isLight ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
                    {" "}
              <TransitionLink
                to="/about"
                className="hover:text-[#9b72ff] transition-colors"
              >
                        Details       {" "}
              </TransitionLink>
                    {" "}
              <TransitionLink
                to="/stats"
                className="hover:text-[#9b72ff] transition-colors"
              >
                        Track Your's Stats       {" "}
              </TransitionLink>
                    {" "}
              <a
                href="https://github.com/bilalmlkdev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#9b72ff] transition-colors"
              >
                        Follow on GitHub       {" "}
              </a>
                   {" "}
            </nav>
                {" "}
          </div>
              {" "}
          <div className="flex items-center gap-2">
                  {/* Theme Dropdown (text only) */}     {" "}
            <div className="relative" ref={dropdownRef}>
                    {" "}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isLight
                    ? "text-zinc-600 bg-zinc-100"
                    : "text-zinc-400 bg-white/5"
                }`}
              >
                        {currentThemeLabel} Mode       {" "}
              </button>
                    {" "}
              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-1 w-32 rounded-lg shadow-lg border backdrop-blur-sm z-50 overflow-hidden ${
                    isLight
                      ? "bg-white border-zinc-200"
                      : "bg-[#1c1c1f] border-white/10"
                  }`}
                >
                          {" "}
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
                        {" "}
                      </button>
                    );
                  })}
                         {" "}
                </div>
              )}
                   {" "}
            </div>
                 {" "}
            <TransitionLink
              to="/app/taketypingtest"
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                isLight
                  ? "bg-zinc-900 text-white hover:bg-black"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
                     Start Typing      {" "}
            </TransitionLink>
                {" "}
          </div>
             {" "}
        </div>
          {" "}
      </header>
        {" "}
      <section
        className={`max-w-[1100px] mx-auto text-center border-l border-r flex flex-col ${
          isLight ? "border-zinc-200/80" : "border-white/10"
        }`}
      >
           {" "}
        <div
          className={`border-l border-r mx-6.5 ${
            isLight ? "border-zinc-200/80" : "border-white/10"
          }`}
        >
              {" "}
          <div className="h-[60px]">
                 {" "}
            <div
              className="w-full h-full bg-repeat"
              style={{
                backgroundImage: isLight
                  ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.74' height='16.74' viewBox='0 0 16.74 16.74'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='rgba(0,0,0,0.06)'%3E%3Cpath d='M15.84 0h0.9L0 16.74v-0.9zM16.74 15.84v0.9H15.84z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.74' height='16.74' viewBox='0 0 16.74 16.74'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='rgba(255,255,255,0.06)'%3E%3Cpath d='M15.84 0h0.9L0 16.74v-0.9zM16.74 15.84v0.9H15.84z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "16.74px 16.74px",
              }}
            />
                {" "}
          </div>
              {" "}
          <div
            className={`flex flex-col border-t border-b pt-10 ${
              isLight ? "border-zinc-200/80" : "border-white/10"
            }`}
          >
                 {" "}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1]">
                     Your Typing Practice, Perfected      {" "}
            </h1>
                 {" "}
            <p
              className={`mt-3 text-xs sm:text-base max-w-[93%] sm:max-w-[550px] mx-auto leading-relaxed ${
                isLight ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
                     RhythmKey tracks your speed, highlights your
              mistakes, and adapts        to how you type. Live stats.
              Custom tests. Zero clutter.      {" "}
            </p>
                 {" "}
            <div className="flex items-center justify-center gap-3 mt-4 relative top-4.5">
                    {" "}
              <a
                href="https://github.com/bilalmlkdev/rhythmkey.git"
                target="_blank"
                className={`group relative overflow-hidden flex items-center gap-2 px-3.5 py-[7px] rounded-lg transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer ${
                  isLight
                    ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200"
                    : "bg-[#1c1c1f] hover:bg-[#252529] text-zinc-300"
                }`}
              >
                       {" "}
                <Github
                  size={15}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                       {" "}
                <span className="relative top-[1px]">Source Code</span>
                 {" "}
              </a>
                    {" "}
              <TransitionLink
                to="/app/taketypingtest"
                className={`group flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                  isLight
                    ? "bg-zinc-900 text-white hover:bg-black"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                        Start Typing        {" "}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
                      {" "}
              </TransitionLink>
                   {" "}
            </div>
                {" "}
          </div>
               <div className="h-[60px]"></div>    {" "}
          <section
            className={`border-y ${
              isLight ? "border-zinc-200/80" : "border-white/10"
            }`}
          >
                 {" "}
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 ${
                isLight
                  ? "divide-x divide-zinc-200/80"
                  : "divide-x divide-white/10"
              }`}
            >
                    {" "}
              {results.map((r, index) => (
                <div key={index} className="px-2 py-3 text-start">
                          {" "}
                  <div
                    className={`text-xs truncate text-center ${
                      isLight ? "text-zinc-500" : "text-zinc-500"
                    }`}
                  >
                              {r.name}        {" "}
                  </div>
                          {" "}
                  <div className="flex flex-row items-center justify-center gap-1.5 mt-1">
                             {" "}
                    <div className="text-base font-bold text-[#9b72ff]">
                                 {r.wpm}          {" "}
                      <span className="text-[10px] font-normal opacity-70">
                                    wpm           {" "}
                      </span>
                               {" "}
                    </div>
                              <span className="opacity-40">/</span>
                           {" "}
                    <div
                      className={`text-[11px] ${
                        isLight ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                                 {r.acc}%          {" "}
                    </div>
                            {" "}
                  </div>
                         {" "}
                </div>
              ))}
                   {" "}
            </div>
                {" "}
          </section>
               {/* the gap */}    {" "}
          <div className="h-[60px]">
                 {" "}
            <div
              className="w-full h-full bg-transparent bg-repeat"
              style={{
                backgroundImage: isLight
                  ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.74' height='16.74' viewBox='0 0 16.74 16.74'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='rgba(0,0,0,0.06)'%3E%3Cpath d='M15.84 0h0.9L0 16.74v-0.9zM16.74 15.84v0.9H15.84z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.74' height='16.74' viewBox='0 0 16.74 16.74'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='rgba(255,255,255,0.06)'%3E%3Cpath d='M15.84 0h0.9L0 16.74v-0.9zM16.74 15.84v0.9H15.84z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "16.74px 16.74px",
              }}
            />
                {" "}
          </div>
             {" "}
        </div>
            {/* Purple Glow Section */}   {" "}
        <div className="relative overflow-hidden h-80 w-full">
              {" "}
          <div
            style={{
              width: "100%",
              height: "100%",
              filter: "blur(60px) brightness(1.1)",
              willChange: "background",
              overflow: "hidden",
              background: `radial-gradient(circle at 45% 35%,
        rgb(155, 114, 255) 0%,
        rgb(155, 114, 255) 25%,
        rgba(0,0,0,0) 65%),
       radial-gradient(circle at 75% 55%,
        rgb(190, 140, 255) 0%,
        rgb(190, 140, 255) 20%,
        rgba(0,0,0,0) 60%),
       radial-gradient(circle at 30% 75%,
        rgb(115, 75, 220) 0%,
        rgb(115, 75, 220) 25%,
        rgba(0,0,0,0) 70%)`,
            }}
          ></div>
             {" "}
        </div>
          {" "}
      </section>
       {" "}
    </div>
  );
}
