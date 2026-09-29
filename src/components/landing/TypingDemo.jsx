import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Keyboard, { KEYBOARD_THEME_PREVIEWS } from "../ui/Keyboard";
import KeyboardThemeSwitcher from "../ui/KeyboardThemeSwitcher";
import { ui } from "./utils";

const TARGET =
  "use or step how get low love among other ready hold plant sight hour road new solve inch field shape gave it food space late moral tree heart track you only sun serve music";
const NEIGHBOUR = { a: "s", e: "r", o: "p", i: "u", t: "r", n: "m", s: "d", r: "e", l: "k", h: "g", d: "s" };

// Deterministic "typos": a wrong key on a few letters, left in place like the real test.
const MISTAKES = (() => {
  const set = new Set();
  for (let i = 22; i < TARGET.length; i += 41) {
    let j = i;
    while (j < TARGET.length && !NEIGHBOUR[TARGET[j]]) j++;
    if (j < TARGET.length) set.add(j);
  }
  return set;
})();

const codeFor = (ch) => (ch === " " ? "Space" : `Key${ch.toUpperCase()}`);

function fire(type, code) {
  window.dispatchEvent(new KeyboardEvent(type, { code }));
}

function buildFinal() {
  let typed = "";
  for (let i = 0; i < TARGET.length; i++) typed += MISTAKES.has(i) ? NEIGHBOUR[TARGET[i]] : TARGET[i];
  return { typed: typed.slice(0, 92), ms: 9000 };
}

// Fits the fixed-size keyboard into the available width (scales down on phones, up a little on desktop).
function FitKeyboard({ children }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const [box, setBox] = useState({ scale: 1, h: 0, left: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return;
      const w = outer.current.clientWidth;
      const iw = inner.current.offsetWidth;
      const ih = inner.current.offsetHeight;
      if (!iw) return;
      const scale = Math.min(1.3, w / iw);
      setBox({ scale, h: ih * scale, left: Math.max(0, (w - iw * scale) / 2) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className="w-full relative" style={{ height: box.h || undefined }}>
      <div
        ref={inner}
        className="absolute top-0 inline-flex origin-top-left"
        style={{ transform: `scale(${box.scale})`, left: box.left }}
      >
        {children}
      </div>
    </div>
  );
}

function Pill({ u, items, on, className = "" }) {
  return (
    <div className={`items-center gap-0.5 p-1 rounded-full border ${u.pill} ${className}`}>
      {items.map((t) => (
        <span
          key={t}
          className={`px-3 py-1 rounded-full text-[12px] font-medium ${
            t === on ? u.pillOn : u.faint
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function TypingDemo({ isLight }) {
  const u = ui(isLight);
  const [kbTheme, setKbTheme] = useState("classic");
  const accent = KEYBOARD_THEME_PREVIEWS[kbTheme]?.accent ?? "#9b72ff";
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [s, setS] = useState(reduced ? buildFinal() : { typed: "", ms: 0 });

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let t0 = 0;
    let timer;
    let release;

    const step = () => {
      if (document.hidden) {
        timer = setTimeout(step, 500);
        return;
      }
      if (i >= TARGET.length) {
        timer = setTimeout(() => {
          i = 0;
          t0 = 0;
          setS({ typed: "", ms: 0 });
          timer = setTimeout(step, 800);
        }, 2600);
        return;
      }
      const want = TARGET[i];
      const ch = MISTAKES.has(i) ? NEIGHBOUR[want] : want;
      if (!t0) t0 = performance.now();
      const ms = performance.now() - t0;
      i++;
      setS((p) => ({ typed: p.typed + ch, ms }));
      const code = codeFor(ch);
      fire("keydown", code);
      release = setTimeout(() => fire("keyup", code), 70);
      timer = setTimeout(step, 85 + ((i * 53) % 60) + (ch === " " ? 40 : 0));
    };

    timer = setTimeout(step, 900);
    return () => {
      clearTimeout(timer);
      clearTimeout(release);
    };
  }, [reduced]);

  let errors = 0;
  for (let i = 0; i < s.typed.length; i++) if (s.typed[i] !== TARGET[i]) errors++;
  const correct = s.typed.length - errors;
  const wpm = s.ms > 1500 ? Math.round(correct / 5 / (s.ms / 60000)) : 0;
  const acc = s.typed.length ? Math.round((correct / s.typed.length) * 100) : 100;

  return (
    <div className={`w-full max-w-[1020px] mx-auto rounded-t-3xl border border-b-0 ${u.line} ${u.panel} px-4 sm:px-8 pt-6 sm:pt-8 pb-8`}>
      {/* settings bar, styled like the app */}
      {/* <div aria-hidden="true" className="hidden sm:flex flex-wrap items-center justify-center gap-2 mb-8">
        <Pill u={u} items={["@ punctuation", "# numbers", "& symbols"]} className="flex" />
        <Pill u={u} items={["time", "words", "stories", "quotes", "infinite"]} on="time" className="flex" />
        <Pill u={u} items={["15s", "30s", "60s", "120s"]} on="30s" className="flex" />
      </div> */}

      {/* live stats, top-right like the app */}
      <div aria-hidden="true" className="flex justify-end items-baseline gap-2 text-sm sm:text-base font-semibold tabular-nums">
        <span style={{ color: accent }}>{Math.floor(s.ms / 1000)}s</span>
        <span>
          {wpm} <span className={`text-xs font-normal ${u.faint}`}>wpm</span>
        </span>
        <span>
          {acc} <span className={`text-xs font-normal ${u.faint}`}>% acc</span>
        </span>
      </div>

      <p aria-hidden="true" className="mt-3 text-[1.35rem] sm:text-[1.9rem] leading-[1.75] tracking-wide break-words min-h-[7.4rem] sm:min-h-[10.4rem]">
        {TARGET.split("").map((ch, i) => {
          const t = s.typed[i];
          const cls = t === undefined ? u.todo : t === ch ? u.done : `${u.wrong} underline decoration-2 underline-offset-4`;
          return (
            <span key={i} className={`relative ${cls}`}>
              {i === s.typed.length && (
                <span className="rk-caret absolute -left-px top-[0.25em] h-[1.2em] w-[2px]" style={{ background: accent }} />
              )}
              {ch}
            </span>
          );
        })}
      </p>

      {/* the real keyboard component from the app */}
      <div aria-hidden="true" className="mt-6 sm:mt-8 flex justify-center">
        <div
          className={`${
            isLight ? "bg-[#9a72ff1b] border-black/30" : "bg-[#383439] border-white/30"
          } p-2 rounded-[14px] shadow-inner border-2 w-full max-w-[880px]`}
        >
          <FitKeyboard>
            <Keyboard theme={kbTheme} enableSound={false} enableHaptics={false} />
          </FitKeyboard>
        </div>
      </div>

      <KeyboardThemeSwitcher value={kbTheme} onChange={setKbTheme} isLight={isLight} />
      <p className={`mt-2 text-center text-xs ${u.faint}`}>Try it: hit any key on your keyboard.</p>
    </div>
  );
}
