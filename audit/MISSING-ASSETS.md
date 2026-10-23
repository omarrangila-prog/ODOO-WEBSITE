# Missing assets and facts (private)

Things the site cannot say or show until the owner supplies them. Nothing below
has been invented or stood in for. This file is internal; it is not published.

Last updated 23 October 2026 (homepage cut to six sections, project pages, team totals).

## Blocks completion of a feature

| Needed | Why it matters | Where it goes |
|---|---|---|
| **Outcomes with evidence for each of the three project pages** (KCCI Election System, WhatsApp Digital Connection, Scrabble Tournament Timer). One or two real, checkable results per project: what was measured, over what period, and where the figure comes from | The pages describe scope and carry a labelled demonstration, and say "measured results" are not published yet. That line is the honest state, and it stays until a result with a source exists | `outcomes` in `data/case-study-content.ts` |
| **Approved, redacted screenshots or a screen recording** of each of the three delivered systems, with credentials, member or customer data, phone numbers and financial figures removed | The pages currently use a working demonstration built here with invented data. A real screen is stronger proof and would sit beside it. Each image needs alt text, and the full privacy checklist then applies to that project | `public/case-studies/<project-id>/`, `screenshots` in `data/case-study-content.ts`, then `npm run case-study:check` |
| What each client's situation was before the system, if they are willing to say | The pages state no "problem" for any client because none has been supplied. Writing one would be inventing a story | `problem` in `data/case-study-content.ts` |
| Client approval for any named testimonial, with the person's name, role and written permission | No testimonial is shown or invented | `testimonial` in `data/case-study-content.ts` and `data/testimonials.ts` |
| Scope description for the KCCI software (separate from the election system) | The record says only "scope details available on request", so it has no project page | `data/projects.ts` `kcci-software` |
| Scope and approval for Al Jadeed Election System | It has a card but no project page; the election demonstration would apply to it as well | `data/case-study-content.ts` |
| Permission, and official high-resolution files, for any client logos | Clients are named in text only | `data/clients.ts` |

## Needed to confirm what is already published

| To confirm | Detail |
|---|---|
| QuickBooks scope | The page describes integration work in general terms and defers specifics to scoping. Confirm which QuickBooks products (Online, Desktop), regions and document types you will take on, and whether a client project exists. Then tighten `data/platforms.ts` (quickbooks) |
| Shopify / WooCommerce / WordPress project evidence | No client case study exists for any of them. Pages say so. Supply a project (with approval) and the "What we can show today" line can change |
| Technology list | `data/technologies.ts` lists only what is verifiable. Please confirm mobile frameworks, other backend languages and cloud providers the team really uses, and they can be added with a basis |
| Team and founder names, photos, short bios | `data/team.ts` `profiles` is empty on purpose. A person appears only with a real name, a real photo and their agreement |
| Whether the 83 reported positions are 83 different people | They are shown as "team positions" (including 12 intern positions). Confirm that every position is a separate person, whether interns are meant to be counted, and which roles are employees rather than contractors; then set `verifiedUniqueEmployees` and every page says "team members" instead |
| Senior supervisor's agreement to the "50+ years" statement | `approvedForPublication: true` was set on the owner's report. Confirm the person agreed |
| Staff gender statements | Removed from the public team copy on 23 October 2026 (sales executives, receptionists, and the client-communication description): each described a group small enough to identify people. Restore only with each person's agreement |
| Client-communication and freelance headcounts | Both are `null`, so neither is counted in the total and the Team page says so |
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
