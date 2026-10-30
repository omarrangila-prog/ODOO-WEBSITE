# Catalogue build: progress and how to continue

Persisted so a context reset loses nothing. Source: "ODOOVATIONS — Claude Agency Growth Master Prompt, Revision 3" (30 October 2026), supplied in full in chat on 30 October 2026, including the END OF DOCUMENT marker. Its data is transcribed into the files below; the prose rules are summarised at the end. The live checklist is `audit/catalogue/COVERAGE.md` (regenerate with `npx tsx scripts/catalogue-coverage.ts`).

## Where things are

| What | File |
|---|---|
| All 198 briefs (186 foundational from Appendix C, 12 extensions from Appendix I), 23 families with their demo briefs (Appendix H), 8 divisions | `data/catalogue/manifest.ts` |
| All 59 pricing blueprints (Appendix B) | `data/catalogue/blueprints.ts` |
| Route reconciliation: 20 briefs merged into existing pages, with reasons; 5 kept separate, with reasons | `data/catalogue/routes.ts` |
| Written page content, one file per family | `data/catalogue/content/*.ts` (index in `content/index.ts`) |
| Leaf page template | `components/catalogue/LeafPage.tsx`, served by `app/services/[slug]/page.tsx` |
| Offer resolution (blueprint + override + tier names) | `lib/catalogue/leaf.ts`, `lib/catalogue/resolve.ts` |
| Validation | `lib/catalogue/validate.ts`, run by `npm run catalogue:check` |
| Pricing directory | `app/pricing/page.tsx` |
| Package carried to the enquiry | `?interest=` → `lib/interest.ts` → contact form → email and CRM description |
| Sales kit | `audit/sales/SALES-KIT.md` |

Manifest totals check against the brief exactly: 198 briefs, 170 catalogue IDs, 23 families (per-family counts match), 59 blueprints, 49 overrides.

## Rule for adding a page

A page exists only when its content is written. To add one: write a `LeafContent` entry in the family's content file (definition, problem, who for, wrong first purchase, prerequisites, deliverables, client duties, process, completion, a sample table labelled as sample data, measures, at least three FAQs, related IDs, tier names), then `npm run catalogue:check`, rebuild, and regenerate COVERAGE.md. Prices come from the blueprint and the brief's override; never type a price into content.

## Status (30 October 2026, end of build session)

- **All 198 briefs have a live page.** 178 new pages with written content (158 services under `/services/`, 10 industries under `/industries/`; content in `data/catalogue/content/*.ts`), and 20 briefs merged into established pages.
- **Packages:** shown for all 198: on each new page, and on the 17 merged pages through `components/catalogue/MergedPackages.tsx` (tier names in `content/merged.ts`). S001–S003 use the AI Search packages.
- **Hubs:** 22 family hubs (served by `/services/[slug]` and `/solutions/industry-systems`; F01's hub is the existing AI Search page) and 8 division hubs at `/expertise/*`, linked from `/services`.
- **Pricing directory:** `/pricing` lists every service with its three options, with search and billing filters (rows are server-rendered; the filter only hides).
- **Demonstration pages:** `/demonstrations` and 23 family pages show each module's sample deliverable with invented data. **The interactive demonstrations in Appendix H are not built**; the pages say so.
- Checks at end of session: 349 pages crawled with 0 SEO issues, 0 broken links, 0 orphans; axe (WCAG 2.2 AA tags) clean on every template at 375 and 1280 px; contrast 0 below AA; catalogue, AI Search and enquiry route tests pass. Lighthouse mobile (local lab): a service leaf 87, `/pricing` 72.

## Added in the follow-up session (30 October 2026)

- **PKR beside every USD price**, from one dated rate in `data/currency.ts` (1 USD = PKR 276.6, ExchangeRate-API, 30 Oct 2026). Indicative only; a fixed PKR quote is given in writing. Update the rate there and every page follows.
- **Interactive demonstrations**: all 23 family pages run a working demo in the browser on invented data (`components/demos/engines.tsx`, `configs.tsx`). Tested by `scripts/demo-check.mjs`.
- **Homepage**: new section 03, "Start from your goal", with the eight buyer goals, an example, the starting package and price (USD and PKR), and the ways to buy.
- **Resources**: 10 new guides (`data/resources-catalogue.ts`); R01 and R02 redirect (308) to the existing AI search guides.
- **Programmes**: `/programmes`, eight combined programmes priced line by line from the published packages (`data/catalogue/programmes.ts`).
- **Odoo CRM**: `scripts/odoo-crm-setup.ts` creates the 8 custom fields and 6 stages (dry run by default, `--apply` to write). The Odoo client was rewritten (`lib/leadintel/odoo-rpc.ts`): it now authenticates for the user id, and updating an existing lead passes `[ids, values]` correctly (the old code sent the values as keyword arguments, which Odoo rejects). Tested against a stub by `scripts/odoo-rpc-test.ts`; **not run against a real Odoo**, because no credentials are configured.

## Still open

1. Run `npx tsx scripts/odoo-crm-setup.ts --apply` once Odoo credentials are set in Vercel and locally.
2. Delivery-cost modelling for each live offer before relying on the proposed prices.
3. Mobile performance on `/pricing` (long page).
4. Refresh the PKR rate when it moves materially.

## Decisions taken

- Prices published on catalogue pages are the brief's proposed launch offers, labelled "launch prices in US dollars, before taxes" with a written scope confirming the final price. The live AI Search config (`data/ai-search-pricing.ts`) stays the source for the AI Search pages; the validator checks the two agree.
- The AI search audit's 750 and 1,250 tiers are not published yet (only 390 is live).
- Code-like checks: only underscore blueprint codes are treated as leak markers.

## Rules from the brief (summary)

No #1 or "best" claims, no guaranteed rankings, citations, installs, coverage or ROI, no "zero hallucinations", no borrowed awards or partner status, no fake reviews or offices. Discovery fees never imply a full system. Third-party costs are always separate. Sample data is always labelled. Real client projects describe only confirmed scope. Unknown search volumes stay unknown. Lab performance is never presented as field data. The internal five-clients-at-USD-2,000 model stays internal (`audit/ai-search/delivery-model.md`).
