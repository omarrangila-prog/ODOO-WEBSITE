# Updating the team

Everything the site says about the team comes from one file: `data/team.ts`.
The Team page, the About page, the homepage and the service pages all read it,
so a number changed there changes everywhere and cannot disagree with itself.

## What the numbers mean

`count` is the number of **role positions** the owner reported. It is not a
verified count of unique employees: one person may hold two roles, and the
roster has not been confirmed. The site therefore never shows an overall
headcount. Department counts are labelled "reported roles", and the page says
they are not a verified headcount.

`count: null` means "not supplied". It shows as "Not confirmed", never as 0,
and it is excluded from every total. Two roles are null today: client
communication staff and freelance collaborators. Do not enter a guess.

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

**Publishing an overall headcount.** Set `verifiedUniqueEmployees` to the
confirmed number of unique people. It is `null` until then. Before setting it,
confirm that every position is a separate person, whether interns are
included, and which roles are employees rather than contractors or
freelancers. Once set, the Team page shows it as one metric.

**Adding a person.** Add an entry to `profiles` with their real name, role,
and a photograph under `public/team/`. It appears only when `approved` is
`true`. Do not add a profile without the person's permission, and never use a
generated or stock face. A profile attaches to a role and does not change any
count.

## What must never go in this file

`data/team.ts` is served to every visitor's browser. Do not put anything
private in it: no salaries, contracts, dates of birth, home addresses, phone
numbers, national ID numbers, performance notes or employment disputes. Keep
HR records in a separate private system. Gender is not stored as a field; the
two sentences that state it (sales executives, receptionists) are plain text
in role notes and can be removed by editing those notes.

## Claims the check refuses

`npm run team:check` fails if team copy introduces an unqualified claim of
Odoo partner status, Gold or certified partner status, or 24/7 service. It
also fails if a role with no supplied number is given one.
