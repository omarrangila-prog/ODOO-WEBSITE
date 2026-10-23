# Missing assets and facts (private)

Things the site cannot say or show until the owner supplies them. Nothing below
has been invented or stood in for. This file is internal; it is not published.

Last updated for the v4 homepage work.

## Blocks completion of a feature

| Needed | Why it matters | Where it goes |
|---|---|---|
| Approved screenshots or a screen recording of each featured project (KCCI Election System, WhatsApp Digital Connection, Scrabble Tournament Timer), with credentials, personal data and financial figures removed | The featured-work cards are text-led because no screenshot exists. A screenshot is the strongest proof the section could carry | `public/case-studies/<project-id>/`, entry in `data/case-study-model.ts`, then `npm run case-study:check` |
| Client approval to publish each case study, and the privacy checklist ticked | The case-study gate refuses anything unapproved | `data/case-study-model.ts` |
| Scope description for the KCCI software (separate from the election system) | The record says only "scope details available on request" | `data/projects.ts` `kcci-software` |
| Named, approved testimonials (name, role, organisation, written permission) | The Evidence section has no testimonial column. None is shown or invented | `data/testimonials.ts`, `verified: true` |
| Permission, and official high-resolution files, for any client logos | Clients are named in text only | `data/clients.ts` |

## Needed to confirm what is already published

| To confirm | Detail |
|---|---|
| QuickBooks scope | The page describes integration work in general terms and defers specifics to scoping. Confirm which QuickBooks products (Online, Desktop), regions and document types you will take on, and whether a client project exists. Then tighten `data/platforms.ts` (quickbooks) |
| Shopify / WooCommerce / WordPress project evidence | No client case study exists for any of them. Pages say so. Supply a project (with approval) and the "What we can show today" line can change |
| Technology list | `data/technologies.ts` lists only what is verifiable. Please confirm mobile frameworks, other backend languages and cloud providers the team really uses, and they can be added with a basis |
| Team and founder names, photos, short bios | `data/team.ts` `profiles` is empty on purpose. A person appears only with a real name, a real photo and their agreement |
| Unique employee count | No headcount is published. `verifiedUniqueEmployees` stays `null` until confirmed |
| Senior supervisor's agreement to the "50+ years" statement | `approvedForPublication: true` was set on the owner's report. Confirm the person agreed |
| Staff gender statements in team copy | Confirm each person is comfortable with them being published |
| Client-communication and freelance headcounts | Both are `null` |
| Scheduling tool | There is no booking system. "Arrange a call" opens WhatsApp and is labelled that way. If you adopt a booking tool, set `NEXT_PUBLIC_SCHEDULING_URL` and the label becomes "Book a discovery call" automatically |
| Social profile URLs | `company.social` is empty, so no social links render |

## Product catalogue

`data/products.ts` holds one record, WhatsApp Karobar OS, as in development and
private. Add a product only when it exists, with evidence, a deployment model, a
pricing approach, support terms and a demo or approved screenshot. See
`docs/PRODUCTS.md`.

## Languages

No reviewed Urdu (or any other) content exists, so only English is published.
See `docs/LANGUAGES.md`.
