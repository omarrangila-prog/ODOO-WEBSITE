# ODOOVATIONS AI Search: handoff (30 October 2026)

Built and tested on a local production build. **Not committed and not deployed.** Nothing here claims publication,
indexing, rankings or new leads, because none has been observed. Internal files in this folder are not served by the site.

## What was built

| Area | Where |
|---|---|
| Pricing configuration (the only source of any price, limit or term) | `data/ai-search-pricing.ts` |
| Shared copy: comparison, workstreams, process, measurement definitions, delivery phases, FAQs, references | `data/ai-search.ts` |
| Service entries (hub, AEO, GEO, audit) used by the directory, sitemap, llms.txt and schema | `data/services.ts` (`bespoke: true`) |
| Pages | `app/services/{ai-search-optimization,answer-engine-optimization,generative-engine-optimization,ai-search-audit,ai-search-pricing}/page.tsx`; the location page is an entry in `data/locations.ts`; the three guides are in `data/resources-tech.ts` |
| Components | `components/ai-search/` (Layout, Pricing, PlanButton, EnquiryForm, SampleReport, AnswerPathDiagram) |
| Enquiry endpoint and validation | `app/api/ai-search/route.ts`, `lib/ai-search/request.ts`, `lib/ai-search/website.ts` |
| Structured data builders | `lib/ai-search/schema.ts` |
| Tests | `scripts/ai-search-check.ts`, `ai-search-route-test.ts`, `ai-search-form-check.mjs`, `ai-search-a11y-check.mjs` |

## Route map

| Route | The buyer question it answers |
|---|---|
| `/services/ai-search-optimization` | What is AEO and GEO as a service, who provides it, what do I get, how is it measured, what does it cost? (hub, with the enquiry) |
| `/services/answer-engine-optimization` | What is answer engine optimization and what does the work include? |
| `/services/generative-engine-optimization` | What is GEO, how are mentions and citations measured, what do crawler settings do? |
| `/services/ai-search-audit` | What does the USD 390 audit cover, how long does it take, what do you need from me? |
| `/services/ai-search-pricing` | Which package fits, what is in each, what are the limits and terms? |
| `/locations/aeo-geo-services-pakistan` | What is specific to working with a Karachi team on AEO and GEO? |
| `/resources/aeo-vs-geo-vs-seo` | What is the difference, and where do they overlap? |
| `/resources/how-to-measure-ai-search-visibility` | How do I measure it honestly, and what are the limits? |
| `/resources/ai-search-optimization-checklist` | What do I check, technically and in content? |

**Consolidated, with permanent (308) redirects** because the earlier URLs were live for about a day:
`/services/aeo-geo-ai-search-optimisation` goes to the hub; `/resources/what-are-aeo-and-geo` goes to `/resources/aeo-vs-geo-vs-seo`.
No other URL changed. The Odoo, ERP, software, automation and platform pages are untouched and still serve.

### Internal link map

- Hub links to: AEO, GEO, pricing (preview and full), audit (via pricing), the comparison guide, brand/fact sheet.
- AEO and GEO link to: hub, each other, the comparison guide, pricing/audit through the closing call to action; GEO also to the measurement guide.
- Audit links to: pricing, hub; pricing links to: audit, hub.
- Guides link to: the hub, the audit or pricing (related services), each other, and carry a call to action to the hub's enquiry.
- Location page links to: hub, pricing, audit, AEO, GEO (through its services and call to action).
- Navigation: Expertise menu lists AI Search and AI Search packages; the footer's What We Do column lists both; the services directory and the homepage service explorer list AI Search.
- `/llms.txt` and `/sitemap.xml` list every page above.

## Metadata and schema summary

