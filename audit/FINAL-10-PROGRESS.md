# FINAL 10/10 optimisation — progress

Tracks the final optimisation brief. This is an improvement pass, not a
redesign: the brand, fonts, colours, animations, workflow playground, service
range and published projects are all unchanged.

Every number below was measured against a production build (`npm run build`
then `next start`) on a deliberately unoccupied port. A port collision once
made an audit crawl an unrelated site and report 86 false failures, so the
port is checked with `ss -tln` before each run.

## Done

### §8 Global CTA strategy

Each capability now has its own primary call to action, and the enquiry form
arrives with that service already selected.

`data/ctas.ts` is the single source for CTA copy, hrefs and the service each
one preselects, so a label cannot drift from the service it selects. Every
service value is a member of `serviceOptions`; `ContactForm` validates the
incoming value against that list rather than trusting it, because an
unrecognised string from a URL would look selected to the visitor and then
fail the form's own zod check on submit.

| Division | Primary CTA |
|---|---|
| Odoo & ERP (9 services) | Request an Odoo Roadmap |
| AI & Automation | Find What We Can Automate |
| WhatsApp Automation | Automate My WhatsApp |
| Custom Software | Show Us Your Workflow |
| Web, App & Digital Experience | Start a Web Project |
| Marketing | Plan My Campaign |
| Creative | Start a Creative Project |
| Creator & Social | Plan My Content |

Resolution is most-specific-first: a per-slug override, else the service's
division, else a neutral CTA. WhatsApp automation sits inside the
ai-automation division but has its own form option, so it overrides per slug
rather than prefilling the broader "AI / Automation".

Two defects surfaced while fixing this and are also fixed:

- The nine Odoo services carry no `ctaLabel` and had no `division`, so they
  resolved to the generic label while newer pages got specific wording.
  `division: 'odoo-erp'` fixes the CTA and groups their internal links — each
  Odoo page now links its eight siblings. Note `custom-odoo-development` is an
  Odoo service whose slug does not begin `odoo-`, so slug-prefix inference
  would have missed it; the `division` field is the only authority.
- Five divisions hold a single service, leaving an empty sibling list. The old
  fallback drew from services with no division, which is now nobody, so those
  pages rendered "More in X:" with no links after it. They now fall back to
  other services under the label "Explore other services".

Verified: 16/16 service pages resolve the intended label and href; 7/7
service values preselect; an invalid `?service=` value is ignored; bare
`/contact` has nothing preselected.

### Honesty fixes found during the CTA audit

- The hero dashboard's "Illustrative demo" badge was 10px against 17px of
  fabricated PKR figures and easy to miss. It now reads "⚠ Sample data — not
  client results" at a size that competes with what it qualifies.
- The homepage walkthrough section was labelled "Selected Work". It
  demonstrates how connected ERP works and is not client work, so it is now
  "Illustrative walkthroughs" / "Explore how connected ERP systems work."
- A new `RealWork` section shows the six management-confirmed projects with
  their status, placed before the demo section, so genuine work is seen first.
- `/contact` no longer titles itself "Start Your Odoo Roadmap", which
  misdescribed a page serving every capability.

### Suite status after §8

| Check | Result |
|---|---|
| SEO (83 sitemap URLs) | 83/83 200, one H1, canonical, valid JSON-LD; 0 issues |
| Internal links / images | 0 broken, 0 redirecting, 0 orphans, 0 missing alt |
| axe WCAG A/AA | 0 violations, 13 pages × 2 themes |
| Visual QA | 0 layout issues, 0 console errors, 15 viewports × 12 pages |
| Text-extraction fusion | 623, below the documented 625 baseline |
| typecheck / lint | clean |

## Not done

Sections 5, 7, 10, 11, 14, 18 and 19 were open when this document was first
written. All but section 5 are now complete — see
[FINAL-SCORECARD.md](FINAL-SCORECARD.md) for the measurements.

- **§5 Project detail pages** — still blocked on screenshots. Published
  projects say "Detailed case study available on request", which is accurate.

### Owner-blocked

Cannot be completed without information or assets only the owner has, and
none of it will be invented:

- Testimonials with real client names and permission to publish.
- Team and founder details.
- Project screenshots.
- What KCCS stands for.

### Carried performance item

Mobile LCP is 2.8-3.8s, inherited from framer-motion (~120KB) across the
remaining client-rendered sections on the homepage and portfolio. This is the
weakest measured area on the site and the next lever worth pulling. Each
section needs individual visual review, so it is not a bulk change.

## Deployment

Not deployed. The brief withholds production authorisation, and none has been
given for this pass.
