import Link from 'next/link';
import { SectionLabel } from './SectionLabel';

/**
 * Homepage section 7: how work is delivered and who does it.
 *
 * The four stages are a condensed form of /company/methodology. Each states
 * what the client receives, because a process only matters if it produces
 * something you can inspect. Only commitments the business can keep are made:
 * a written scope, review milestones, testing before delivery, training, and a
 * support arrangement agreed in advance. Nothing here promises a response time,
 * round-the-clock cover or a delivery date.
 *
 * People are described by department and never by headcount: the team page
 * holds the reported roles with their caveats, and no total is published until
 * the owner has confirmed unique employees (data/team.ts).
 */
const stages = [
  {
    n: '01',
    title: 'Understand',
    body: 'Discovery with the people who do the work, not only management. We map how the process really runs.',
    gets: 'A written scope that says what is and is not included.',
  },
  {
    n: '02',
    title: 'Design',
    body: 'Workflows, screens and integrations are laid out and reviewed before anything is built.',
    gets: 'A design you approve, with the assumptions written down.',
  },
  {
    n: '03',
    title: 'Build & validate',
    body: 'Built in stages with review milestones. Testers check that it runs; business-logic reviewers check that it matches how the work is done.',
    gets: 'Working software at each milestone, not slides.',
  },
  {
    n: '04',
    title: 'Launch & support',
    body: 'Data migration where needed, training on your real workflows, a planned go-live and a handover.',
    gets: 'A trained team and a support arrangement agreed in advance.',
  },
];

const specialisms = [
  'Software engineering',
  'Odoo engineering',
  'AI & automation',
  'Creative & motion production',
  'Testing & business-logic review',
  'Server operations',
  'Sales & client relations',
];

export function DeliveryPeople() {
  return (
    <section aria-labelledby="delivery-h" className="band band-alt">
      <div className="band-inner">
        <SectionLabel index="07">Delivery &amp; people</SectionLabel>
        <h2 id="delivery-h" className="band-title mt-4 max-w-[24ch]">
          Four stages, and the people behind them.
        </h2>

        <ol className="mt-10 grid gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s) => (
            <li key={s.n}>
              <p className="flex items-center gap-3 text-[12px] tracking-[0.18em] text-violet/80">
                <span aria-hidden>{s.n}</span>
                <span aria-hidden className="h-px flex-1 bg-line-strong" />
              </p>
              <h3 className="mt-3 font-heading text-[22px] font-semibold tracking-[-0.025em] text-white">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-dark-muted">{s.body}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-dark">
                <span className="text-violet-bright">You receive: </span>
                {s.gets}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 rounded-[24px] border border-line bg-white/[0.02] p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div>
            <h3 className="font-heading text-[22px] font-semibold tracking-[-0.025em] text-white">One company, several specialisms.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">
              Engineering, Odoo, AI, creative production and quality review sit in the same company, so a project is planned
              as a whole instead of handed between vendors.
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
              <Link href="/company/team" className="link-editorial">
                Meet the team <span aria-hidden className="arrow">↗</span>
              </Link>
              <Link href="/company/methodology" className="link-editorial">
                Read the Odoo implementation method <span aria-hidden className="arrow">↗</span>
              </Link>
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2">
            {specialisms.map((s) => (
              <li key={s} className="rounded-full border border-line px-4 py-2 text-[14px] text-text-dark">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
