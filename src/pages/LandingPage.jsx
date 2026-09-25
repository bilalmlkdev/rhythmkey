import React from "react";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

export default function LandingPage({ isLight, setTheme }) {
  return (
    <div
      className={`min-h-screen font-grotesk ${
        isLight ? "bg-white text-zinc-900" : "bg-[#0b0b0d] text-zinc-100"
      }`}
    >
      <div className="max-w-[1100px] mx-auto min-h-screen flex flex-col">
        <Header isLight={isLight} setTheme={setTheme} />
        <Hero isLight={isLight} />
        <Features isLight={isLight} />
        <HowItWorks isLight={isLight} />
        <CTASection isLight={isLight} />
        <Footer isLight={isLight} />
      </div>
    </div>
  );
}
