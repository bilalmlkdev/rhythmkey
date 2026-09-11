import React, { useState, useRef, useEffect } from "react";
import { TransitionLink } from "../components/layout/PageTransition";
import {
  Github,
  ArrowRight,
  Zap,
  Sliders,
  Lock,
  BarChart2,
  Keyboard,
  Sparkles,
  Twitter,
  Mail,
} from "lucide-react";

const INITIAL_RESULTS = [
  { name: "kx_alpha", wpm: 128, acc: 98 },
  { name: "juno.codes", wpm: 96, acc: 94 },
  { name: "typewiz", wpm: 142, acc: 99 },
  { name: "devrae", wpm: 87, acc: 91 },
  { name: "nn_scripts", wpm: 110, acc: 96 },
  { name: "ghostkey", wpm: 156, acc: 97 },
];

const NAME_PARTS = [
  "nova", "pixel", "byte", "key", "type", "code", "dev", "zen", "flux",
  "sync", "wave", "blitz", "vibe", "loop", "grid", "hex", "alpha", "beta",
  "gamma", "delta", "echo", "neo", "cyber", "turbo", "quick", "swift",
  "ninja", "raptor", "phoenix", "falcon", "drift", "spark", "frost",
  "shadow", "blaze", "storm", "rider", "wizard", "ghost", "phantom",
];

const SUFFIXES = [
  ".dev", ".io", ".co", ".xyz", "_pro", "_x", ".codes", ".gg", ".net",
  ".app", ".online", "_wpm", ".fast", ".type", ".key", "", "", "", "",
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
  const wpm = Math.floor(Math.random() * (170 - 70 + 1)) + 70;
  const acc = Math.floor(Math.random() * (100 - 88 + 1)) + 88;
  return { name, wpm, acc };
}

function getAvatarUrl(seed) {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
    seed || "rhythmkey",
  )}&backgroundColor=f5f4ef`;
}

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`;
}

