# Sledge QA Automation

E2E tests for [getsledge.com](https://www.getsledge.com) using Playwright + TypeScript.

Covers the main user-facing flows: homepage, navigation, pricing page, and the contact form. Uses Page Object Model to keep locators separate from test logic.

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Running tests

```bash
npm test                    # all browsers
npm run test:chromium       # just chrome
npm run test:headed         # watch it run
npm run report              # open the html report
```

## What's tested

- **Homepage** — page load, hero content, sign-in link, app store links, footer social links
- **Navigation** — all nav items render, pricing/sign-in links work, logo points home, footer links aren't broken
- **Pricing** — plan tiers show up, CTAs link correctly, FAQ section, feature comparison table
- **Contact** — form fields visible, empty submit stays on page, filling fields works, contact option cards

22 tests total across 4 spec files.

## CI

GitHub Actions runs the suite on every push/PR to main. Config is in `.github/workflows/playwright.yml`. It runs chromium only to keep it fast, uploads the report as an artifact.

## Test Report

![Playwright Test Report](Report%20Screenshot.png)

## Bug report

See [BUG_REPORT.csv](BUG_REPORT.csv).

## Structure

```
pages/          -> page objects (HomePage, PricingPage, ContactPage)
tests/          -> test specs
.github/        -> CI workflow
```
