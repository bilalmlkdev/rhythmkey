import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import StatsPage from "./pages/StatsPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainPage from "./pages/MainPage";

export default function App() {
  const location = useLocation();
  const { isLight, theme, setTheme } = useTheme(); // also get setTheme

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage isLight={isLight} theme={theme} setTheme={setTheme} />
        }
      />
      <Route path="/stats" element={<StatsPage isLight={isLight} />} />
      <Route path="/about" element={<AboutPage isLight={isLight} />} />
      <Route path="*" element={<NotFoundPage isLight={isLight} />} />
    </Routes>
  );
}
