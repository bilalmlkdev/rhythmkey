import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "RhythmKey",
        short_name: "RhythmKey",
        description:
          "A sleek typing test application with live stats and customizable settings.",
        start_url: "/app/taketypingtest",
        display: "standalone",
        background_color: "#111113",
        theme_color: "#9b72ff",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache every hashed build asset automatically, so this list
        // never goes stale across deploys the way a hand-written one did.
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,mp3}"],
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "rhythmkey-runtime",
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    // This ensures React Router handles all routes during development
    historyApiFallback: true,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
