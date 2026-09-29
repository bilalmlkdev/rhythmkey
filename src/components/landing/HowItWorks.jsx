import React, { useState } from "react";
import { TransitionLink } from "../layout/PageTransition";
import { CONSOLE_TABS } from "./data";
import { ui } from "./utils";
import Reveal from "./Reveal";

const MODE_OPTIONS = [
  { value: "time", label: "Time" },
  { value: "words", label: "Words" },
  { value: "quotes", label: "Quotes" },
  { value: "stories", label: "Stories" },
];

const LENGTH_OPTIONS = {
  time: [
    { value: "15", label: "15 seconds" },
    { value: "30", label: "30 seconds" },
    { value: "60", label: "60 seconds" },
    { value: "120", label: "120 seconds" },
  ],
  words: [
    { value: "10", label: "10 words" },
    { value: "25", label: "25 words" },
    { value: "50", label: "50 words" },
    { value: "100", label: "100 words" },
  ],
  stories: [
    { value: "short", label: "Short story" },
    { value: "medium", label: "Medium story" },
    { value: "large", label: "Long story" },
  ],
  quotes: [],
};

function TabsTable({ isLight }) {
  const u = ui(isLight);
  const [active, setActive] = useState(0);
  const tab = CONSOLE_TABS[active];

  return (
    <div className={`rounded-xl border overflow-hidden ${u.line} ${u.panel}`}>
      <div className={`flex items-center gap-5 px-4 pt-3 border-b ${u.line}`} role="tablist">
        {CONSOLE_TABS.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`relative pb-2.5 text-[13px] font-medium transition-colors bg-transparent ${
              i === active ? "" : `${u.faint} hover:text-current`
            }`}
          >
            {t.label}
            {i === active && (
              <span className={`absolute left-0 right-0 -bottom-px h-0.5 rounded-full ${u.accentBg}`} />
            )}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-[1.1fr_1fr_0.8fr] gap-2 px-4 py-2.5 border-b ${u.line} ${u.label}`}>
        <span>{tab.header[0]}</span>
        <span>{tab.header[1]}</span>
        <span>{tab.header[2]}</span>
      </div>

      <div>
        {tab.rows.map((row, i) => (
          <div
            key={`${tab.label}-${i}`}
            className={`grid grid-cols-[1.1fr_1fr_0.8fr] gap-2 items-center px-4 py-3.5 ${
              i !== tab.rows.length - 1 ? `border-b ${u.line}` : ""
            }`}
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{row.a}</div>
              <div className={`text-[11px] truncate ${u.faint}`}>{row.aSub}</div>
            </div>
            <span className={`text-[13px] truncate ${u.muted}`}>{row.b}</span>
            <span className={`flex items-center gap-1.5 text-[12px] ${u.muted}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${u.accentBg}`} />
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionCard({ isLight }) {
  const u = ui(isLight);
  const [mode, setMode] = useState("time");
  const [length, setLength] = useState("30");
  const [extras, setExtras] = useState(false);

  const lengths = LENGTH_OPTIONS[mode];

  const handleMode = (e) => {
    const next = e.target.value;
    setMode(next);
    const options = LENGTH_OPTIONS[next];
    if (options.length > 0) setLength(options[Math.min(1, options.length - 1)].value);
  };

  const params = new URLSearchParams({ type: mode });
  if (mode === "time") params.set("time", length);
  else if (mode === "words") params.set("words", length);
  else if (mode === "stories") params.set("story", length);
  if (extras) {
    params.set("numbers", "true");
    params.set("symbols", "true");
  }
  const startHref = `/app/taketypingtest?${params.toString()}`;

  const fieldClass = `w-full rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#9b72ff]/40 ${u.field}`;
  const labelClass = `text-xs font-medium block mb-1.5 ${u.muted}`;

  return (
    <div className={`rounded-xl border p-6 ${u.line} ${u.panel}`}>
      <p className={u.label}>Quick start</p>
      <h3 className="mt-2 font-display font-normal tracking-normal text-xl">Start a session</h3>
      <p className={`text-xs mt-1 ${u.faint}`}>No account needed. Your stats stay in this browser.</p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="rk-mode" className={labelClass}>Mode</label>
          <select id="rk-mode" value={mode} onChange={handleMode} className={fieldClass}>
            {MODE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {lengths.length > 0 && (
          <div>
            <label htmlFor="rk-length" className={labelClass}>Length</label>
            <select id="rk-length" value={length} onChange={(e) => setLength(e.target.value)} className={fieldClass}>
              {lengths.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        )}

        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={extras}
            onChange={(e) => setExtras(e.target.checked)}
            className="w-4 h-4 rounded accent-[#9b72ff]"
          />
          <span className={`text-[13px] ${u.muted}`}>Numbers and symbols</span>
        </label>
      </div>

      <div className="mt-6 flex items-center gap-2.5">
        <TransitionLink
          to={startHref}
          className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${u.btn}`}
        >
          Start test
        </TransitionLink>
        <TransitionLink
          to="/stats"
          className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${u.ghost}`}
        >
          View stats
        </TransitionLink>
      </div>
    </div>
  );
}

export default function HowItWorks({ isLight }) {
  const u = ui(isLight);
  return (
    <section id="modes" className={`border-b ${u.line} px-4 sm:px-10 py-16 sm:py-24 scroll-mt-14`}>
      <Reveal>
        <p className={u.label}>Modes</p>
        <h2 className="mt-4 font-display font-normal tracking-normal text-[1.9rem] sm:text-[2.9rem] leading-[1.12]">
          Every mode on one{" "}
          <span className={u.accent}>keyboard.</span>
        </h2>
        <p className={`mt-4 text-sm sm:text-base max-w-[460px] leading-relaxed ${u.muted}`}>
          Time, words, quotes, stories. Shortcuts that stay out of the way. Four languages out of the box.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-10 sm:mt-14">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 items-start">
          <TabsTable isLight={isLight} />
          <SessionCard isLight={isLight} />
        </div>
      </Reveal>
    </section>
  );
}
