import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { ArrowRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import TypingDemo from "./TypingDemo";
import { ui } from "./utils";

const FACTS = ["Free & open source", "No account", "4 languages", "Runs in your browser"];

export default function Hero({ isLight }) {
  const u = ui(isLight);

  return (
    <section className={`border-b ${u.line} px-4 sm:px-10 pt-14 sm:pt-25`}>
      <div className="flex flex-col items-center text-center">
        <h1 className="font-display font-normal tracking-normal text-[2.3rem] sm:text-[4.4rem] leading-[1.08]">
          Find your rhythm,
          <br />
          beat your <span className={u.accent}>record</span>.
        </h1>

        <p className={`mt-6 max-w-[520px] text-sm sm:text-base leading-relaxed ${u.muted}`}>
          RhythmKey tracks your speed, highlights your mistakes, and shows exactly where
          your pace dropped. Live stats, custom tests, nothing in the way.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <TransitionLink
            to="/app/taketypingtest"
            className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${u.btn}`}
          >
            Start Typing
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </TransitionLink>
          <a
            href="https://github.com/bilalmlkdev/rhythmkey.git"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${u.ghost}`}
          >
            <FiGithub size={14} />
            View source
          </a>
        </div>

        <ul className={`mt-7 mb-12 sm:mb-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 ${u.label}`}>
          {FACTS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <TypingDemo isLight={isLight} />
    </section>
  );
}
