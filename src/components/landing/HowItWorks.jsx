import React, { useState } from "react";
import { TransitionLink } from "../layout/PageTransition";
import { CONSOLE_TABS } from "./data";
import { borderColor } from "./utils";

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
  const borderCol = borderColor(isLight);
  const [active, setActive] = useState(0);
  const tab = CONSOLE_TABS[active];

  return (
    <div className={`rounded-xl border overflow-hidden ${borderCol} ${isLight ? "bg-white" : "bg-[#111113]"}`}>
      <div className={`flex items-center gap-5 px-4 pt-3 border-b ${borderCol}`}>
        {CONSOLE_TABS.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setActive(i)}
            className={`relative pb-2.5 text-[13px] font-medium transition-colors ${
              i === active
                ? "text-[var(--rk-foreground)]"
                : isLight
                  ? "text-zinc-500 hover:text-zinc-800"
                  : "text-zinc-500 hover:text-zinc-300"
            }`}
            style={{ "--rk-foreground": isLight ? "#18181b" : "#fafafa" }}
          >
            {t.label}
            {i === active && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#9b72ff] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-[1.1fr_1fr_0.8fr] gap-2 px-4 py-2.5 border-b text-[11px] font-semibold uppercase tracking-wider ${borderCol} ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
        <span>{tab.header[0]}</span>
        <span>{tab.header[1]}</span>
        <span>{tab.header[2]}</span>
      </div>

      <div>
        {tab.rows.map((row, i) => (
          <div
            key={`${tab.label}-${i}`}
            className={`grid grid-cols-[1.1fr_1fr_0.8fr] gap-2 items-center px-4 py-3.5 ${
              i !== tab.rows.length - 1 ? `border-b ${borderCol}` : ""
            }`}
          >
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{row.a}</div>
              <div className={`text-[11px] truncate ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                {row.aSub}
              </div>
            </div>
            <span className={`text-[13px] truncate ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              {row.b}
            </span>
            <span className={`flex items-center gap-1.5 text-[13px] ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#9b72ff] shrink-0" />
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionCard({ isLight }) {
  const borderCol = borderColor(isLight);
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

  const fieldClass = `w-full rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#9b72ff]/40 ${
    isLight
      ? "bg-white border-zinc-200 text-zinc-900"
      : "bg-[#131315] border-white/10 text-zinc-100"
  }`;

  return (
    <div className={`rounded-xl border p-6 ${borderCol} ${isLight ? "bg-white" : "bg-[#111113]"}`}>
      <h3 className="text-base font-semibold tracking-tight">Start a session</h3>
      <p className={`text-xs mt-1 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
        No account needed. Your stats stay in this browser.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className={`text-xs font-medium block mb-1.5 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Mode
          </label>
          <select value={mode} onChange={handleMode} className={fieldClass}>
            {MODE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {lengths.length > 0 && (
          <div>
            <label className={`text-xs font-medium block mb-1.5 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              Length
            </label>
            <select value={length} onChange={(e) => setLength(e.target.value)} className={fieldClass}>
              {lengths.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
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
          <span className={`text-[13px] ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
            Numbers and symbols
          </span>
        </label>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <TransitionLink
          to={startHref}
          className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${
            isLight
              ? "bg-zinc-900 text-white hover:bg-black"
              : "bg-white text-black hover:bg-white/90"
          }`}
        >
          Start test
        </TransitionLink>
        <TransitionLink
          to="/stats"
          className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all active:scale-95 ${
            isLight
              ? "border-zinc-200 text-zinc-700 hover:bg-zinc-50"
              : "border-white/15 text-zinc-300 hover:bg-white/5"
          }`}
        >
          View stats
        </TransitionLink>
      </div>
    </div>
  );
}

export default function HowItWorks({ isLight }) {
  return (
    <section className="px-6 sm:px-10 py-16">
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05]">
            Every mode on
            <br />
            one <span className="italic">keyboard</span>.
          </h2>
          <p className={`mt-4 text-sm max-w-[300px] leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
            Time, words, quotes, stories. Shortcuts that stay out of the way.
            Four languages out of the box.
          </p>
          <div className="mt-8">
            <TabsTable isLight={isLight} />
          </div>
        </div>

        <SessionCard isLight={isLight} />
      </div>
    </section>
  );
}
