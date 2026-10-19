# Adding a case study

No real case study is published yet. The system below is ready for when the
owner supplies material, and it refuses to publish anything incomplete.

## How it works

`data/projects.ts` lists which projects exist and what may be said about them.
`data/case-study-model.ts` adds the case-study layer on top. Every real
project (client, anonymised, internal product, prototype) automatically has a
record with the status **Awaiting assets**. Demonstrations and concepts never
get one.

A record reaches the public site only when `isPublishable()` passes. Setting
`status: 'published'` is necessary but not sufficient: if any check fails the
page is not built, is not in the sitemap, and the portfolio card does not link
to it.

Statuses: Draft, Awaiting assets, Under review, Approved, Published, Archived.
Nothing is published on upload.

## What to supply

1. Project name and the industry
2. A description of the business problem
3. What was delivered and the main modules or features
4. Real screenshots (desktop, mobile, dashboard) and a video if one exists
5. Results, but only if they are documented
6. Written permission to show the client's name and branding

## Steps

1. Put the files in `public/case-studies/<project-id>/`. The project id is the
   `id` in `data/projects.ts`, for example `kcci-software`.
2. Remove anything private from every screenshot **before** saving it (see
   below), and keep each image under 1.5 MB.
3. In `data/case-study-model.ts`, add an entry to `caseStudyContent` under that
   id. Set `status: 'under-review'`. Fill in only what you actually have.
4. Run `npm run case-study:check`. It lists exactly what is still missing for
   each project: unconfirmed privacy checks, missing alt text, unapproved or
   unredacted images, outcomes with no evidence, files that do not exist.
5. When the checker says **READY** for that project, change the status to
   `published` and rebuild. The page appears at `/projects/<id>`, joins the
   sitemap and the portfolio card links to it.

If a record is marked `published` while blockers remain, `case-study:check`
exits with an error so the mistake is caught before a build.

## Privacy: before any screenshot is saved

Remove or blur: passwords and access tokens, personal customer data, sensitive
financial records, private phone numbers, confidential project information,
patient or member records. Confirm the client approves publication, and that
the screenshots are of the real delivered system and not a mock-up. All seven
boxes in `privacy` must be `true`; each is a separate check because each is a
separate way to get this wrong.

## Evidence rules

- An outcome needs an `evidence` field saying where the figure comes from, and
  ideally `measuredOver`. An outcome without evidence blocks publication.
- A testimonial needs `approved: true`.
- Technology and integrations are listed only if verified.
- Nothing here is generated. A field you leave out is simply not shown, and
  the page never draws an empty frame or a placeholder sentence.

## Existing records

The six real projects are KCCI Election System, Al Jadeed Election System, KCCI
Software, Scrabble Tournament Timer, WhatsApp Digital Connection and WhatsApp
Karobar OS. All are Awaiting assets. Until one is published, its card keeps
saying "Detailed case study available on request", which is accurate.
