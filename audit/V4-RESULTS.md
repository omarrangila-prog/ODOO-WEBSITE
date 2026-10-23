# v4 results: what was run, under what conditions

Branch `v4-conversion-home`, built and tested locally on a production build
(`next build`, `next start -p 3710`, `ODV_DRY_RUN=1`). **Not deployed.** Nothing here
was measured on odoovations.com except where stated.

Test machine: a developer laptop, headless Chromium, no GPU, localhost (no CDN, no real
network). That flatters network time and penalises canvas drawing; read the numbers with
that in mind.

## Size of the homepage

| | Before (3.0, live) | After |
|---|---|---|
| Desktop, 1363×936 | 20,086 px (21.5 screens) | 9,772 px (10.4 screens), of which the footer is about 1,025 px |
| Phone, 390 wide | 22,840 px (27.1 screens) | 18,134 px (21.5 screens) |
| Sections | 10, plus the diagnostic and roadmap | 8 |

`scripts/home-height.mjs`. On desktop the eight sections come to about 9.3 screens,
inside the 7–10 budget. The phone page is long because it is a single column; no empty
panels were added to reach a number.

## Automated checks (final build unless noted)

| Check | Result |
|---|---|
| TypeScript, ESLint | clean |
| `team:check`, `case-study:check`, `products:check`, `tech:check` | all pass; 0 case studies and 0 products published (none qualify) |
| `scripts/home-qa.mjs` (hero action, explorer, demo, form, channels, nav, mobile) | all pass |
| `scripts/ribbon-check.mjs` | all pass: worker runs, no long task in steady state, pause freezes the artwork, phone gets the still image, reduced motion gets no canvas |
| `scripts/reveal-check.mjs` | nothing left hidden after a scroll pass (6 page/viewport pairs) |
| `scripts/contact-route-test.ts` (email provider stubbed) | 25 checks pass |
| axe, WCAG A/AA | 0 violations, 21 pages |
| axe `target-size` (WCAG 2.2) | 0 violations, home and a platform page |
| `scripts/contrast-check.mjs` | 13,295 text nodes measured; 2 below AA, both text sitting over layers the checker cannot composite: the header logo when a white button scrolls beneath it (the header has a midnight-to-clear gradient behind it that the checker does not model), and the mobile call-bar label over translucent glass. The same two kinds were recorded before. 2,908 nodes over gradients or images are reported as unverifiable, not as passes |
| `scripts/visual-qa.mjs` | 0 layout issues, 0 console errors, 16 viewports × 20 pages (320 px to 2560 px). One 320 px overflow on /services was found and fixed during the run |
| SEO crawl | 91/91 pages: 200, one H1, canonical, valid JSON-LD; 0 issues |
| Internal links and images | 6,148 links, 0 broken, 0 redirecting, 0 orphans; 183 images, 0 failing, 0 missing alt |

The responsive matrix in the brief (360, 390, 768, 1024, 1440) is covered by the 16
viewports above, which include all five.

## Performance

Lighthouse 13, default mobile emulation (simulated slow 4G, 4× CPU) and the desktop
preset. Lab data only; there is no field data for this build.

| Page | Form factor | Performance | LCP | TBT | CLS | A11y / BP / SEO |
|---|---|---|---|---|---|---|
| Home | mobile (3 runs) | 85, 87, 88 | 3.63–3.72 s | 132–203 ms | 0 | 100 / 100 / 100 |
| Home | desktop (2 runs) | 99, 99 | 0.86–0.91 s | 13–16 ms | 0 | 100 / 100 / 100 |
| Shopify page | mobile / desktop | 88 / 100 | 3.22 s / 0.71 s | 246 / 56 ms | 0 | 100 / 100 / 100 |
| Odoo implementation page | mobile | 90 | 3.17 s | 211 ms | 0 | 100 / 100 / 100 |

