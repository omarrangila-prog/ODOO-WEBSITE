# ODOOVATIONS — SEO Strategy & Implementation Record

Odoo implementation, custom development, automation, integration & support
**Office 604, Landmark Plaza, Karachi, Pakistan · 0334 7037531**

This document records what was implemented in the codebase and the strategy/checklists
that must be executed **outside the code** (Search Console, Analytics, Google Business
Profile, reviews, backlinks). Nothing here fabricates rankings, reviews, metrics, or
partner status. Where real data is required (current positions, backlinks, competitor
authority) the placeholders are marked `TBD — collect baseline`.

> **Compliance note:** ODOOVATIONS is described only as an *Odoo implementation and
> development company / Odoo ERP specialists*. No "Official Odoo Partner" or "Certified
> Partner" claim or badge is used anywhere. Do not add one without written verification.

---

## 1. What was implemented in code (this pass)

| Area | Change | File(s) |
|---|---|---|
| NAP consistency | Address corrected to **Karachi, Office 604 Landmark Plaza**; single source of truth | `data/company.ts` |
| Org schema | Added `telephone`, full `PostalAddress` (street/locality/region/country), `logo`, `slogan`, `@id` | `lib/seo.ts` |
| LocalBusiness schema | `ProfessionalService` with telephone, full address, `areaServed` (Karachi + Pakistan), `priceRange`, image | `lib/seo.ts` |
| Canonical host | `SITE_URL` fallback fixed to `https://www.odoovations.com` (override via `NEXT_PUBLIC_SITE_URL`) | `lib/seo.ts` |
| Local SEO pages | New **Karachi** page (LocalBusiness schema) + **Pakistan** page (Service schema), unique content, FAQ schema, breadcrumbs | `data/locations.ts`, `app/locations/[slug]/page.tsx` |
| Sitemap | Location routes added (priority 0.85); already covers services/industries/case-studies dynamically | `app/sitemap.ts` |
| Internal links | Footer "Company" column links both location pages (no orphans); location pages cross-link + link to services/industries | `data/navigation.ts`, `components/layout/Footer.tsx` |
| Footer / Contact NAP | Both now render the full one-line Karachi address identically | `components/layout/Footer.tsx`, `app/contact/page.tsx` |

Already present from earlier work (verified, kept): Next.js **Metadata API** + per-page
`generateMetadata`, self-referencing **canonicals**, **Open Graph/Twitter** tags,
`robots.ts`, `sitemap.ts`, **JSON-LD** (Organization, WebSite, LocalBusiness on layout;
Service/Breadcrumb/FAQ/WebPage on inner pages), single **H1 per page**, server-rendered
HTML (content in initial response), reduced-motion, accessible nav/forms.

---

## 2. Technical SEO audit (current state)

Severity: 🔴 Critical · 🟠 High · 🟡 Medium · 🔵 Low · ⚪ Info

| # | Issue | Severity | Status | Fix / Validation |
|---|---|---|---|---|
| 1 | Address was Lahore, not the real Karachi office | 🔴 | ✅ Fixed | `data/company.ts` → validate NAP matches GBP exactly |
| 2 | No `telephone`/street in schema | 🟠 | ✅ Fixed | Rich Results Test on `/` and `/locations/odoo-services-karachi` |
| 3 | No dedicated Karachi / Pakistan pages | 🟠 | ✅ Fixed | Both live, unique content, in sitemap |
| 4 | `SITE_URL` fallback pointed at old brand domain | 🟠 | ✅ Fixed | Set `NEXT_PUBLIC_SITE_URL` in prod env |
| 5 | Google Search Console not verified | 🔴 | ⛔ TODO (off-code) | See §8 — requires domain access |
| 6 | GA4 / Bing Webmaster not configured | 🟠 | ⛔ TODO (off-code) | Set `NEXT_PUBLIC_GA_ID`; see §9 |
| 7 | Google Business Profile not verified/optimised | 🔴 | ⛔ TODO (off-code) | See §7 — requires business owner |
| 8 | OG image alt still references old positioning | 🔵 | ✅ Updated | `lib/seo.ts` `OG_IMAGE.alt` |
| 9 | Testimonials are placeholders (`verified:false`) | 🟡 | ⏳ By design | Section hides publicly until real ones added; no fake reviews |
| 10 | Founder photo/LinkedIn not set | 🔵 | ⏳ By design | Typographic panel shown, no empty box |
| 11 | Core Web Vitals — field data | 🟡 | ⛔ TODO (off-code) | Measure via PSI/CrUX after deploy; hero image is largest LCP element — served as WebP with width/height |
| 12 | `sharp` not installed (prod image optimisation) | 🔵 | ⏳ Recommended | `npm i sharp` before production deploy |

