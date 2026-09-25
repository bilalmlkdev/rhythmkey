import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { Zap, Sliders } from "lucide-react";
import { FEATURES } from "./data";

function bannerStyle(isLight) {
  if (isLight) {
    return {
      backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1.2px),
        radial-gradient(ellipse at 18% 45%, #c9b4ff 0%, transparent 55%),
        radial-gradient(ellipse at 78% 28%, #9b72ff 0%, transparent 55%),
        radial-gradient(ellipse at 55% 95%, #6b4de0 0%, transparent 55%),
        linear-gradient(120deg, #f1eaff 0%, #e6dbff 45%, #dfe9ff 100%)`,
      backgroundSize: "14px 14px, auto, auto, auto, auto",
    };
  }
  return {
    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.14) 1px, transparent 1.2px),
      radial-gradient(ellipse at 18% 45%, rgba(155, 114, 255, 0.4) 0%, transparent 55%),
      radial-gradient(ellipse at 78% 28%, rgba(155, 114, 255, 0.28) 0%, transparent 55%),
      radial-gradient(ellipse at 55% 95%, rgba(107, 77, 224, 0.35) 0%, transparent 55%),
      linear-gradient(120deg, #17141f 0%, #14121c 45%, #12141f 100%)`,
    backgroundSize: "14px 14px, auto, auRhythmKey tracks your speed, highlights your mistakes, and adapts to how you type. Live stats. Custom tests. Zero clutter.to, auto, auto",
  };
}

function FeatureCard({ isLight, icon, title, desc, cta, href }) {
  const Icon = icon;
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg ${
        isLight ? "bg-zinc-900 text-white" : "bg-[#161618] border border-white/10 text-zinc-100"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 border ${
          isLight ? "border-white/15 bg-white/5" : "border-white/10 bg-white/5"
        }`}
      >
        <Icon size={16} className="text-[#9b72ff]" />
      </div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p
        className={`mt-2 text-[13px] leading-relaxed ${
          isLight ? "text-zinc-400" : "text-zinc-400"
        }`}
      >
        {desc}
      </p>
      <TransitionLink
        to={href}
        className={`mt-5 inline-block px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 ${
          isLight
            ? "bg-white text-zinc-900 hover:bg-zinc-100"
            : "bg-white text-black hover:bg-white/90"
        }`}
      >
        {cta}
      </TransitionLink>
    </div>
  );
}

export default function Features({ isLight }) {
  const liveStats = FEATURES[0];
  const customTests = FEATURES[1];

  return (
    <section id="features" className="px-6 sm:px-10 pt-5 pb-4">
      <div className="relative">
        <div
          className="rounded-2xl h-[220px] sm:h-[280px] w-full"
          style={bannerStyle(isLight)}
          aria-hidden
        />
        <div className="relative z-10 -mt-24 sm:-mt-28 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[660px] mx-auto">
          <FeatureCard
            isLight={isLight}
            icon={Zap}
            title={liveStats.title}
            desc={liveStats.desc}
            cta="See your stats"
            href="/stats"
          />
          <FeatureCard
            isLight={isLight}
            icon={Sliders}
            title={customTests.title}
            desc={customTests.desc}
            cta="Start a test"
            href="/app/taketypingtest"
          />
        </div>
      </div>
    </section>
  );
}