**Mobile LCP in Lighthouse's simulation is above the 2.5 s target.** The LCP element is the
decorative hero artwork (the still ribbon image). To see how much of that is the model,
`scripts/lcp.mjs` measures LCP in a real browser with 4× CPU throttling and a 1.6 Mbps /
150 ms connection: the homepage paints its largest element at 1.83–1.86 s (first paint
1.1–1.3 s). Both are lab figures, and neither is a field measurement. INP cannot be
measured in the lab; total blocking time is the proxy, and it is low.

What changed the numbers, in order of effect:

1. The hero ribbon moved from the main thread to a Web Worker (OffscreenCanvas). On this
   branch before that change the homepage scored 57–59 on mobile with 3.8–4.4 s of total
   blocking time, and 68–72 on desktop with 0.9–1.6 s. The live 3.0 site uses the same
   main-thread canvas; it was not itself measured.
2. Phones get the still artwork with a slow CSS drift and no canvas.
3. Inner-page art on phones is a 16 KB image instead of 69 KB.
4. The scroll-reveal script no longer reads layout on load.

Tried and reverted: `content-visibility: auto` on the sections below the hero. It made no
measurable difference and broke in-page anchor positions.

## Not measured, or not possible here

- **Field data**: no Chrome UX Report or real-user data for this build.
- **Real phones and GPUs**: all lab runs are headless without a GPU.
- **Other browsers**: Chromium only. The worker path needs OffscreenCanvas; browsers without it fall back to the main-thread loop with a faster step-down. That fallback was written but not run in a browser that lacks OffscreenCanvas.
- **Email delivery to a real inbox**: not tested, by design. The route was tested with the provider stubbed. Whether the sending domain is verified with Resend is unknown.
- **Search Console**: no authorised access. The verification tag is wired to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; nothing is emitted until you set it. Remaining steps: add the property, set the variable to the token, redeploy, verify, submit `/sitemap.xml`.
- **Analytics**: events are defined and call `track()`, and the sanitiser strips personal data, but no analytics id is configured in the environment I could inspect, so nothing is being recorded. Button clicks are not qualified leads; only `consultation_form_submitted` is a completed enquiry.

## Things found that you should know about

- The acknowledgement email sent to people who submit the form had the literal body
  `[enquiry_received]`. It now has a real, truthful body. The optional "welcome guide"
  marketing email had `[welcome_guide]` and now links to two real guides; any template with no
  written content is refused rather than sent.
- Uploaded files were validated and then dropped, while the notification email said
  "Attached file". The file is now attached (limit lowered to 4 MB because a Vercel function
  rejects larger request bodies). This is untested on Vercel itself.
- With no email key, production used to report success and send nothing. It now returns an error.
- The Odoo CRM adapter is an in-memory mock unless `ODOO_URL`, `ODOO_DB`, `ODOO_USER` and
  `ODOO_API_KEY` are set; they are not set on Vercel, so leads reach you by email only.
- The unsubscribe list and the form's rate limiter are in memory per serverless instance, so
  they are not durable. Only the day-0 marketing email is ever sent; the later steps of the
  sequence have no scheduler.
- The team page printed unresolved headcounts ("Not confirmed", "plus staff not yet counted")
  and internal notes. They are removed from every public page; counts that were supplied remain.
- The `/services` page pinned the screen for about 640vh to scroll eight cards sideways.
  It is now a grid.

## Decisions for you

- **Deploy?** Nothing here is live. Say the word and the branch can be merged and deployed.
- **Role counts on the team page.** I kept the counts you supplied, labelled "N roles" (a role
  is not a person). If you would rather show no numbers until the roster is confirmed, it is a
  one-line change in `data/team.ts` (`countLabel` / `groupCountLabel` return '').
- **Navigation.** The brief's eight-part structure is carried by the menus (Expertise →
  Services / Solutions / Platforms / Industries; Studio → Company / Insights & tools) while
  keeping the five-item pill from the approved design. Say if you want a literal eight-item bar.
- **Two election systems.** The featured work shows KCCI Election System, WhatsApp Digital
  Connection and Scrabble Tournament Timer. Al Jadeed Election System is a near-duplicate of
  the KCCI one, so it is on the Evidence list and the work page, not a third card.