**Do not begin mass content production until #5–#7 are done** — indexing + local
visibility depend on them and they are outside the codebase.

---

## 3. Information architecture (current + planned)

```
/                                   Homepage (brand + overview + all clusters)
/services                           Hub
  /services/odoo-implementation-pakistan   ✅ live
  /services/custom-odoo-development         ✅ live
  /services/odoo-integration                ✅ live
  /services/odoo-consulting                 ✅ live
  /services/odoo-support-maintenance        ✅ live
  /services/odoo-training                   ✅ live
  /services/odoo-migration                  ✅ live
  /services/odoo-ai-dashboards              ✅ live
  /services/odoo-business-automation        ✅ live
/industries                         Hub (8 industry pages ✅ live)
/locations
  /locations/odoo-services-karachi          ✅ live (LocalBusiness)
  /locations/odoo-services-pakistan         ✅ live (Service)
/case-studies                       Hub + 2 detail pages ✅ live (metrics only if verified)
/resources                          ✅ live — hub + 8 evergreen decision-support guides
  odoo-implementation-cost-pakistan ✅, odoo-community-vs-enterprise ✅,
  standard-odoo-vs-custom-development ✅, odoo-data-migration-checklist ✅,
  how-to-choose-an-odoo-implementation-company ✅, odoo-implementation-timeline ✅,
  odoo-readiness-assessment ✅, common-odoo-implementation-mistakes ✅
/company/about ✅   /company/methodology ✅
/contact, /privacy, /terms          ✅ live
```

No fake branch-city pages (no Lahore/Islamabad/Dubai/London). One genuine Karachi page,
one Pakistan page — as mandated.

---

## 4. Keyword-to-page map (one intent per page)

| Page | Intent | Primary keyword | Secondary | CTA |
|---|---|---|---|---|
| `/` | Brand + overview | ODOOVATIONS; Odoo implementation Pakistan | Odoo ERP company, Odoo development Pakistan | Get a Free Consultation |
| `/locations/odoo-services-karachi` | Local commercial | **Odoo services Karachi** | Odoo developer/consultant/company Karachi | Book a Karachi Odoo Consultation |
| `/locations/odoo-services-pakistan` | National commercial | **Odoo implementation Pakistan** | Odoo development company Pakistan, Odoo ERP Pakistan | Request an Implementation Roadmap |
| `/services/odoo-implementation-pakistan` | Commercial investigation | Odoo implementation Pakistan | Odoo ERP implementation, Odoo consultant Pakistan | Request an Odoo Roadmap |
| `/services/custom-odoo-development` | Commercial | Custom Odoo development | custom Odoo modules, Odoo module developers | Discuss a Custom Module |
| `/services/odoo-integration` | Commercial | Odoo integration services | Odoo API/Shopify/WhatsApp integration | Discuss an Integration |
| `/services/odoo-consulting` | Commercial | Odoo consulting | functional/technical Odoo consultant | Book a Consultation |
| `/services/odoo-support-maintenance` | Commercial | Odoo support and maintenance | Odoo support Pakistan | Request a Support Plan |
| `/services/odoo-training` | Commercial | Odoo training services | Odoo user training | Book Training |
| `/industries/textile-apparel` | Industry commercial | Odoo for textile industry | Odoo textile ERP Pakistan | Book a Consultation |
| `/industries/manufacturing` | Industry commercial | Odoo for manufacturing | ERP for manufacturing Pakistan | Book a Consultation |
| `/industries/distribution` | Industry commercial | Odoo for distribution companies | Odoo inventory for distributors | Book a Consultation |
| *(other industry pages)* | Industry commercial | Odoo for <industry> | — | Book a Consultation |
| `/resources/odoo-implementation-cost-pakistan` *(planned)* | Informational → commercial | Odoo implementation cost Pakistan | Odoo pricing Pakistan | Request a Quote |
| `/resources/community-vs-enterprise` *(planned)* | Informational | Odoo Community vs Enterprise | — | Book a Consultation |

