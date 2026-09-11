# Project Verification Matrix

Generated 2026-09-11. Source of truth: `data/projects.ts` and `data/global-projects.ts`.

**Nothing in the NEEDS VERIFICATION section is published.** Each row needs a
person with the facts to fill in the columns, then update the data file.
Until then the public site shows only the six labelled demonstration
scenarios.

## Projects

| Project | Evidence found in repo? | Screenshots? | Client approval? | Country public? | Status | What is needed |
|---|---|---|---|---|---|---|
| KCCIA Election System | No | No | No | No | NEEDS_VERIFICATION | Exact organisation name; written permission to name; scope of what ODOOVATIONS built; launch date; technology; screenshots; whether a public case study is allowed |
| Al Jadeed Election System | No | No | No | No | NEEDS_VERIFICATION | Same as above |
| KCCS Software | No | No | No | No | NEEDS_VERIFICATION | What KCCS stands for; what was built; client; permission |
| Scrabble Tournament Timer | No | No | No | No | NEEDS_VERIFICATION | Confirmed feature list; client or internal; screenshots; permission |
| WhatsApp Karobar OS | No | No | No | No | NEEDS_VERIFICATION | Exact official name; client project / internal product / prototype / concept; actual capabilities |
| WhatsApp Digital Connection | No | No | No | No | NEEDS_VERIFICATION | Confirm delivered build; which document types; which client |
| Six demonstration scenarios | Yes (data) | No | n/a | n/a | DEMO | Published, labelled "Demonstration" on every card |

## Countries

| Country | Verified? | Evidence | Rendered? |
|---|---|---|---|
| Pakistan (Karachi) | Yes | Registered office | Yes |
| United States | No | — | No |
| Canada (Toronto) | No | — | No |
| United Arab Emirates (Dubai) | No | — | No |
| Turkey | No | — | No |
| Morocco | No | — | No |
| South Africa | No | — | No |

Not published: any country count, any "192 countries" claim, any flag wall.
The global delivery section reads "Remote delivery worldwide" until at least
one non-Pakistan country is verified.

## How to promote a row

1. Collect the evidence listed in "What is needed".
2. Update the entry in `data/projects.ts`: set `status`, fill `evidence`,
   add `summary`, and add `clientName` only with `approved: true`.
3. If a case study is allowed, add it to `data/caseStudies.ts` with
   `isDemonstration: false` and only `verified: true` metrics.
4. For countries, set `verified: true` in `data/global-projects.ts` with
   `publicEvidence` pointing at the case study or approval.