| Route | Title (characters) | Description (characters) | JSON-LD types on the page |
|---|---|---|---|
| `/services/ai-search-optimization` | AEO & GEO Services \| AI Search Optimization \| ODOOVATIONS (57) | 150 | Organization, WebSite, WebPage, Service, BreadcrumbList, FAQPage |
| `/services/answer-engine-optimization` | Answer Engine Optimization (AEO) Services \| ODOOVATIONS (55) | 156 | Organization, WebSite, WebPage, Service, BreadcrumbList, FAQPage |
| `/services/generative-engine-optimization` | Generative Engine Optimization (GEO) Services \| ODOOVATIONS (59) | 145 | same |
| `/services/ai-search-audit` | AI Search Audit \| AEO & GEO Baseline \| ODOOVATIONS (50) | 126 | same |
| `/services/ai-search-pricing` | AI Search Pricing: AEO & GEO Packages \| ODOOVATIONS (51) | 153 | Organization, WebSite, CollectionPage, Service, BreadcrumbList, FAQPage |
| `/locations/aeo-geo-services-pakistan` | AEO & GEO Services in Pakistan \| AI Search \| ODOOVATIONS (56) | 144 | Organization, WebSite, Service, BreadcrumbList, FAQPage |
| `/resources/aeo-vs-geo-vs-seo` | AEO vs GEO vs SEO: The Differences and the Overlap \| ODOOVATIONS (64) | 148 | Organization, WebSite, Article, BreadcrumbList, FAQPage |
| `/resources/how-to-measure-ai-search-visibility` | How to Measure AI Search Visibility \| ODOOVATIONS (49) | 149 | Article, with the others above |
| `/resources/ai-search-optimization-checklist` | AI Search Optimization Checklist \| ODOOVATIONS (46) | 157 | Article, with the others above |

- One Organization node (`/#organization`, from the root layout) is the only company entity. Every Service names it as `provider` by `@id`; the hub's Service also carries the `OfferCatalog`. Service `@id`s are `<url>#service`. WebPage nodes carry honest `dateModified`.
- Offers exist for the audit (USD 390), Foundation (1,250), Growth (2,000), Authority (3,500) per month; Enterprise is an Offer with no price. They are built from the pricing configuration, and `scripts/ai-search-check.ts` asserts they equal the visible prices.
- Articles use the organisation as author, cite their sources with `citation`, and carry 30 October 2026 as published and modified date.
- Company description and the service directory now include AI Search factually.
- **No named author or Person markup.** No verified expert profile exists for Muhammad Ahmed Rangila on the site, so none is linked. Add one only with his agreement, real role and a profile page, and link it only to material he authored or reviewed.
- **Semantics versus rich results.** The markup is valid schema.org and matches visible content. Google makes no promise to use it, and FAQ rich results are limited to a small set of sites, so none is expected; the FAQ markup stays because the same questions are visible on the page.
- **Not claimed anywhere:** that llms.txt, an "AI schema" or any file is required (Google says none is needed). `llms.txt` is generated as an optional plain-text summary and the pages say so.

## The pricing configuration

All figures are USD, before taxes, launch offers proposed by management and not described as market averages.
Audit USD 390 one time; Foundation USD 1,250, Growth USD 2,000, Authority USD 3,500 per month; Enterprise custom.
Terms: 90-day start then monthly, 30 days' notice, taxes and approved third-party costs disclosed, monitoring in scope included,
translation, specialist input and publisher charges scoped separately, fixed PKR quotation on request, no live conversion.
Plan buttons start a conversation (`?plan=<id>#enquiry`); there is no checkout.

**Assumption to confirm:** the brief lists Authority's inclusions without brand consistency, outreach or weekly snapshots. The table
shows Authority as including brand consistency and outreach "within the authority work" and monthly reporting only (not weekly
snapshots), which keeps it a superset of Foundation and avoids promising more than written. Change `facts` in the config if you intend otherwise.

## The enquiry flow

