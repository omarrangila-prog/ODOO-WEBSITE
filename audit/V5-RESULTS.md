# v5 results (23 October 2026)

Local preview only (production build, `ODV_DRY_RUN=1`, port 3720). Nothing here is deployed.
Lighthouse numbers are lab runs on a loaded machine; no field data exists.

## What changed

- Homepage cut from eight sections to six, and from about 10.4 screens to 5.6 on a desktop.
- The project artwork is gone. Each featured project sits beside a labelled working demonstration;
  the demonstration scenarios show their own module list as an illustrative app menu; the two generated
  photographs (a person in a textile mill) were deleted.
- Three project pages at `/projects/<id>` (KCCI Election System, WhatsApp Digital Connection, Scrabble
  Tournament Timer): confirmed scope, a working demonstration, a "what this page rests on" panel and a
  briefing of questions to settle first. No outcomes, no "before" story and no screenshots, because none
  were supplied.
- Team: the total (83 team positions), the 25 role titles, 10 counted departments, 12 intern positions
  and a table of every role with its count. Unresolved counts are left out of the total and named.
- Enquiry paths: Shopify, WooCommerce, QuickBooks integration, Odoo and ERP, custom software, AI and
  automation, website or app, something else. Each asks its own two or three optional questions and the
  email arrives labelled with the path.

## Length (390 and 1363 px wide, whole page including footer)

| | Before | After | Cut |
|---|---|---|---|
| Desktop 1363 x 936 | 9,772 px (10.4 screens) | 5,196 px (5.6) | 47% |
| Phone 390 x 844 | 18,151 px (21.5 screens) | 7,135 px (8.5) | 61% |

Sections, desktop: hero 936, team 365, services 669, work 792, delivery 502, enquiry 1,030, footer about 900.
The desktop figure is just short of "half"; the phone figure is well past it.

## Tests run against the preview

| Check | Result |
|---|---|
| `home-qa.mjs` (hero, explorer, demonstrations, form paths, channels, nav, mobile) | all pass |
| `demo-layout.mjs` (3 demonstrations x 360/390/768/1024/1440: overflow, frame, layout shift) | all pass, no overflow, CLS at most 0.018 |
| `enquiry-paths-check.mjs` (11 URL forms, 3 platform pages, 3 project pages) | all pass |
| `contact-route-test.ts` (email provider stubbed; 28 checks including path answers) | all pass |
| `visual-qa.mjs` (16 viewports x 25 pages) | 0 layout issues, 0 console errors |
| `a11y.mjs` (axe WCAG A/AA, 26 pages) | 0 violations |
| `contrast-check.mjs` (26 pages x 2 widths) | 0 below AA; 11,773 text nodes measured, 6,134 unverifiable over gradients/images |
| `seo-audit.mjs` | 94 pages, 0 issues |
| `link-image-audit.mjs` | 0 broken links, 0 images missing alt, 0 orphans |
| `reveal-check.mjs`, `target-size.mjs`, `ribbon-check.mjs` | all pass |
| `team:check`, `case-study:check`, `products:check`, `tech:check` | all pass |

Two things the contrast check found along the way, both fixed: the mobile call bar was translucent, so its
11 px labels dropped to 3.2:1 when a white button scrolled behind it (now near-opaque), and the checker could
not see the header's dark fade, so it scored the logo as white on white (the checker now treats header text
as unverifiable while the fade is up).

## Lighthouse, local (mobile = default throttling, desktop = desktop preset)

| Page | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Home, mobile, run 1 | 74 | 100 | 100 | 100 | 3.7 s | 510 ms | 0 |
| Home, mobile, run 2 | 84 | 100 | 100 | 100 | 4.0 s | 50 ms | 0 |
| Home, desktop | 99 | 100 | 100 | 100 | 0.9 s | 10 ms | 0 |
| Project page, mobile | 94 | 100 | 100 | 100 | 3.0 s | 80 ms | 0 |
| Contact, mobile | 92 | 100 | 100 | 100 | 3.3 s | 90 ms | 0 |
| Team, mobile | 89 | 100 | 100 | 100 | 3.2 s | 220 ms | 0.006 |

Mobile LCP is still above 2.5 s on every page. On the home page the LCP element is the decorative still
ribbon image, which loads in about 90 ms and then waits roughly 2 s to paint under simulated 4x CPU
throttling; on inner pages it is the first paragraph after the scroll-reveal settles. TBT swings between
runs. These are lab figures from Chromium on one machine, not what visitors see.

## Not tested

- Real email delivery. The route was exercised with the provider stubbed and the form was submitted in dry-run
  mode; no message was sent anywhere. Whether the sending domain is verified with Resend is unknown.
- Real devices, Safari, Firefox, screen readers. The demonstrations are keyboard-operable and use native
  controls, but they have not been used with a screen reader.
- Anything on the live domain: this pass is not deployed.
