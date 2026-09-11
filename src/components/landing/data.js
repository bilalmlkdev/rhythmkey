import { Zap, Sliders, Lock, BarChart2 } from "lucide-react";

export const INITIAL_RESULTS = [
  { name: "kx_alpha", wpm: 128, acc: 98 },
  { name: "juno.codes", wpm: 96, acc: 94 },
  { name: "typewiz", wpm: 142, acc: 99 },
  { name: "devrae", wpm: 87, acc: 91 },
  { name: "nn_scripts", wpm: 110, acc: 96 },
  { name: "ghostkey", wpm: 156, acc: 97 },
  { name: "codewiz_92", wpm: 118, acc: 95 },
  { name: "speedster.dev", wpm: 134, acc: 97 },
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
  "",
];

export function generateRandomResult() {
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

export const FEATURES = [
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

export const STEPS = [
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
