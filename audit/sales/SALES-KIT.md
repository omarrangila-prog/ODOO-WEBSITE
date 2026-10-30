# ODOOVATIONS sales kit (internal)

Internal working material for handling enquiries from the website. Not published. Everything in square brackets is a setting the team decides; nothing here is a promise made to a buyer until it appears in a signed scope.

## 1. Where leads live

The website already writes every accepted enquiry to **Odoo CRM** (`crm.lead`) through `lib/leadintel/crm.ts`, and emails the inbox through Resend.

- **Live mode** needs `ODOO_URL`, `ODOO_DB`, `ODOO_USER` and `ODOO_API_KEY` in Vercel. Without them the CRM step runs in mock mode and **no CRM record is created**; only the email arrives.
- The custom fields the adapter writes must exist in Odoo first: `x_lead_score`, `x_lead_band`, `x_sales_queue`, `x_utm_source`, `x_utm_campaign`, `x_marketing_consent`, `x_contact_permission`, `x_anon_id`.
- Every enquiry carries a reference such as `ODV-20261030-7K3QF`. It is in the email subject and at the top of the CRM description, so the inbox, the CRM and the buyer's reply can be matched.
- The page the enquiry was sent from (`Sent from: /services/...`) and, when the visitor has an anonymous session, the first and last touch are in the CRM description.
- The existing lead score and band are internal routing hints derived from the form answers. They are not a qualification decision and must not be reported as one.

## 2. Pipeline stages

Configure these stages in Odoo CRM (Settings → Stages). A stage moves only on a real event or a person's decision; a form submission is only **New**.

| Stage | Enters when | Leaves when | Required before moving on |
|---|---|---|---|
| New | The website or a person creates the lead | Someone reviews it | Owner assigned |
| Discovery needed | The need is plausible but unclear | A discovery call is booked or the lead is lost | Next action and follow-up date |
| Qualified | The checklist in section 3 passes | A call is confirmed | Reason for qualifying written in the lead |
| Call scheduled | The buyer confirms a time | The call happens | Calendar invite sent |
| Proposal sent | A written scope and price are sent | The buyer accepts, declines or goes silent | Proposal attached, expected value and type (project or recurring) |
| Won | A signed scope or paid first invoice | — | Contract or invoice reference |
| Lost | The buyer declines, is unsuitable, or does not reply after the follow-up sequence | — | Lost reason |

Editable rules (set by the team, not published):

- First human review target: [__ business hours] during Pakistan business hours.
- Default owner by area: [AI search → __], [Odoo/ERP → __], [software → __], [other → __].
- Follow-up sequence after a proposal: [day 3, day 7, day 14], then Lost (reason: no response).

Do not put a response-time promise on the website unless the team can staff it every week.

## 3. Qualification checklist

Mark each one in the lead and write the reason. No score.

1. **Need**: a specific problem in the buyer's words, not "we need a website".
2. **Fit**: a service we list and can deliver with people we have now. If delivery depends on a partner or a hire, say so.
3. **Budget**: the buyer has a range, and it overlaps the relevant package or a realistic quote.
4. **Timing**: a reason the work matters in the next [__] months.
5. **Decision**: who decides and who pays; whether anyone else must approve.
6. **Capacity**: we can start within the timing without breaking current commitments.

Qualified = 1, 2 and 6 pass and at least two of 3–5 are known. Otherwise Discovery needed or Lost, with the reason.

## 4. Discovery call guide (30 minutes)

1. **Context (5 min)**: what the business does, who the customers are, what prompted the enquiry now.
2. **Current state (10 min)**: the process or system today, the tools, who uses them, what goes wrong, what it costs them.
3. **Outcome (5 min)**: what "done" looks like, how they will judge it, by when.
4. **Constraints (5 min)**: budget range, decision process, data, access, compliance, existing contracts.
5. **Next step (5 min)**: what we will send, by when, and what we need from them.

Do not quote a fixed price on the call for anything outside a published package. Say what drives the price and when the written scope will arrive.

## 5. Proposal template

1. **Your situation**, in their words.
2. **What we will deliver**: deliverables with quantities and limits.
3. **What is not included**, and third-party costs (licences, ad spend, hosting, API/model usage, messaging, travel) shown separately.
4. **What we need from you**: access, data, people, approvals.
5. **Acceptance**: how each deliverable is checked and accepted.
6. **Timeline**: phases with planning ranges from complete inputs.
7. **Fees**: project fee, recurring fee and third-party costs on separate lines; currency; whether taxes are included; payment schedule.
8. **Ownership**: who owns code, content, accounts and data at handover.
9. **Support after delivery**: window, hours, what is covered.
10. **Change process**: section 6.
11. **Next step**: what signing starts, and the first date.

No outcome guarantees (rankings, AI citations, revenue). Measures are reported, not promised.

## 6. Change request template

- Reference: [proposal or contract ref], change no. [__]
- Requested by / date:
- What changes, in one paragraph:
- Effect on deliverables:
- Effect on timeline:
- Effect on fees (project / recurring / third-party):
- Approved by (buyer) / date:

Work on a change starts only after approval.

## 7. Objection responses

- **"It's cheaper elsewhere."** Ask what is included in the other quote, unit by unit. Compare scope, not totals. If theirs is a better fit, say so.
- **"Can you guarantee results?"** No. We commit to the work, its quality and its timing, and we report the measures honestly. Anyone guaranteeing AI citations or first-page rankings cannot control them.
- **"We need it next week."** Say what can be done well in that time and what cannot. Do not accept a date the team cannot meet.
- **"Are you an official Odoo partner?"** No. We are an independent implementation and development team and do not claim partner status.
- **"Can we see results for a client like us?"** Show the projects that are published, describe exactly what we did, and do not stretch them into results they did not measure. Offer the relevant original demonstration.

## 8. Follow-up drafts

Drafts only. Send from a person's mailbox, one at a time, to people who asked to be contacted. Not for bulk sending.

**After an enquiry, before a call**
> Hi [name], thanks for your enquiry about [service] (ref [ref]). To give you a useful answer, could we have a 30-minute call? [two times]. If it is easier, reply with [the one question that unblocks scoping].

**After a call**
> Hi [name], thanks for the time today. As discussed, you need [outcome] and the main constraint is [constraint]. I will send a written scope by [date]. Before then I need [input].

**Proposal follow-up**
> Hi [name], checking whether you had a chance to review the proposal for [service] (ref [ref]). Happy to go through any part of it, or adjust scope if the budget needs it.

**Closing the loop**
> Hi [name], I have not heard back, so I will close this for now. If [service] becomes a priority again, reply to this email and we will pick it up from where we left off.

## 9. What to measure

Kept in the CRM, reported monthly, with the period and denominator stated:

- Valid enquiries (excluding spam and duplicates), by sending page and service.
- Share reviewed within the team's target window.
- Qualified / valid enquiries.
- Calls confirmed (not requested).
- Proposals sent; proposals accepted / proposals sent.
- Won value, split into project fees and recurring fees; paid versus invoiced.
- For delivered work: delivery hours, direct cost and contribution margin.

If a number does not exist yet, leave it blank. The illustrative five clients at USD 2,000/month (USD 10,000 monthly revenue) is arithmetic for planning, not a forecast; the delivery model is in `audit/ai-search/delivery-model.md`.
