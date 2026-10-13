# Part 2 — Premium Digital Experience: Delivered Work

Baseline: tag `pre-part2-premium` (commit f3acd2c). All figures below are
real measurements on the production build (Playwright/Chromium, Lighthouse
mobile emulation, median of 3), not estimates.

## A note on the starting audit

The first audit of this phase reported 86 critical SEO failures. They were
false: a different project's dev server already occupied port 3300, so the
crawler measured `ahminternationals.com`, an unrelated garment site. Once
moved to a free port the real baseline was 83/83 URLs clean. Worth
recording because the same mistake would discredit any future audit.

## Completed

### 1. Text-extraction fusion — 825 → 625 boundaries
A browser puts block elements on separate lines, so a heading and the
paragraph after it read correctly on screen with no whitespace between them.
`textContent` — what many scrapers, several SEO tools and some AI retrieval
pipelines read — concatenated them: "…usually needsAn ERP is rarely…".

`components/ui/TextGap.tsx` emits a real whitespace text node; a codemod
placed it at 140 prose boundaries across 40 files. CSS cannot fix this:
`::after { content }` is never part of `textContent` (tried and reverted).

The remaining 625 are `LI→LI`, `TD→TD` and `SPAN→SPAN` inside lists, tables
and flex rows — ordinary markup crawlers parse correctly. Left deliberately.

### 2. Signature experience: connected-systems playground
`/#playground`. Four workflows (AI+WhatsApp, Sales+Inventory,
Import+Export, Odoo+Accounting) stepped node by node. Every step names its
actor — **System**, **AI** or **Person** — which is the honest claim: the
automation moves the work, a person still decides.

- No autoplay. Runs only when pressed, stops at the last step, costs
  nothing at load.
- Clicking a node selects it and halts playback.
- Built on the existing accessible Tabs primitive; nodes are real buttons,
  the active explanation is in an `aria-live` region, each node carries an
  sr-only "performed by …".
- `prefers-reduced-motion` disables the timer entirely (verified: counter
  stays at step 1 after 4s of play).
- Labelled as illustrative workflow patterns, not one client's system.

### 3. Homepage restructure — 29.5 → 16.7 screens
19 sections / 3,420 words / 29.5 screens was a catalogue. Now 1,972 words
(−44%).

| Moved | To | Why |
|---|---|---|
| ServicesRail, CustomStory, JourneyRoute | `/services` | Odoo-specific depth; the rail alone was 5,760px — 22% of the homepage |
| TrendingTopics | removed | duplicated the resources hub |
| TestimonialNarrative | removed | held back until named, verified testimonials exist |
| 18 FAQs → 6 | `/faq` | homepage emitted a second FAQPage schema competing with /faq; /faq now owns it (verified 1 vs 0) |

### 4. Searchable solution library
`data/solutions.ts` gained a `SolutionCategory` field (7 coarse groups).
`SolutionFinder` searches heading, answer-first summary, who-it-is-for line,
module tags and categories, so "stock" and "landed cost" resolve without
knowing a product name. Per-filter counts, `aria-live` result count,
no-match state routing to contact. URL state (`?category=&q=`) restored on
load — read after mount, not via `useSearchParams`, which in Next 14 forces
client-only rendering and previously orphaned pages.

### 5. About page rewritten
Was "An Odoo Team That Starts With Your Business" with 9 Odoo mentions on
the page that introduces the company. Now "Technology Built Around the Way
Business Really Works", all seven divisions, Build/Automate/Grow pillars,
the Kausar Innovations relationship, and a value that states plainly we
hold no Odoo partner badge. Odoo mentions 9 → 4.

### 6. Contact form now server-rendered — real bug the brief caught
The form called `useSearchParams`, forcing its subtree client-only, so the
HTML shipped `"Loading form…"` and all 12 inputs plus 238 country options
were absent without JavaScript. A visitor on a failed chunk could not
contact us. The hook was used only to prefill from the friction diagnostic;
it now reads `window.location` after mount.

Verified end to end: the real diagnostic produces a CTA carrying
`?issues=&friction=`, and following it prefills the challenge field.

### 7. Accessible-name mismatch
The logo's `aria-label` ("ODOOVATIONS — home") omitted the visible tagline,
making the accessible name a mismatch for visible text (WCAG 2.5.3). axe
missed it; Lighthouse caught it. Removed so the visible wordmark forms the
name, with an sr-only "home".

## Measurements

| Page | Perf | A11y | BP | SEO | TBT | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 89 | 97 | 100 | 100 | 90ms | 3.6s | 0.008 |
| Solutions | 95 | 100 | 100 | 100 | 30ms | 2.8s | 0.000 |
| Contact | 94 | 100 | 100 | 100 | 66ms | 2.9s | 0.000 |

Homepage improved from the 87 / 147ms TBT baseline *while* gaining the
playground — the restructure removed more weight than the new section added.

Site-wide: 83/83 URLs 200 with one H1, canonical and valid JSON-LD; 0 SEO
issues; 0 broken links, orphans or missing alt; axe 0 WCAG A/AA violations;
0 layout issues and 0 console errors across 15 viewports × 12 pages.

**Homepage accessibility 97, not 100** — the only failure is
`color-contrast` on the gradient-clipped hero headline. Verified manually
as a false positive: computed `color` is transparent so Lighthouse cannot
measure it, but the gradient stops give 4.15, 5.31 and 5.79:1 against
`--midnight`, and at 58.88px/650 weight it is large text needing 3.0:1.

## Not done, and why

| Item | Reason |
|---|---|
| Blue/cyan palette from Phase 21 | Would discard established violet brand recognition. Existing tokens already cover the three environments the brief describes. |
| Geist/Inter typography swap | Space Grotesk + Manrope already provide the display/body split with a tuned scale. A swap is churn without gain. |
| Industry Explorer (Experience C) | The 14 industry pages already carry workflow, challenges, solutions and the "beyond the ERP" section. An interactive selector on top would duplicate them. |
| Project Transformation Stories (Experience D) | Blocked on real assets: no approved screenshots exist for the six confirmed projects. Fabricating them is not an option. |
| Custom illustrations (Phase 26, assets 1–6) | Requires design assets or image generation not available here. The playground and existing diagrams are coded SVG/DOM, not stock art. |
| Mobile LCP 3.6s | Inherited. framer-motion (~120KB) is imported by 8 remaining homepage sections. Migrating them to CSS transitions is the next real performance lever; each needs individual visual review. |

## Still needs the owner

1. **Testimonials** — 2–3 quotes with real names and companies. The
   testimonial section stays out until these exist.
2. **Team** — founder name, photo, a sentence each. The site says "a
   Karachi-based team" and nothing more.
3. **Project screenshots** — for the six management-confirmed projects. Real
   UI is the most persuasive asset the portfolio could carry.
4. **What the KCCI software does** — the client is the Karachi Chamber of
   Commerce & Industry, but its card still says only "custom business software", which is thin.
