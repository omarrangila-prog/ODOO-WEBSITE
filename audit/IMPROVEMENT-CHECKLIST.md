# ODOOVATIONS: improvement checklist

Branch `v4-conversion-home`. Written at the start of the work and updated as items
closed. Status is only "done" where something was run to prove it; anything not
measured says so.

## What was inspected first

- Framework: Next.js 14 App Router, React 18, Tailwind 3.4, TypeScript strict.
  Animation: framer-motion (now off the homepage entirely) plus CSS.
- Routes before this work: 91 sitemap URLs minus what was added here (84 before).
- Enquiry pipeline: `/api/contact` → notification email via Resend → Odoo CRM
  lead pipeline. `RESEND_API_KEY` is set for the Production environment on Vercel.
  No scheduling system exists (`NEXT_PUBLIC_SCHEDULING_URL` is unset).
- Homepage before: 20,086 px tall at 1363×936 (21.5 screens); 22,840 px at 390 wide.

## Problems re-checked against the live code

| Brief item | Still true? | Action |
|---|---|---|
| Homepage ~20,000 px | Yes (20,086 px) | Rebuilt as eight sections: about 9,770 px with footer |
| "Build, Automate, Grow" ~3,000 px; services ~2,274 px | Yes (2,996 / 2,215) | Section removed; services is now a tabbed explorer |
| Several sections repeat the same message | Yes | Transformation, Build/Automate/Grow and Why ODOOVATIONS removed |
| Primary action understated | Yes (hero had only text links) | Solid white "Discuss Your Project" button plus "Explore Our Work" |
| Featured projects used one abstract artwork | Yes | Text-led cards; no artwork stands in for a screenshot |
| Team role counts unresolved, generic descriptions | Partly | See "Team page" below |
| Homepage "Odoo ERP" link went to the general services hub | Yes (`/services`) | Now `/services/odoo-implementation-pakistan` |
| "Schedule a call" linked to WhatsApp | Yes | Now "Ask for a call on WhatsApp"; becomes "Book a discovery call" only if a scheduling URL is set |
| Form showed many service options at once | Yes (14 chips) | One optional dropdown |
| `/#journey` link on service pages pointed at a homepage section that no longer exists | Yes | Points to `/company/methodology` |
| File upload promised but file was dropped | Found while inspecting | Attached to the notification email; limit lowered to 4 MB (Vercel body limit) |
| Missing email key would report success while sending nothing | Found | Now an error in production; `ODV_DRY_RUN=1` for local runs |
| Pinned 640vh horizontal rail on `/services` | Found | Replaced by a grid |

## Priority order and status

1. Inspect, record routes: done (91 URLs preserved; none removed, none redirected).
2. Fix broken behaviour and wrong links: done (table above).
3. Shared design system: motion, spacing and radius tokens added; compact band and
   section-heading classes; documented in `docs/DESIGN-SYSTEM.md`.
4. Homepage to eight sections: done. 9.3 screens of content on desktop (20,086 px to 9,772 px with footer).
5. Navigation and enquiry paths: done. Menus restructured; five-item pill kept
   because it is the approved design.
6. Featured work / case studies: three text-led cards; gate unchanged; assets
   needed are in `audit/MISSING-ASSETS.md`.
7. Service pages upgraded: all 16 now carry a hook, audience, connections, price
   and timeline factors and labelled evidence.
8. Platform pages: Shopify, WooCommerce, WordPress, QuickBooks, plus a hub.
9. Product catalogue: model, gate, routes and check script built. One private
   record. No public product exists, so no product page is published.
10. Technical SEO: sitemap, breadcrumbs, JSON-LD on every new page, hreflang
    plumbing (inactive with one language).
11. Performance and accessibility: done, with limits. Desktop 99; mobile 85–88 in Lighthouse with LCP 3.6–3.7 s (lab, simulated), 1.85 s in a throttled real browser. Details in `audit/V4-RESULTS.md`.
12. Functional and responsive checks: done. All pass; results in `audit/V4-RESULTS.md`.
13. Preview and change summary: local production build. Not deployed.

## Deliberately not done

- No new city/service pages, no fake offices, no keyword-variant pages.
- No individual technology pages: the hub is enough until there is distinct evidence.
- No second language published (no reviewed content). The architecture is ready.
- No testimonials, ratings, logos, counters or awards.
- No deployment. Production needs an explicit instruction.
