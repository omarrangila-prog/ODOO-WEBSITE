# Updating the team

Everything the site says about the team comes from one file: `data/team.ts`.
The Team page, the About page, the homepage and the service pages all read it,
so a number changed there changes everywhere and cannot disagree with itself.

## What the numbers mean

`count` is the number of **role positions** the owner reported. It is not a
verified count of unique employees: one person may hold two roles, and the
roster has not been confirmed.

On 23 October 2026 the owner asked for the role counts and a total to be shown.
They are shown, and labelled for what they are:

- The headline figure is the sum of every reported `count`, from `teamTotals()`.
  Until `verifiedUniqueEmployees` is set it is worded **"team positions"** (83
  today, of which 12 are intern positions). Once the owner confirms unique people
  and sets that constant, the same figure is worded **"team members"** and takes
  the confirmed number. Nothing else changes.
- Department and group counts read "N positions". The Team page also lists every
  role with its count, department subtotals and the total, in one table.
- The home page strip shows the total, the number of role titles (25), the number
  of departments with every role counted (10) and the senior supervisor's
  reported experience.

`count: null` means "not supplied". It is never shown as 0 and never as a
"not confirmed" label: a role, department or group with an unsupplied number
simply shows no figure and is excluded from every total, and the Team page says
which titles were left out. Two roles are null today: client communication staff
and freelance collaborators. Do not enter a guess.

Editorial notes (what is unverified, what is not claimed) belong in this
document and in `audit/MISSING-ASSETS.md`, not in `note` or `caveat`: both of
those fields are printed on public pages.

## Common changes

**Someone joins or leaves a department.** Change that role's `count` in
`data/team.ts`, then change the matching row in `scripts/team-data-check.ts`
and run `npm run team:check`. The check is the written record of what was
reported; it fails if the data drifts without the record being updated.

**A new role.** Add an object to the department's `roles` array with a stable
`id` (never change an id once published), a `title` and a `count`.

**The number of sales or client-communication staff is confirmed.** Set the
`count` on the relevant role. If a person is counted in two departments, give
the role a `note` saying so and do not add them to both.

**Confirming unique people.** Set `verifiedUniqueEmployees` to the confirmed
number. It is `null` until then. Before setting it, confirm that every position
is a separate person, whether interns are included, and which roles are
employees rather than contractors or freelancers. Every page that shows the total
then says "team members" and uses that number. Update the expectations in
`scripts/team-data-check.ts` in the same change.

**Adding a person.** Add an entry to `profiles` with their real name, role,
and a photograph under `public/team/`. It appears only when `approved` is
`true`. Do not add a profile without the person's permission, and never use a
generated or stock face. A profile attaches to a role and does not change any
count.

## What must never go in this file

`data/team.ts` is served to every visitor's browser. Do not put anything
private in it: no salaries, contracts, dates of birth, home addresses, phone
numbers, national ID numbers, performance notes or employment disputes. Keep
HR records in a separate private system. Gender is not stored as a field. Two role notes used to state the gender of
sales executives and receptionists; they were removed on 23 October 2026 because
each describes a group of two and so identifies individuals, and no one had agreed
to it. They can be restored in role notes once each person has said so.

## Claims the check refuses

`npm run team:check` fails if team copy introduces an unqualified claim of
Odoo partner status, Gold or certified partner status, or 24/7 service. It
also fails if a role with no supplied number is given one.
