import React, { useRef } from "react";
import { Zap, Sliders, Lock, BarChart2 } from "lucide-react";
import { FEATURES } from "./data";
import { KEYBOARD_THEME_PREVIEWS } from "../ui/Keyboard";
import ResultChart from "../Result/ResultChart";
import { useResultGraph } from "../../hooks/useResultGraph";
import { ui } from "./utils";
import Reveal from "./Reveal";

const ICONS = [Zap, Sliders, Lock, BarChart2];

function Pills({ u, items, on }) {
  return (
    <div className={`inline-flex flex-wrap items-center gap-0.5 p-1 rounded-full border ${u.pill}`}>
      {items.map((t) => (
        <span key={t} className={`px-3 py-1 rounded-full text-[12px] font-medium ${t === on ? u.pillOn : u.faint}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

// Same look as the typing area: dim upcoming text, red underlined mistakes.
function LiveStatsVisual({ u }) {
  return (
    <div className={`mt-6 rounded-2xl border p-5 ${u.line} ${u.panel}`}>
      <div className="flex items-baseline justify-end gap-2 text-sm font-semibold tabular-nums">
        <span className={u.accent}>12s</span>
        <span>118 <span className={`text-xs font-normal ${u.faint}`}>wpm</span></span>
        <span>96 <span className={`text-xs font-normal ${u.faint}`}>% acc</span></span>
      </div>
      <p className="mt-2 text-lg sm:text-xl leading-[1.8] tracking-wide">
        <span className={u.done}>hold plant sight </span>
        <span className={`${u.wrong} underline decoration-2 underline-offset-4`}>h</span>
        <span className={u.done}>our road </span>
        <span className="relative">
          <span className={`absolute -left-px top-[0.25em] h-[1.2em] w-[2px] rk-caret ${u.accentBg}`} />
          <span className={u.todo}>new solve inch field shape</span>
        </span>
      </p>
    </div>
  );
}

function ModesVisual({ u }) {
  return (
    <div className="mt-6 space-y-2.5">
      <Pills u={u} items={["time", "words", "stories", "quotes"]} on="quotes" />
      <div className="flex flex-wrap gap-2.5">
        <Pills u={u} items={["15s", "30s", "60s", "120s"]} on="60s" />
        <Pills u={u} items={["EN", "ES", "FR", "DE"]} on="EN" />
      </div>
      <div className={`flex items-center gap-2 pt-1 ${u.faint}`}>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em]">Keyboards</span>
        {Object.entries(KEYBOARD_THEME_PREVIEWS).map(([name, t]) => (
          <span
            key={name}
            title={name}
            className="w-5 h-5 rounded-md border border-black/20 flex items-end justify-end p-0.5"
            style={{ background: t.base }}
          >
            <span className="w-2 h-2 rounded-sm" style={{ background: t.accent }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function LocalVisual({ u }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {["no account", "no server", "works offline"].map((c) => (
        <span key={c} className={`px-3 py-1.5 rounded-full border text-[12px] font-medium ${u.pill} ${u.muted}`}>
          {c}
        </span>
      ))}
    </div>
  );
}

const SAMPLE_WPM = [88, 96, 101, 99, 108, 112, 109, 118, 121, 117, 124, 126, 122, 128, 128];
const SAMPLE_ACC = [100, 100, 98, 97, 97, 98, 97, 96, 97, 97, 96, 96, 97, 96, 96];
const SAMPLE_HISTORY = SAMPLE_WPM.map((wpm, i) => ({ time: (i + 1) * 2, wpm, accuracy: SAMPLE_ACC[i] }));

// The app's own result chart (axes, WPM + accuracy lines, hover tooltip) fed with sample data.
function PaceChart({ u, isLight }) {
  const svgRef = useRef(null);
  const g = useResultGraph(SAMPLE_HISTORY, 128);
  return (
    <div className={`mt-6 rounded-2xl border pt-4 pb-6 ${u.line} ${u.panel}`}>
      <ResultChart
        svgRef={svgRef}
        chartWidth={g.chartWidth}
        chartHeight={g.chartHeight}
        maxWpm={g.maxWpm}
        maxTime={g.maxTime}
        minWpm={g.minWpm}
        validHistory={g.validHistory}
        wpmPoints={g.wpmPoints}
        accPoints={g.accPoints}
        isLight={isLight}
      />
      <p className={`text-center text-[11px] ${u.faint}`}>Sample 30s run &middot; hover the chart</p>
    </div>
  );
}

function Cell({ u, index, num, className = "", children }) {
  const Icon = ICONS[index];
  const f = FEATURES[index];
  return (
    <div className={`p-6 sm:p-8 ${u.cell} ${className}`}>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border ${u.line} ${u.panel}`}>
          <Icon size={15} className={u.accent} />
        </span>
        <span className={u.label}>{String(num).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-5 font-display font-normal tracking-normal text-xl">{f.title}</h3>
      <p className={`mt-2 text-[13px] sm:text-sm leading-relaxed max-w-[460px] ${u.muted}`}>{f.desc}</p>
      {children}
    </div>
  );
}

export default function Features({ isLight }) {
  const u = ui(isLight);

  return (
    <section id="features" className={`border-b ${u.line} px-4 sm:px-10 py-16 sm:py-24 scroll-mt-14`}>
      <Reveal>
        <p className={u.label}>Features</p>
        <h2 className="mt-4 font-display font-normal tracking-normal text-[1.9rem] sm:text-[2.9rem] leading-[1.12] max-w-[640px]">
          Everything the test needs. <span className={u.accent}>Nothing</span> it doesn&apos;t.
        </h2>
      </Reveal>

      <Reveal delay={100} className="mt-10 sm:mt-14">
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border ${u.line} ${u.lineBg}`}>
          <Cell u={u} index={0} num={1} className="lg:col-span-2">
            <LiveStatsVisual u={u} />
          </Cell>
          <Cell u={u} index={2} num={2}>
            <LocalVisual u={u} />
          </Cell>
          <Cell u={u} index={1} num={3}>
            <ModesVisual u={u} />
          </Cell>
          <Cell u={u} index={3} num={4} className="lg:col-span-2">
            <PaceChart u={u} isLight={isLight} />
          </Cell>
        </div>
      </Reveal>
    </section>
  );
}
