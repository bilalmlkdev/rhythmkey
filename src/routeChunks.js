// Shared dynamic-import loaders for each route chunk.
//
// App.jsx wraps these in React.lazy, and PageTransition uses the same
// functions to warm the destination chunk while the route-transition
// cover is animating, so slow first-time downloads happen under the
// cover instead of after it starts fading out.

export const loadLanding = () => import("./pages/LandingPage");
export const loadMain = () => import("./pages/MainPage");
export const loadStats = () => import("./pages/StatsPage");
export const loadAbout = () => import("./pages/AboutPage");
export const loadNotFound = () => import("./pages/NotFoundPage");

export const ROUTE_PRELOADS = {
  "/": loadLanding,
  "/app/taketypingtest": loadMain,
  "/stats": loadStats,
  "/about": loadAbout,
};