**Cannibalisation guard:** the Karachi *location* page owns "Odoo services **Karachi**";
the implementation *service* page owns "Odoo implementation **Pakistan**"; the Pakistan
*location* page targets the broader "Odoo implementation Pakistan" national query with
local-delivery framing. Monitor GSC — if the service and location pages trade places for
the same query, consolidate and 301.

---

## 5. Title & meta system (representative)

| Page | Title | Description (truncated) |
|---|---|---|
| `/` | Odoo Implementation & Custom Development in Pakistan \| ODOOVATIONS | Odoo implementation, custom modules, integrations, automation & support… |
| `/locations/odoo-services-karachi` | Odoo Developer & Consultant in Karachi \| ODOOVATIONS | Karachi-based Odoo implementation & development team… |
| `/locations/odoo-services-pakistan` | Odoo Implementation Company in Pakistan \| ODOOVATIONS | Odoo implementation, custom dev, integration, migration & support across Pakistan… |
| `/services/custom-odoo-development` | *(from service data)* \| ODOOVATIONS | *(unique per page)* |

All titles unique, ≤ ~60 chars where possible, brand-suffixed, no ALL-CAPS, no year, no
location stuffing. Descriptions truthful, intent-matched, no keyword lists.

---

## 6. Structured data plan

| Page type | Schema | Notes |
|---|---|---|
| Layout (all pages) | Organization, WebSite, LocalBusiness | Now include telephone + full Karachi address |
| Homepage | + WebPage | — |
| Service pages | Service, WebPage, BreadcrumbList, FAQPage | FAQ only for visible Q&A |
| Industry pages | WebPage, BreadcrumbList, FAQPage | — |
| Karachi location | **LocalBusiness** (ProfessionalService), BreadcrumbList, FAQPage | Real office = eligible |
| Pakistan location | Service, BreadcrumbList, FAQPage | National service, not a second physical location |
| Case studies | WebPage, BreadcrumbList | **No Review/AggregateRating** unless real, visible reviews exist |

Validate every template with Google **Rich Results Test** + Schema.org validator after
deploy. Never emit Review/FAQ/Rating schema for content not visible on the page.

---

## 7. Google Business Profile checklist (off-code — business owner)

- [ ] Claim & **verify** the ODOOVATIONS profile (Office 604, Landmark Plaza, Karachi)
- [ ] Primary category: **Software company** (or "Business management consultant" — pick the closest accurate one)
- [ ] Secondary categories: Software company, Consultant, Computer consultant (only accurate ones)
- [ ] NAP **exactly** matches the site: `ODOOVATIONS · Office 604, Landmark Plaza, Karachi, Pakistan · 0334 7037531`
- [ ] Add services (Implementation, Custom Development, Integration, Support, Training, Consulting)
- [ ] Business hours + appointment link (`/contact`) + website + phone
- [ ] Real office, team, logo, cover photos (no stock)
- [ ] Publish genuine updates; answer real Q&A; respond to every real review
- [ ] Track calls / website clicks / direction requests monthly

**Reviews:** ask real clients to describe their industry, original problem, what was
implemented, communication, and what improved. Never script identical text; never buy
reviews. Do not add review schema to the site until real reviews are visible on-page.

---

## 8. Search Console operating process (off-code)

1. Verify **domain property** (DNS TXT) · 2. Submit `https://www.odoovations.com/sitemap.xml`
· 3. URL-Inspect the homepage, every service, every industry, both location pages · 4.
Confirm rendered content + selected canonical · 5. Watch Indexing + Enhancements +
Core Web Vitals reports · 6. Weekly: queries, landing pages, country/device ·
7. Improve high-impression / low-CTR titles · 8. Push positions 4–20 · 9. Consolidate
cannibalisation · 10. Document every change.

---

## 9. Analytics & conversion tracking

