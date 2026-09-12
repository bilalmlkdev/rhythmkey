import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { PageTransitionProvider } from "./components/layout/PageTransition";
import RouteLoader from "./components/layout/RouteLoader";

// Each page is its own chunk now, so the initial load only ships the
// landing page instead of the entire app (typing engine, stats charts,
// export logic, etc. all load on demand when actually visited).
const LandingPage = lazy(() => import("./pages/LandingPage"));
const MainPage = lazy(() => import("./pages/MainPage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  const { isLight, theme, setTheme } = useTheme();

  return (
    <PageTransitionProvider isLight={isLight}>
      <Suspense fallback={<RouteLoader isLight={isLight} />}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isLight={isLight}
                theme={theme}
                setTheme={setTheme}
              />
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
      </Suspense>
    </PageTransitionProvider>
  );
}
