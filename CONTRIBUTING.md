# Contributing to RhythmKey

Thanks for wanting to make RhythmKey better. This project is a fully
client-side typing test, so most contributions are small, focused, and
easy to test in a browser.

## Getting started

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/rhythmkey.git
   cd rhythmkey
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:3000`.

## Before you open a pull request

- Run `npm run lint` and fix any errors it reports.
- Run `npm run build` and make sure the production build passes.
- Test your change in both light and dark themes if it touches visuals.
- Test on the typing test page (`/app/taketypingtest`) if it touches the
  test engine, since that is the core of the app.

## What makes a good contribution

- Bug fixes with clear reproduction steps
- Accessibility improvements (keyboard navigation, screen readers, contrast)
- New word lists or language packs (add them under `src/data/`)
- Sound packs (wire them through the existing `soundPack` setting)
- Stats and results improvements (charts, exports, accuracy breakdowns)
- Documentation fixes

For larger changes (new routes, new settings, engine behavior changes),
open an issue first so we can agree on the direction before you build it.

## Project layout

- `src/pages/` - route-level pages (landing, test engine, stats, about)
- `src/components/landing/` - marketing landing page sections
- `src/components/typing/` - typing test UI pieces
- `src/components/Result/` - results screen
- `src/hooks/` - test engine, stats, settings, theme logic
- `src/data/` - word lists, quotes, stories
- `src/utils/` - text generation and helpers

Architecture notes live in the README under "Inside the codebase".

## Commit messages

Keep them short and prefixed when it fits:

- `fix:` bug fixes
- `feat:` new features
- `perf:` performance work
- `docs:` documentation only
- `style:` styling only, no behavior change

## Code style

- JavaScript with JSX (no TypeScript in this project)
- Tailwind CSS v4 utility classes, no CSS files per component
- Functional components and hooks only
- Match the formatting of the file you are editing

## Reporting issues

Use the GitHub issue templates. Include the browser you used, the
steps to reproduce, and what you expected versus what happened.

## License

By contributing, you agree that your contributions are licensed under
the MIT License, the same license that covers the project.
