# ODOOVATIONS website

The marketing site for **ODOOVATIONS**, a Karachi technology company (software, ERP, AI
automation, websites and apps, marketing, creative). Production: https://odoovations.com.

Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind 3.4. Animation is CSS
plus a Web Worker for the hero ribbon; `framer-motion` is used on a few inner pages only.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npx next start -p 3710
npm run typecheck && npm run lint
```

To exercise the enquiry form against a production build without sending email, start the
server with `ODV_DRY_RUN=1`.

## Where things live

```
app/                    Routes. page.tsx is the six-section homepage.
  platforms/            Hub and per-platform pages (Shopify, WooCommerce, WordPress, QuickBooks)
  services/ solutions/ industries/ locations/ resources/ company/ case-studies/ projects/
  technologies/         What we build with, each entry stating how that is known
  tools/                Optional tools (operations check)
  products/             Product catalogue. 404 until a product passes its gate
  api/contact/          Enquiry endpoint
components/
  cinema/               Hero, ribbon scene (+ worker), scroll reveal, page art
  home/                 Homepage sections, service explorer, featured work, micro-illustrations
  work/                 Project page, work grid, scenario screen, and demos/ (working demonstrations)
  forms/ layout/ ui/ team/ work/ solutions/ leadintel/
data/                   All content. One source of truth per subject:
  company · divisions · services · service-extras · solutions · industries · platforms ·
  technologies · service-explorer · enquiry-paths · projects · case-study-model · case-study-content ·
  team · clients · products · faq · navigation · ctas · formOptions
lib/                    seo · i18n · analytics · validation · leadintel/ · cinema/ribbon
scripts/                Audits, QA and data checks (see below)
docs/                   DESIGN-SYSTEM · TEAM-DATA · CASE-STUDIES · PRODUCTS · LANGUAGES
audit/                  Checklists, results, missing-assets list (private)
```

## Content rules

The site never publishes an unverified claim. Gates in code enforce it:

- **Projects** (`data/projects.ts`): every project carries a status; only client-approved,
  correctly classified projects render. Demonstrations are never shown as client work.
- **Case studies** (`data/case-study-model.ts`, words in `data/case-study-content.ts`): a record is
  public only when `isPublishable()` passes. Real screenshots need approval, alt text and the
  full privacy checklist; a labelled working demonstration can stand in for them, and an
  outcome without evidence never publishes. `npm run case-study:check`.
- **Products** (`data/products.ts`): same idea. `npm run products:check`. See `docs/PRODUCTS.md`.
- **Team** (`data/team.ts`): the total is shown as "team positions" until `verifiedUniqueEmployees`
  is set, then as "team members"; roles with no supplied number show no figure and stay out of
  the total. `npm run team:check`. See `docs/TEAM-DATA.md`.
- **Technology** (`data/technologies.ts`): every entry needs a stated basis. `npm run tech:check`.
- Platform names (Shopify, WooCommerce, WordPress, QuickBooks) are plain text and carry a
  no-partnership notice. QuickBooks is integration work, never bookkeeping or tax.

What is still missing from the owner is in `audit/MISSING-ASSETS.md`.

## Enquiry pipeline

The form opens with "What is this about?" (`data/enquiry-paths.ts`): Shopify, WooCommerce,
QuickBooks integration, Odoo and ERP, custom software, AI and automation, website or app,
something else. A path files the enquiry under its service and asks two or three optional
questions; the email subject and body arrive labelled with the path. Links open a path with
`/contact?path=<id>#form` (or `?service=` for older links).

`components/forms/ContactForm.tsx` posts to `app/api/contact/route.ts`: zod validation on
both sides, a honeypot, a per-IP rate limit, an optional attachment (4 MB, attached to the
notification email, not stored), then the notification email and the lead pipeline
(`lib/leadintel`). Without `RESEND_API_KEY` a production build returns an error rather than a
false success; set `ODV_DRY_RUN=1` locally to validate without sending. The Odoo CRM adapter
runs as an in-memory mock unless `ODOO_URL`, `ODOO_DB`, `ODOO_USER` and `ODOO_API_KEY` are set.
`npx tsx scripts/contact-route-test.ts` tests the route with the email provider stubbed.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (falls back to https://odoovations.com) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, international format, no `+` |
| `NEXT_PUBLIC_SCHEDULING_URL` | If set, "arrange a call on WhatsApp" becomes "book a discovery call" |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Emits the Search Console verification tag |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` / `NEXT_PUBLIC_GA_ID` | Analytics (off unless set, and consent-gated) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Email delivery (server only) |
| `ODV_DRY_RUN=1` | Local only: validate the form without sending |

## Checks

Run against a server (`ODV_DRY_RUN=1 npx next start -p 3710`):

```bash
node scripts/home-qa.mjs http://localhost:3710        # homepage behaviour, demonstrations, form paths, nav
node scripts/ribbon-check.mjs http://localhost:3710   # hero ribbon off the main thread, pause control
node scripts/demo-layout.mjs http://localhost:3710    # the three demonstrations at 360 to 1440px
node scripts/one-system-check.mjs http://localhost:3710 # the one-system diagram: geometry, arrival, pause, reduced motion
node scripts/visual-qa.mjs http://localhost:3710      # layout at 16 viewports x 20 pages
node scripts/a11y.mjs http://localhost:3710           # axe, WCAG A/AA
node scripts/contrast-check.mjs http://localhost:3710 # text contrast axe cannot resolve
node scripts/seo-audit.mjs http://localhost:3710      # titles, H1, canonical, JSON-LD
node scripts/link-image-audit.mjs http://localhost:3710
node scripts/reveal-check.mjs http://localhost:3710   # scroll reveal leaves nothing hidden
node scripts/lcp.mjs http://localhost:3710/ 4 3       # real-browser LCP under throttling
```

Lighthouse: `npx lighthouse <url> --only-categories=performance --chrome-flags="--headless=new --no-sandbox"`
(add `--preset=desktop` for desktop). Mobile scores swing by 10-15 points between identical
runs on a loaded machine, so quote ranges, not one number.

## Design system

`docs/DESIGN-SYSTEM.md`: tokens, headings, bands, the hero ribbon, micro-illustrations,
motion rules. After changing `lib/cinema/ribbon.ts` run `npm run art:render`.

## Deployment

Vercel project `odoovations`. Production is deployed only on an explicit instruction:
`git push` to `main`, then `npx vercel --prod --yes`, then verify against the live domain.
