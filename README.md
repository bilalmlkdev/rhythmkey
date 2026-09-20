<div align="center">

  <a href="https://rhythmKey.vercel.app/">
    <img src="https://raw.githubusercontent.com/bilalmlkdev/rhythmKey/main/src/assets/favicon.svg" alt="RhythmKey Logo" width="100%" height="120">
  </a>

# RhythmKey

A sleek, open-source typing test application that combines performance tracking, <br> customizable settings, and a distraction-free interface to help you type faster and more accurately.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-black?style=for-the-badge)](https://rhythmKey.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/rhythmKey?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/rhythmKey.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

<p align="center">
  <i>Created by <a href="https://bilalmlkdev.vercel.app" target="_blank">Bilal Malik</a></i><br>
  <i>Follow on Github <a href="https://github.com/bilalmlkdev" target="_blank">bilalmlkdev</a></i>
</p>

[![RhythmKey Dashboard](https://raw.githubusercontent.com/bilalmlkdev/rhythmKey/main/src/assets/previewDark.webp)](https://rhythmKey.vercel.app/)
[![RhythmKey App](https://raw.githubusercontent.com/bilalmlkdev/rhythmKey/main/src/assets/previewAppDark.webp)](https://rhythmKey.vercel.app/)

## What is RhythmKey

Most typing tests want you to make an account before they'll show you a single word. RhythmKey doesn't. Open the site, hit start, and you're typing within a second - no sign-up, no onboarding flow, nothing syncing to a server you didn't ask for. Every test, every stat, and every setting you touch lives right in your browser.

Underneath that simplicity is a typing engine that actually pays attention. RhythmKey tracks every keystroke as it lands, flags mistakes the moment they happen instead of only at the end, and turns each finished run into a real breakdown - not just a single WPM number, but your raw speed, your consistency, exactly where you slowed down, and where you made mistakes.

It's built for two kinds of people: someone building muscle memory from scratch, and someone who already types fast and wants to know precisely where the next few WPM are hiding.

## How a test actually works

A run starts with picking a mode. You can type against the clock (15, 30, 60, or 120 seconds), aim for a fixed word count (10, 25, 50, or 100 words), work through a short story, type a quote, run in infinite mode with no end point, or drop in your own text entirely. On top of any mode, you can toggle punctuation, numbers, and symbols on or off, and pick a difficulty from easy to extra hard.

Once you start typing, the interface gets out of your way. The cursor moves with a smooth spring animation instead of snapping, mistakes get underlined immediately in red so you can see the pattern in your errors as it forms, and if you want it, RhythmKey will preview the next word before you reach it. Live WPM, accuracy, and your remaining time or word count sit quietly in view the whole time, updating in real time without breaking your rhythm.

When the test ends, you land on a full results screen: WPM, accuracy, raw WPM (your speed before accuracy is factored in), a consistency score, your mistake and backspace counts, and a performance graph showing your pace across the entire run. If you want to keep it, you can export the result as JSON, CSV, Markdown, PNG, JPG, or SVG.

## Making it feel like yours

RhythmKey ships with real customization instead of a single default you're stuck with. Switch between dark, light, or system theme. Pick a keyboard layout - QWERTY, AZERTY, or Dvorak - reflected live on an on-screen keyboard as you type. Choose a sound pack (click, mechanical, or typewriter) so the test sounds the way you want it to. Adjust cursor style, font size, whether live stats are visible while you type, and how long the app waits before treating you as idle.

There's also a practice mode that simply won't let an incorrect keystroke through, which is useful if you're deliberately building accuracy rather than chasing speed. Every setting you touch is saved automatically, so the app remembers your setup the next time you open it - no account required.

## Bring your own text

If none of the built-in modes fit what you want to practice, Custom Text mode lets you paste anything directly into the app, or upload a `.txt`, `.md`, `.csv`, or `.json` file. You get a preview before committing, and the text is trimmed automatically so a run doesn't end awkwardly mid-sentence.

## Tracking progress over time

Every completed test gets logged to a dedicated Statistics page, so a single run isn't the only thing that matters. You can see your total tests taken, your average and best WPM, your average accuracy, and a history of past runs - enough to actually tell whether you're improving, not just how one attempt went.

## Getting around faster

RhythmKey has a small set of keyboard shortcuts for people who'd rather not reach for the mouse mid-session: `Ctrl+K` opens settings, `Ctrl+S` opens stats, `Tab+Space` pauses the current test, and `Tab+Enter` restarts it. You can also share your exact current configuration - mode, difficulty, toggles and all - as a URL, so sending someone "try this exact test" is one link instead of a list of instructions.

## Design philosophy

RhythmKey is built around a simple rule: nothing should get between you and the next keystroke. That rule shaped most of the decisions in the app. There's no forced account creation, because an account adds a step between opening the tab and typing your first word. There's no server round-trip for saving a result, because `localStorage` is instant and doesn't need a network connection to work. And there's no single "correct" way to configure the test, because a beginner building muscle memory and someone chasing a personal-best WPM want genuinely different tools.

The interface itself follows the same idea. Stats are visible but not loud. The cursor moves naturally instead of jumping. Error feedback is immediate rather than saved for a summary screen you have to wait for. None of it is decorative - every piece of the UI is there because it answers a question you'd otherwise have to ask yourself mid-test: *how am I doing right now?*

## Frequently asked questions

**Does RhythmKey require an account or internet connection to use?**
No. Everything - your settings, your history, your custom text - is stored locally in your browser. You can use it offline after the first load.

**Where does my typing history go?**
Nowhere but your own browser's `localStorage`. RhythmKey has no backend and no database, so there's nothing to sync and nothing that leaves your device.

**Can I clear my saved history and start fresh?**
Yes, clearing your browser's site data for RhythmKey resets everything - stats, settings, and saved custom text - back to defaults.

**Will my results carry over if I switch browsers or devices?**
No, since storage is local to the browser you're using. If you need a result elsewhere, export it first using one of the supported formats.

**Is RhythmKey free to use?**
Yes, entirely. It's open-source under the MIT license, so you're also free to self-host it or modify it for your own use.

**Does RhythmKey work on mobile?**
The core experience is built and tuned for a physical keyboard, since that's what a typing test is fundamentally testing. It will load and run on mobile browsers, but you'll get the most accurate experience on a desktop or laptop.

**Can I use RhythmKey without JavaScript enabled?**
No. It's a client-side React application, so JavaScript is required for the app to run at all.

## Inside the codebase

```
index.html          Entry point
src/
 ├─ pages/           Main, Stats, About, NotFound
 ├─ components/      Reusable UI building blocks
 ├─ hooks/           Custom React hooks (typing logic, stats, settings, theme)
 ├─ utils/           Helper functions
 ├─ sounds/          Keyboard sound packs
 └─ data/            Word lists, stories, and quotes
public/              Static assets
package.json         Dependencies and scripts
```

The typing logic itself is split across a handful of focused hooks rather than one large component - `useTypingTest` drives the core test state, `useStats` and `useResultGraph` handle tracking and the performance chart, and `useSettings` and `useTheme` manage everything persisted to `localStorage`. If you're reading the source to see how it's put together, that's the place to start.

## A note on accessibility

Because RhythmKey is a keyboard-driven tool by nature, keyboard accessibility was treated as a core requirement rather than an afterthought. Every interactive control - mode selection, settings, the shortcuts panel - can be reached without a mouse. Error states use both color and underlining rather than color alone, so mistakes are distinguishable for people with color vision differences. Theme support (including a system-matching option) is there partly for the same reason: contrast preferences aren't one-size-fits-all.

If you run into something that isn't accessible the way it should be, that's treated as a bug, not a feature request - open an issue and it'll be looked at.

## Built with

<details open>
<summary><strong> RhythmKey is built using the following technologies</strong></summary>

- **React** - UI library
- **Vite** - Fast development & build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Modern icon library
- **React Icons** - Additional icon collection

</details>

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,git" />
<img src="https://go-skill-icons.vercel.app/api/icons?i=reactrouter" height="48" />
</p>

## Browser support

RhythmKey is built and tested against modern evergreen browsers - Chrome, Firefox, Edge, and Safari, on their recent versions. It relies on standard, well-supported browser APIs (`localStorage`, Web Audio for sound packs) rather than anything experimental, so if your browser is reasonably up to date, it should work without issue.

## Running it locally

```bash
# Clone repository
git clone https://github.com/bilalmlkdev/rhythmkey.git

# Enter directory
cd rhythmkey

# Install dependencies
npm install

# Start development server
npm run dev
```

No environment variables, no backend to spin up, and no API keys to configure - it runs entirely client-side, so `npm run dev` is genuinely the whole setup.

## What's next

RhythmKey is actively maintained, and a few things are on the radar for future updates:

- Additional language word lists beyond the ones currently bundled
- More sound pack options for the keyboard
- Deeper analytics on the Statistics page, like per-key accuracy heatmaps
- Additional export formats based on what people actually ask for

None of this is a fixed roadmap with dates attached - it's simply the direction the project is heading, and it can shift based on what turns out to matter most to people actually using it.

## Contributing

RhythmKey is open-source, and contributions are genuinely welcome, not just tolerated. If you want to work on something:

1. Fork the repository and clone your fork locally
2. Create a new branch for the change you're making
3. Make your changes and test them against `npm run dev`
4. Open a pull request with a clear description of what changed and why

Small fixes - a typo, a broken link, a minor styling issue - are just as welcome as larger features. If you're planning something bigger, like a new typing mode, opening an issue first to discuss the approach is a good idea before putting in the work.

## Show your support

If RhythmKey has been useful to you:

- Star the repository
- Fork the project and make it your own
- Report anything broken
- Suggest a mode or feature it's missing
- Open a pull request

Every bit of that helps keep RhythmKey moving forward.

## License (MIT)

This project is licensed under the **MIT License**.

```text
MIT License

Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