function ResultAvatar({ seed, size = 22 }) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reset fade-in whenever the underlying result (seed) changes, so
  // swapping to a new fake result crossfades instead of popping in.
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [seed]);

  if (errored) {
    return (
      <div
        className="rounded-full flex items-center justify-center text-white font-bold select-none shrink-0"
        style={{
          width: size,
          height: size,
          background: getAvatarColor(seed),
          fontSize: size * 0.45,
        }}
      >
        {seed.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className="rounded-full shrink-0 bg-white/5 overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img
        key={seed}
        src={getAvatarUrl(seed)}
        alt=""
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className="rounded-full object-cover transition-opacity duration-300"
        style={{ width: size, height: size, opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

const FEATURES = [
  {
    icon: Zap,
    title: "Live Stats",
    desc: "Watch your WPM and accuracy update in real time, keystroke by keystroke, with no lag between typing and feedback.",
  },
  {
    icon: Sliders,
    title: "Custom Tests",
    desc: "Switch between words, quotes, numbers, symbols, or your own pasted text. Multiple languages included out of the box.",
  },
  {
    icon: Lock,
    title: "Zero Sign-Up",
    desc: "No accounts, no servers. Every test and result lives in your browser, so you can start typing in under a second.",
  },
  {
    icon: BarChart2,
    title: "Real Breakdown",
    desc: "Every run ends with a detailed chart of your pace and error points, not just a single number.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Pick a mode",
    desc: "Words, quotes, numbers, or your own custom text. Set a time or word limit.",
  },
  {
    step: "02",
    title: "Start typing",
    desc: "RhythmKey tracks every keystroke live, highlighting mistakes as you go.",
  },
  {
    step: "03",
    title: "Review the result",
    desc: "Get your WPM, accuracy, and a full graph of your run the moment you finish.",
  },
];

export default function LandingPage({ isLight, theme, setTheme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [results, setResults] = useState(INITIAL_RESULTS);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const borderCol = isLight ? "border-zinc-200/80" : "border-white/10";
  const dotTexture = (light) =>
    light
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.74' height='16.74' viewBox='0 0 16.74 16.74'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='rgba(0,0,0,0.06)'%3E%3Cpath d='M15.84 0h0.9L0 16.74v-0.9zM16.74 15.84v0.9H15.84z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16.74' height='16.74' viewBox='0 0 16.74 16.74'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='rgba(255,255,255,0.06)'%3E%3Cpath d='M15.84 0h0.9L0 16.74v-0.9zM16.74 15.84v0.9H15.84z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  const TextureStrip = () => (
    <div className="h-[60px]">
      <div
        className="w-full h-full bg-repeat"
        style={{
          backgroundImage: dotTexture(isLight),
          backgroundSize: "16.74px 16.74px",
        }}
      />
    </div>
  );

  return (
    <div
      className={`min-h-screen font-grotesk ${
        isLight ? "bg-white text-zinc-900" : "bg-[#0b0b0d] text-zinc-100"
      }`}
    >
      {/* Header */}
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

      {/* Hero + Ticker */}
      <section
        className={`max-w-[1100px] mx-auto text-center border-l border-r flex flex-col ${borderCol}`}
      >
        <div className={`border-l border-r mx-6.5 ${borderCol}`}>
          <TextureStrip />
          <div className={`flex flex-col border-t border-b pt-10 ${borderCol}`}>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1]">
              Your Typing Practice, Perfected <br/> One Keystroke at a Time
            </h1>
            <p
              className={`mt-3 text-xs sm:text-base max-w-[93%] sm:max-w-[550px] mx-auto leading-relaxed ${
                isLight ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
              RhythmKey tracks your speed, highlights your mistakes, and adapts
              to how you type. Live stats. Custom tests. Zero clutter.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4 relative top-4.5 pb-10">
              <a
                href="https://github.com/bilalmlkdev/rhythmkey.git"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden flex items-center gap-2 px-3.5 py-[9px] rounded-lg transition-all active:scale-95 text-[13px] tracking-tight font-medium cursor-pointer ${
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
          </div>

          <section className={`border-y ${borderCol}`}>
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 ${
                isLight
                  ? "divide-x divide-y divide-zinc-200/80"
                  : "divide-x divide-y divide-white/10"
              } sm:divide-y-0`}
            >
              {results.map((r, index) => (
                <div
                  key={index}
                  className={`px-4 py-5 flex flex-col items-center justify-start gap-2 ${
                    index >= 3 ? "" : "sm:border-b " + borderCol
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <ResultAvatar seed={r.name} size={30} />
                    <div
                      className="text-sm font-medium truncate text-center max-w-[120px]"
                      key={r.name + "-name"}
                    >
                      {r.name}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="text-2xl font-bold text-[#9b72ff] leading-none">
                      {r.wpm}
                      <span className="text-xs font-normal opacity-70 ml-1">
                        wpm
                      </span>
                    </div>
                    <span className="opacity-30 text-lg">/</span>
                    <div
                      className={`text-sm font-medium ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
                    >
                      {r.acc}% acc
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <TextureStrip />
        </div>

        {/* Features */}
        <div
          id="features"
          className={`border-l border-r mx-6.5 border-t ${borderCol}`}
        >
          <div className="pt-12 pb-4 px-6">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#9b72ff]">
              Why RhythmKey
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
              Built to feel invisible while you type
            </h2>
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 border-t ${borderCol}`}
          >
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              const isLastCol = i % 2 === 1;
              const isLastRow = i >= FEATURES.length - 2;
              return (
                <div
                  key={f.title}
                  className={`text-left p-7 ${!isLastCol ? `sm:border-r ${borderCol}` : ""} ${
                    !isLastRow ? `border-b ${borderCol}` : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${
                      isLight ? "bg-[#9b72ff]/10" : "bg-[#9b72ff]/15"
                    }`}
                  >
                    <Icon size={17} className="text-[#9b72ff]" />
                  </div>
                  <h3 className="text-[15px] font-semibold">{f.title}</h3>
                  <p
                    className={`mt-1.5 text-[13px] leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
                  >
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it works */}
        <div className={`border-l border-r mx-6.5 border-t ${borderCol}`}>
          <div className="pt-12 pb-4 px-6 text-left">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#9b72ff]">
              How it works
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
              Three steps, no setup
            </h2>
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 border-t ${borderCol}`}
          >
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                className={`text-left p-7 ${
                  i !== STEPS.length - 1 ? `sm:border-r ${borderCol}` : ""
                } ${i !== STEPS.length - 1 ? `border-b sm:border-b-0 ${borderCol}` : ""}`}
              >
                <span
                  className={`text-xs font-mono ${isLight ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  {s.step}
                </span>
                <h3 className="text-[15px] font-semibold mt-2">{s.title}</h3>
                <p
                  className={`mt-1.5 text-[13px] leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <TextureStrip />
        </div>

        {/* CTA + Glow */}
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

        {/* Footer */}
        <footer className={`border-l border-r mx-6.5 border-t ${borderCol}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6">
            <div className="flex items-center gap-2">
              <Keyboard size={15} className="text-[#9b72ff]" />
              <span
                className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-500"}`}
              >
                © {new Date().getFullYear()} RhythmKey, All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/bilalmlkdev"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs flex items-center gap-1.5 hover:text-[#9b72ff] transition-colors ${
                  isLight ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="https://twitter.com/bilalmlkdev"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs flex items-center gap-1.5 hover:text-[#9b72ff] transition-colors ${
                  isLight ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                <Twitter size={14} /> Twitter
              </a>
              <a
                href="mailto:bilalmlkdev@gmail.com"
                className={`text-xs flex items-center gap-1.5 hover:text-[#9b72ff] transition-colors ${
                  isLight ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                <Mail size={14} /> Contact
              </a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
