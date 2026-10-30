# AI Search: delivery model and commercial check (INTERNAL, never published)

Prepared 30 October 2026. This file is not served by the website. It holds the company's commercial
target, which must never appear on a page, in the markup, in llms.txt or in any customer-facing copy
(`scripts/ai-search-check.ts` fails if it does).

**Internal commercial target:** five retained clients at USD 2,000 per month (USD 10,000 per month, USD 120,000
per year). This is a target. It is not revenue achieved, it is not a customer result, and it must not be
described to anyone as either.

## Read this first: every number below is an estimate to be replaced

The hours and the tool costs are my planning assumptions, not measurements. None comes from ODOOVATIONS
timesheets, a vendor price list or a quote. Replace the yellow assumptions with your own figures (a spreadsheet
copy is the natural next step) before you rely on the margins. The structure of the model is the useful part.

## Assumptions (edit these)

| Assumption | Value used | Why it matters |
|---|---|---|
| Hours to produce one content unit (research, write, review, edit, publish, check) | 8 | The biggest cost driver. A substantial new page is often more |
| Hours per technical change batch, per month | Foundation 8, Growth 14, Authority 22 | Defined capacity, so scope cannot creep |
| Monitoring hours per tracked question-run, manual | 0.04 (about 2.5 minutes) | Manual recording of an answer, its citations and its evidence |
| Runs per question per snapshot | 2 | One run proves little; repeats show the spread |
| Snapshots per month | Foundation 1, Growth 4 (weekly), Authority 2 | Growth promises weekly snapshots |
| Reporting and analysis hours per month | 4 / 6 / 8 | Writing the report, reading answers, accuracy notes |
| Call and account hours per month | 2 / 3 / 4 | Calls plus preparation and follow-up |
| Outreach hours per month | Foundation 0, Growth 8, Authority 14 | Editorial and directory outreach |
| Entity and profile consistency hours per month | Foundation 0, Growth 4, Authority 6 | Fact sheet, profiles, listings |
| Blended internal cost per hour | USD 20 | A placeholder; use your real loaded cost |
| Monitoring tool or API cost per valid run | USD 0.00 to 0.15 | Unverified. Manual recording has no tool cost; tools and search-enabled APIs vary by provider and change |

## Monthly hours per plan (using the assumptions above)

Monitoring hours = questions x experiences x runs x snapshots x 0.04.

| | Audit (one time) | Foundation | Growth | Authority |
|---|---|---|---|---|
| Price | USD 390 | USD 1,250 | USD 2,000 | USD 3,500 |
| Questions x experiences | 20 x 3 | 20 x 3 | 40 x 3 | 80 x 4 |
| Test runs per period | 120 (1 snapshot, 2 runs) | 120 | 960 | 1,280 |
| Monitoring hours | 4.8 | 4.8 | 38.4 | 51.2 |
| Content units x 8h | none | 16 | 32 | 48 |
| Technical | 5 (review) | 8 | 14 | 22 |
| Outreach | 0 | 0 | 8 | 14 |
| Entity consistency | 1 | 0 | 4 | 6 |
| Reporting and analysis | 4 | 4 | 6 | 8 |
| Calls and account | 1.5 | 2 | 3 | 4 |
| **Total hours** | **about 16** | **about 35** | **about 105** | **about 153** |
| Revenue per hour | about USD 24 | about USD 36 | about USD 19 | about USD 23 |

### What the model says

1. **Growth is the commercially weakest plan as specified, and it is the one the target depends on.** At about
   105 hours for USD 2,000 it earns about USD 19 per hour, below the USD 20 placeholder cost, almost entirely
   because "weekly measurement snapshots" across 40 questions x 3 experiences x repeated runs is about 38 hours of
   manual recording each month. Five Growth clients would need about 525 hours a month, which is more than three
   full-time people doing nothing else.
2. **Foundation is fine** (about USD 36 per hour) because it measures once a month and has no outreach.
3. **Authority** is thin for the same reason as Growth, and "up to two markets" doubles the question work unless the
   second market is small. A second language needs translation or native review, which the terms already say is
   scoped separately; keep that.
4. **The audit at USD 390 is close to break-even** (about USD 24 per hour on 16 hours). It is a sensible entry
   offer only if it converts into monthly plans, or if the baseline is cheap to produce because the tooling is
   semi-automated.

### Options to make it workable, for management to decide (none is applied)

- Cut the weekly manual snapshot to a **sampled** weekly check (for example the 10 most important questions, one
  run, one experience) and run the **full** question set monthly (about 11 monitoring hours instead of 38). This alone brings Growth to roughly
  78 hours, about USD 26 per hour. It changes what is promised, so the Growth wording would change with it.
- Automate recording with an authorised tool that has a bounded cost per run, and state in the report which
  experiences were recorded by hand and which by tool (API results are not the same as consumer results).
- Raise the Growth price, or reduce included content units from four to three.
- Credit the USD 390 audit against the first month of a monthly plan, which makes it a lower-risk first step and
  recovers its cost from plans.
- Stagger onboarding. Do not sell five Growth plans in the same month without the capacity to deliver them.

### Capacity

Define in each agreement the monthly capacity of technical work (hours), the content unit length, the outreach
activity scope and the question list. Anything outside is quoted before it starts. Do not offer "unlimited" anything.

## Data to keep for the first three clients

Actual hours per task per client, actual tool cost per month, the number of runs that failed and were repeated,
and the number of revision rounds per content unit. After 90 days, replace every assumption above with these.
