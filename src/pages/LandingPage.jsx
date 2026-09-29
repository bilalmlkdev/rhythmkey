import React from "react";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import { ui } from "../components/landing/utils";

export default function LandingPage({ isLight, setTheme }) {
  const u = ui(isLight);
  return (
    <div className={`min-h-screen font-grotesk ${u.page}`}>
      <Header isLight={isLight} setTheme={setTheme} />
      <div className={`max-w-[1120px] mx-auto min-h-[calc(100vh-3.5rem)] flex flex-col border-x ${u.line}`}>
        <Hero isLight={isLight} />
        <Features isLight={isLight} />
        <HowItWorks isLight={isLight} />
        <CTASection isLight={isLight} />
        <Footer isLight={isLight} />
      </div>
    </div>
  );
}
