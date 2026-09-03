import React from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import LandingPage from "./pages/LandingPage";
import StatsPage from "./pages/StatsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainPage from "./pages/MainPage";
import { PageTransitionProvider } from "./components/layout/PageTransition";

export default function App() {
  const { isLight, theme, setTheme } = useTheme();

  return (
    <PageTransitionProvider isLight={isLight}>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage isLight={isLight} theme={theme} setTheme={setTheme} />
          }
        />
        <Route
          path="/app/taketypingtest"
          element={
            <MainPage isLight={isLight} theme={theme} setTheme={setTheme} />
          }
        />
        <Route path="/stats" element={<StatsPage isLight={isLight} />} />
        <Route path="/about" element={<AboutPage isLight={isLight} />} />
        <Route path="*" element={<NotFoundPage isLight={isLight} />} />
      </Routes>
    </PageTransitionProvider>
  );
}
