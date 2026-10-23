# ODOOVATIONS — final scorecard

Section 19 of the optimisation brief. Every score below is tied to a
measurement that was actually run, against a production build (`npm run
build` then `next start`) on a deliberately unoccupied port. Where something
was not measured, it is marked not measured rather than given a number.

A note on method, because it changed two conclusions in this pass. A port
collision once made an audit crawl an unrelated site and report 86 false
failures, so the port is now checked with `ss -tln` before every run. And two
findings in this section came from reading screenshots and Lighthouse output
rather than from the automated suite, which had been reporting clean.

Run date: 2026-10-13. Commits `c956bfe`..`7e8a805`.

---

## Scores

| Area | Score | Based on |
|---|---|---|
| Accessibility | 10 / 10 | axe 0 violations over 13 pages × 2 themes; Lighthouse a11y 100 on 10 page/form-factor runs |
| SEO & structured data | 10 / 10 | 83/83 pages: 200, one H1, canonical, valid JSON-LD, 0 issues; Lighthouse SEO 100 |
| Technical correctness | 10 / 10 | 0 broken links, 0 orphans, 0 images missing alt, 0 console errors; typecheck and lint clean |
| Layout robustness | 10 / 10 | 0 layout issues over 16 viewports × 14 pages, 320px to 2560px |
| Honesty of claims | 10 / 10 | Status badge on every project card; no fabricated metrics, awards, partner status or testimonials anywhere on the site |
| Conversion path | 9 / 10 | Division-specific CTA on 16/16 service pages with form prefill; one ask per page; three required fields instead of seven |
| Content distinctness | 9 / 10 | Sentences repeated on 4+ pages: 41 → 14; on 8+ pages: 31 → 4; titles, descriptions and H1s already unique |
| Desktop performance | 10 / 10 | Lighthouse performance 99–100 across five pages; LCP 0.6–0.8s |
| Mobile performance | 6 / 10 | LCP 2.8–3.8s. Stable, and the weakest number on the site |
| Project evidence | not scored | Blocked on assets only the owner holds — see Blocked below |

Mobile performance is the one area that is genuinely not good, and it is
scored accordingly rather than rounded up.

---

## Measurements

### Lighthouse

Five pages × two form factors, after the accessibility fixes in `7e8a805`.

| Page / form factor | Perf | A11y | BP | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| home desktop | 99 | 100 | 100 | 100 | 0.8 s | 0 |
| home mobile | 67–88 | 100 | 100 | 100 | 3.8 s | 0 |
| services desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 |
| services mobile | 95 | 100 | 100 | 100 | 2.8 s | 0 |
| contact desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 |
| contact mobile | 95 | 100 | 100 | 100 | 2.8 s | 0 |
| portfolio desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 |
| portfolio mobile | 86 | 100 | 100 | 100 | 3.6 s | 0.006 |
| about desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 |
| about mobile | 95 | 100 | 100 | 100 | 2.9 s | 0 |

Accessibility, best practices and SEO are 100 on all ten runs.

**The home mobile performance score is reported as a range on purpose.**
Three consecutive runs on identical code gave 67, 88 and 88. LCP was stable
at 3.7–3.8s across all three; total blocking time swung between 40ms and
820ms depending on machine load, and that swing is what moves the score. A
single run of this number is not trustworthy, so quoting one would be
misleading. LCP is the figure to judge by, and it is honest to say it is
slow.

### Audit suite

| Check | Result |
|---|---|
| SEO, 83 sitemap URLs | 83/83 200, one H1, canonical present, valid JSON-LD; 0 issues (0 critical, 0 high) |
| Internal links | 5262 links, 0 broken, 0 redirecting, 0 orphan pages |
| Images | 104 checked, 0 non-200, 0 missing alt, 91 intentionally decorative |
| axe WCAG A/AA | 0 violations, 13 pages × 2 themes |
| Visual QA | 0 layout issues, 0 console errors, 16 viewports × 14 pages |
| Text-extraction fusion | 614 boundaries, below the 625 documented baseline |
| typecheck / lint | clean |

---

## What this pass changed

**§8 — CTA strategy.** `data/ctas.ts` holds CTA copy, hrefs and the service
each preselects in one place, so a label cannot drift from what it selects.
All 16 service pages resolve a division-specific CTA, and the form arrives
with that service already chosen. Odoo pages previously fell through to the
generic label because those nine services had neither `ctaLabel` nor
`division`; `custom-odoo-development` showed why slug-prefix inference would
have been the wrong fix, since it is an Odoo service whose slug does not
start with `odoo-`.

**§7 — Progressive enquiry form.** Seven required fields became three: name,
email, and what you need. Company, phone, country, industry, company size,
current systems, timeline, budget, preferred contact and the file upload moved
behind an optional disclosure. It is a `<details>` element rather than fields
mounted on click, so every input stays in the server-rendered HTML — moving
content behind client-only state has already stripped project links from the
portfolio and shipped this form as "Loading form…" with all twelve inputs
absent. Relaxing the schema meant following the data: `LeadInput` now marks
those fields optional, the Odoo lead title falls back to the person's name,
and the notification email omits blanks instead of printing "undefined".

