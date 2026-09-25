# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

## [0.1.0] - 2026-09-25

First public release.

### Added

- Typing test engine with time, words, quotes, stories, infinite, and
  custom text modes
- Live WPM, accuracy, and mistake tracking during a test
- Results screen with per-second chart, top stats, and details bar
- Export results as JSON, CSV, Markdown, SVG, PNG, and JPG
- Stats page with the last 100 results persisted in localStorage
- Word lists in English, Spanish, French, and German
- Light, dark, and system themes with a manual toggle
- On-screen keyboard with QWERTY, AZERTY, and Dvorak layouts plus
  theme switcher (adapted from keebkit, used with permission)
- Key press and mistake sounds with a sound section in settings
- Settings modal (Ctrl + K) with mode, length, punctuation, numbers,
  symbols, difficulty, sound, theme, and keyboard options
- Shareable test URLs that encode the current config
- Keyboard shortcuts: Ctrl + S for stats, Tab + Space to pause,
  Tab + Enter to restart
- PWA support with offline fallback page
- Redesigned landing page with centered hero, feature banner, console
  split section, and session launcher
- Roadmap and documentation in the README

### Changed

- Lazy-loaded all routes, cutting the initial bundle from 918 KB to
  108 KB by avoiding lucide-react barrel imports
- Swapped in keebkit's interactive keyboard with a glass frame and
  theme pill switcher

### Fixed

- Route-transition loader no longer flashes the landing page before the
  main app appears on first-time navigation (the cover now stays up until
  the destination chunk has actually rendered, and warms the chunk in
  parallel)
- `__dirname` usage in `vite.config.js` under ES modules
- Seed-based avatar state reset moved from an effect to a keyed remount