Required: name, email, website, request type, consent. Optional: company, target country and language, competitors, plan, visibility problem.
Request types separate a free suitability review from the USD 390 audit and the plans; the form states sending is free and commits to nothing.
Validation is accessible (error summary with focus, labelled fields); the button is disabled while sending; every send has a one-time token so a
double click cannot send twice; honeypot and per-address rate limit; success appears only after the server accepted the enquiry (the notification
email was accepted by the provider); a failure shows the error, keeps what was typed and offers a working email link and WhatsApp.
The website address is validated but never fetched, so there is no server-side URL request to abuse; the comment in `lib/ai-search/website.ts`
records what a future scanner would need (resolve and refuse private, loopback and link-local addresses, refuse redirects to them, cap size, time and rate).
There is no instant scanner and no score is ever invented; every review is manual.
Analytics events: `ai_plan_selected`, `ai_review_requested`, `ai_audit_requested`, `ai_contact_click`, `form_started` (props limited to plan id and request type; the PII guard drops anything else).

## Measurement and the sample report

Definitions are in `data/ai-search.ts` and on the guide: brand mention, valid domain citation, mention rate (answers naming the brand / valid recorded answers),
citation rate (answers citing the domain / valid recorded answers), referral traffic, qualified enquiries, each reported separately; every run records the exact question,
platform, model where shown, date, locale, mode, cited URLs and the saved answer; failed runs are kept apart; variability, sample size and API-versus-product limits are stated.
The sample report is a layout labelled "Demonstration report — sample data"; real client projects appear separately as "Selected software and integration work" and are not presented as AI search results; it contains no AI answer about ODOOVATIONS and no result. Its one number is a flagged arithmetic example.
`visibility-log-template.csv` is the record format for real runs.

## Validation results (local preview)

Run 30 October 2026 against a production build served locally (port 3720, email provider stubbed). Lab results, not field data.

- Type-check, lint, route test, enquiry-form test (honeypot, duplicate submit, validation, success only after acceptance), AI-search content check, GEO check: pass.
- SEO crawl of 116 pages and internal-link audit: pass. axe on 35 pages: no violations. Contrast paint-stack check: pass.
- Visual QA, 16 viewports across about 36 pages: one finding, a 24 px phone link on location pages (fixed, `min-h-[44px]` on mobile); no horizontal overflow. The 20 console messages were Next.js prefetch requests cancelled when the test script navigated away (1536 and 1920 widths only); they are test-harness artefacts, not page errors.
- Lighthouse (simulated throttling, local): accessibility, best practices and SEO 100 on the hub, pricing and audit pages. Desktop performance 99-100. Mobile performance 71 (hub), 85 (pricing), 78 (audit), LCP 3.4-3.9 s; an existing service page scored 87 in the same run. Mobile performance on the hub and audit is below the existing pages and is not yet optimised. Field data does not exist until the pages are live.
- Not verified: real email delivery, indexing, rich-result eligibility in Google's tools, any ranking or AI-answer inclusion.

## What still depends on someone outside the codebase

1. **Your decision to commit and deploy.** Until then none of this is live, and the two redirects do not exist on the live domain.
2. **Commercial review of the packages** using `delivery-model.md`. As specified, Growth earns about USD 19 per delivery hour on the model's estimates, mostly from weekly manual snapshots. The numbers there are estimates, not your timesheets.
3. **A real author and permission.** Named authorship for the guides (and a Person profile) needs Muhammad Ahmed Rangila's agreement and a real profile.
4. **Proof.** No client result, review, or published follow-up of our own baseline exists yet. Add only observed, dated results.
5. **A billing workflow** if online payment is ever wanted. None exists, so there is no checkout.
6. **Email delivery to a real inbox** has not been tested; the endpoint was exercised with the mail provider stubbed. Confirm that your sending domain is verified with the provider.
7. **Keyword volumes** are unverified; no tool or Search Console data was available (`keywords.md`).
8. **Third-party profiles and indexing**: Google Business Profile, LinkedIn, directory profiles, reviews, press (`audit/LISTING-KIT.md`), and the time Google and Bing need to crawl.
9. **Search provider documentation changes.** The crawler table and the Google statements were read on 30 October 2026; recheck before relying on them.