**§11 — Content repetition.** Nine Odoo service pages shared one FAQ block and
all fourteen industry pages shared another, both emitted as `FAQPage` schema.
Twenty-three pages now carry questions specific to them.

**§14 — Mobile audit.** Added the 430px viewport named in the brief, plus the
About and Clients pages.

**§10 — Micro-refinements.** 41 distinct font sizes down to 37 by collapsing
five half-step twins; body copy now sits on 13/14/15/16/17.

**§18 — Screenshots.** Twenty captures, desktop and mobile. Reading them found
the cookie banner covering the form, and a duplicate CTA at the bottom of
almost every page.

**Honesty fixes found along the way.** The hero dashboard's "Illustrative
demo" badge was 10px against 17px of fabricated PKR figures; it now reads
"Sample data — not client results" at a size that competes with what it
qualifies. The homepage walkthrough section is labelled "Illustrative
walkthroughs" rather than "Selected Work". A `RealWork` section shows the six
confirmed projects with status, before the demo section.

---

## What two audits missed

Worth recording, because it is a method point rather than a finding.

The axe suite reported 0 violations throughout. Lighthouse then found a real
WCAG AA failure: the eyebrow pill above the hero sat at 2.31:1 in OS light
mode, because `theme-dark` sections render on a light ground by design and the
violet was tuned for dark.

An earlier version of this note said axe missed it because it "runs at desktop
width in two site themes". That explanation was wrong and was disproved by
experiment. The real cause: where axe cannot work out the background behind
text (translucent layers, gradients, overlays) it returns the node as
"incomplete", not as a violation, and `scripts/a11y.mjs` only counted
violations. On the homepage that left about 236 nodes unchecked. The fix was
`scripts/contrast-check.mjs`, which composites the paint stack itself and
reports a ratio for most of those nodes (text over a gradient or image is still
reported as unverifiable, not as a pass). The 3.0 redesign also removed the OS
light-mode remap altogether, which was the source of that failure. Lighthouse
also found a heading-order violation where footer `h3`s skipped a level on pages
with no `h2` of their own.

Both are fixed and verified. The general point is that a clean automated suite
is evidence, not proof, and looking at the rendered page still finds things —
the duplicate CTA was visible in a screenshot while every audit called the page
clean.

---

## Not done

Listed explicitly so nothing unfinished reads as complete.

**Mobile performance** is still the weakest area, and a first pass at it was
made after this scorecard was written. It helped a little and the rest is not
a framer-motion problem.

`MaskedReveal` is used in 18 files and was what loaded framer-motion onto
nearly every route for a single slide-up. It is now a CSS transition with one
IntersectionObserver, with the same easing, duration, stagger and line
structure. Pages that used nothing else from the library no longer load it at
all: portfolio and About each ship about 19 KB less JavaScript (portfolio
250 → 231 KB, About 245 → 227 KB) and portfolio's script evaluation fell
from 754 ms to 516 ms. LCP moved only from 3.6 s to 3.5 s on portfolio and
not at all on About (2.9 s).

The home and services pages genuinely use framer-motion (a scroll-linked rail,
AnimatePresence swaps), so those components were moved to `LazyMotion` with
the `m` element and an async feature chunk, behaviour unchanged. The build
report shows services First Load JS falling from 150 to 125 kB, but a
five-run A/B under identical conditions showed total JS transferred during
the page's life fell only from 251 to 243 KB and the score did not improve
(median 69 before, 63 after, inside the machine's noise). The async chunk
still loads and evaluates during the page; the change defers the cost without
removing it. It is kept because it is behaviourally verified and not worse
beyond noise, but it should not be read as a performance win.

What dominates the rest is not in the animation code. The LCP element on every
page is an ordinary paragraph that paints in 300 to 1000 ms unthrottled, and
Lighthouse's CPU throttling stretches that to 3 to 4 s against roughly 230 to
250 KB of JavaScript, 87 KB of which is the shared React and Next runtime. Total
blocking time on identical code ranged from 286 ms to 1238 ms between runs, so
single Lighthouse scores on this machine are not reliable. The one separate, easy win
was the site icon: 96 KB at 512px for an image shown at 16 to 48px. It is now
10 KB at 192px, and the Apple touch icon 9 KB at 180px, visually identical.

**§5 project detail pages** are blocked on screenshots. Published projects
currently say "Detailed case study available on request", which is accurate.

### Blocked on the owner

None of this will be invented:

- Testimonials with real client names and permission to publish
- Team and founder details
- Project screenshots
- Scope of the KCCI software (client confirmed as the Karachi Chamber of Commerce & Industry)

---

## Deployment

Superseded: the 3.0 redesign was deployed on explicit instruction. See
`audit/V4-RESULTS.md` for the state of the branch that follows it.
