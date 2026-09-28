import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
// Service worker registration is now handled automatically by
// vite-plugin-pwa (see vite.config.js) — no manual registration needed.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// Prevent Ctrl+ zoom (Ctrl/Cmd + +/-) and Ctrl+scroll zoom
// Use capture phase to intercept before browser handles it
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "0" || e.key === "=")) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

document.addEventListener("wheel", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    e.stopPropagation();
  }
}, { capture: true, passive: false });

// Reset zoom if it changes (visualViewport API)
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    if (window.visualViewport.scale !== 1) {
      document.body.style.zoom = `${1 / window.visualViewport.scale}`;
      setTimeout(() => { document.body.style.zoom = ""; }, 50);
    }
  });
}

// CSS fallback to prevent touch zoom and scroll zoom
const style = document.createElement("style");
style.textContent = `html, body { touch-action: manipulation; overscroll-behavior: none; }`;
document.head.appendChild(style);
