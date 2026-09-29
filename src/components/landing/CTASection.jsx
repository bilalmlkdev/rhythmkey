import React from "react";
import { TransitionLink } from "../layout/PageTransition";
import { ArrowRight } from "lucide-react";
import { ui } from "./utils";
import Reveal from "./Reveal";

export default function CTASection({ isLight }) {
  const u = ui(isLight);
  return (
    <section className={`border-b ${u.line} px-4 sm:px-10 py-20 sm:py-28`}>
      <Reveal className="flex flex-col items-center text-center">
        <h2 className="font-display font-normal tracking-normal text-[2.2rem] sm:text-[3rem] leading-[1.1]">
          Your next personal best
          <br />
          starts{" "}
          <span className={u.accent}>here.</span>
        </h2>
        <TransitionLink
          to="/app/taketypingtest"
          className={`group mt-9 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all active:scale-95 ${u.btn}`}
        >
          Start Typing
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </TransitionLink>
        <p className={`mt-4 ${u.label}`}>No sign-up &middot; Stats never leave your browser</p>
      </Reveal>
    </section>
  );
}