Code already ships a privacy-respecting dispatcher (`lib/analytics.ts`, `components/seo/Analytics.tsx`)
firing only when an ID is set. **To activate:** set `NEXT_PUBLIC_GA_ID` (GA4) and/or
`NEXT_PUBLIC_ANALYTICS_DOMAIN` (Plausible) in prod env.

Tracked conversion events (already wired): `hero_cta_click`, `whatsapp_click`,
`roadmap_request`, `friction_calculator_completed`, `module_selected`,
`industry_selected`, `consultation_form_submitted`, `workflow_file_uploaded`,
`scheduling_link_clicked`. Also register phone-click, email-click as GA4 conversions.
Optimise for **qualified enquiries**, not raw traffic.

---

## 10. Ranking forecast methodology (evidence-based, no guarantees)

Forecasts require a baseline that is not yet collected. Fill before quoting timelines:

| Signal | Value |
|---|---|
| Domain age / history | TBD |
| Indexed pages | TBD (after GSC) |
| Referring domains / backlink quality | TBD |
| GBP reviews & strength | TBD |
| Karachi local-pack competition | TBD |
| Competitor authority & content | TBD |

Probability bands (use instead of position promises):

| Cluster | Realistic early target | Probability band* |
|---|---|---|
| Brand ("ODOOVATIONS", "ODOOVATIONS Karachi") | Top 1–3 | **Strong** once indexed + GBP verified |
| Karachi service ("Odoo developer Karachi") | Top 3–10 | **Moderate** with GBP + reviews + Karachi page |
| Pakistan service ("Odoo implementation Pakistan") | Top 5–15 | **Moderate**, needs authority + proof |
| Industry ("Odoo for textile industry") | Top 5–15 | **Moderate**, long-tail friendly |
| International non-geo ("remote Odoo implementation company") | Page 1–2 | **Low–Moderate**, competitive |
| Generic "Odoo" | — | **Not a practical target** — the official Odoo product + ecosystem dominate this intent; do not chase it |

*Bands are directional, contingent on completing §7–§8 and building genuine authority.
Phrase externally as: *"strong/moderate/low probability of top-three if the required
actions are completed"* — never "guaranteed position one."

---

## 11. 90-day execution plan (condensed)

**Days 1–15 (eligibility):** deploy code changes ✅ · set prod env (`NEXT_PUBLIC_SITE_URL`,
GA) · verify GSC + Bing · submit sitemap · verify & optimise GBP · confirm NAP everywhere ✅
· install `sharp`.

**Days 16–30 (local + long-tail):** validate all schema in Rich Results Test · add real
office photos to Karachi page & GBP · collect first genuine reviews · publish first
Resource guide (`odoo-implementation-cost-pakistan`) · internal-link audit.

**Days 31–60 (proof + authority):** publish Community-vs-Enterprise + data-migration
checklist · add first **verified** testimonial (unlocks testimonial section) · first
video demo page (VideoObject) · start legitimate partner/citation outreach (Clutch,
LinkedIn, relevant PK tech directories — accurate NAP only).

**Days 61–90 (compete):** planned service pages (migration, AI dashboards, automation) ·
improve positions 4–20 from GSC · resolve any cannibalisation · first ranking-probability
report from real baseline · first organic lead-quality report.

---

## 12. Launch QA checklist

- [ ] `NEXT_PUBLIC_SITE_URL=https://www.odoovations.com` set in prod
- [ ] `npm i sharp` for image optimisation
- [ ] One preferred host (www vs non-www) + HTTPS-only redirect at hosting layer
- [ ] Every important URL → 200; unknown → real 404 (verified: `/nonexistent` returns 404)
- [ ] Unique title + description + single H1 per page (verified in build)
- [ ] Canonicals self-referencing; sitemap only canonical URLs
- [ ] Schema validates (Rich Results Test) with correct name/phone/address
- [ ] No fake reviews / stats / partner badge / placeholder public text
- [ ] Forms, phone `tel:`, WhatsApp links work
- [ ] GSC verified + sitemap submitted; GA4 events firing
- [ ] GBP verified with identical NAP

---

*Maintained alongside the ODOOVATIONS codebase. Update the "Status" columns as off-code
tasks are completed.*
