# Security Policy

## Supported versions

RhythmKey is a static, client-side app. The version deployed at
[rhythmkey.vercel.app](https://rhythmkey.vercel.app/) and the `main`
branch are always considered supported. Older commits are not patched
separately.

## What counts as a security issue

- Cross-site scripting (XSS) in the custom text input, results screen,
  or anywhere user-provided text is rendered
- Any way to read another visitor's stats or settings from `localStorage`
- Service worker issues that could serve stale or tampered assets
- Dependency vulnerabilities with a realistic exploit path in this app
- Leakage of visitor data on the stats/analytics side of the portfolio
  (note: that data lives in a separate project)

Not security issues: denial of service against the demo deployment,
social engineering, or bugs that only affect the attacker's own browser.

## RhythmKey stores everything locally

There are no accounts and no servers. Stats, settings, and custom texts
live in the visitor's own `localStorage`. Reports that require server
access do not apply here.

## Reporting a vulnerability

Please do not open a public issue for security problems.

Email: bilalmlkdev@gmail.com

Include:

- What the vulnerability is and where it occurs
- Steps to reproduce it
- The affected browser and, if relevant, the deployed URL
- Any suggested fix, if you have one

You should get an acknowledgment within 72 hours. If the report is
accepted, a fix will be prepared and credited to you in the release
notes before disclosure. If the report is declined, you will get an
explanation.

For issues that can be reported through GitHub's private advisory
feature, you can also use:

https://github.com/bilalmlkdev/rhythmkey/security/advisories/new
