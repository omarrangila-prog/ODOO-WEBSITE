# Production Polish — Audit Summary

Baseline: tag `pre-polish-2026-09-11` (commit 4641f3a). All measurements below
are real-browser (Playwright/Chromium, Lighthouse) on the production build.

## Visual QA — 15 viewports × 12 pages (320px → 2560px)

| Defect | Baseline | After |
|---|---|---|
| Page-level horizontal overflow | 6 (`/industries`, every mobile width) | 0 |
| Content escaping viewport | 72 (header CTA off-screen at 1280px and 1536px, every page) | 0 |
| Clipped text | 0 (after excluding sr-only) | 0 |
| Standalone touch targets < 44px | 486 | 0 |
| Console errors / hydration warnings | 0 | 0 |

## Header (user-reported instability)

| Check | Baseline | After |
|---|---|---|
| Height on scroll | 84px → 70px (moved) | 77px constant |
| Height across routes | consistent | 77px on all 7 tested |
| CTA right edge at 1280px viewport | 1332px (**off-screen**) | 1249px |
| CTA right edge at 1536px viewport | 1657px (**off-screen**) | 1448px |
| Dropdown panels clear viewport | yes | yes, all four |
| Dropdown anchored to header bottom | started 20px inside header | anchored at header edge |
| Z-index | magic numbers | tokenised ladder (`--z-*`) |

Root cause: brand lockup (252px) + nine nav items (844px) + actions (172px)
+ 64px gutters needed 1396px at a 1280px viewport. Fixed by a header-specific
gutter, a compact logo mode below 1700px, `min-w-0` on nav, `shrink-0` on
actions, and a constant height.

## Mobile menu

| Check | Baseline | After |
|---|---|---|
| Background scroll locked | yes (overflow:hidden) | yes (position:fixed) |
| Scroll position restored on close | not guaranteed | exact pixel, verified |
| Closed menu links in tab order | **12 focusable** behind aria-hidden | 0 (`inert`) |

## Hero headline (LCP element)

Sampled every 30ms under 4× CPU throttle:

| | Baseline | After |
|---|---|---|
| First visible | ~250ms | ~250ms |
| Re-hidden after hydration | **yes — jumped 97px down at 1224ms, animated back over 800ms** | never |

## Lighthouse (median of 3, mobile emulation)

| | Baseline | After |
|---|---|---|
| Performance | 88 | 87 (within run noise) |
| TBT | 94ms | 147ms (both "good", < 200ms) |
| LCP | 3.8s | 3.8s |
| CLS | 0.032 | 0.032 |

Desktop: performance 99, accessibility 100, best-practices 100, SEO 100.

**Honest finding:** mobile LCP of ~3.8s under Lighthouse's simulated
throttling is inherited and unchanged. The LCP element is the hero H1 text.
Its paint is gated by HTML + CSS + font delivery, not by the animation (that
is now fixed). The remaining lever is reducing total client JS: framer-motion
(120KB chunk) is imported by 11 homepage sections. Migrating the simpler ones
to CSS transitions is the recommended next step; it was not done in this pass
because each carries visual risk and needs a per-component review.

Compositing cost removed on mobile: the `.grain` feTurbulence +
`mix-blend-mode: overlay` overlay (invisible at 3.5% opacity on a phone) is
now desktop-only.

## Accessibility
axe-core, WCAG 2 A/AA: 13 pages × 2 themes at desktop, 5 pages at 375px —
0 violations before and after (the inert fix closed a gap axe only sees at
mobile widths).

## SEO
80/80 URLs: 200, single H1, canonical, valid JSON-LD. 0 issues. 0 broken
links, 0 orphans, 0 images without alt.

## Content rules
- Bookkeeping language: 0 occurrences; accounting page now states the
  distinction explicitly.
- Capitalisation (FBR / AI / Odoo / WhatsApp / API / POS / ERP / CRM): clean.
- Contact details: single source (`data/company.ts`), old Gmail removed.
- Demo dashboard figures: labelled "Illustrative demo".

## Project & country claims
See `project-verification-matrix.md`. Six named projects from the brief
have no evidence in this repository and are recorded as
`NEEDS_VERIFICATION` — not rendered. No country other than Pakistan is
verified; the site says "remote delivery worldwide" with no count.
