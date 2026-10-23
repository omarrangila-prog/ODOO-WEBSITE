import Link from 'next/link';
import { SectionLabel } from './SectionLabel';

/**
 * Homepage section 5: how a project runs, in one strip.
 *
 * A condensed form of /company/methodology. Each stage says what the client
 * receives, because a process only matters if it produces something you can
 * inspect. Only commitments the business can keep are made: a written scope,
 * review milestones, testing before delivery, training, and a support
 * arrangement agreed in advance. No response time, round-the-clock cover or
 * delivery date is promised. The people behind it are counted in section 2.
 */
const stages = [
  { n: '01', title: 'Understand', body: 'We map how the work really runs, with the people who do it.', gets: 'A written scope of what is and is not included.' },
  { n: '02', title: 'Design', body: 'Workflows, screens and integrations are reviewed before anything is built.', gets: 'A design you approve, assumptions written down.' },
  { n: '03', title: 'Build & validate', body: 'Built in stages. Testers check it runs; reviewers check it fits the work.', gets: 'Working software at each milestone.' },
  { n: '04', title: 'Launch & support', body: 'Data migration where needed, training, a planned go-live and a handover.', gets: 'A support arrangement agreed in advance.' },
];

export function DeliveryPeople() {
  return (
    <section aria-labelledby="delivery-h" className="band band-alt band-tight">
      <div className="band-inner">
        <SectionLabel index="05">How a project runs</SectionLabel>
        <h2 id="delivery-h" className="band-title mt-4 max-w-[40ch]">
          Four stages, each with something you can inspect.
        </h2>

        <ol className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-line pt-6 lg:grid-cols-4 lg:gap-x-8">
          {stages.map((s) => (
            <li key={s.n}>
              <p aria-hidden className="flex items-center gap-3 text-[12px] tracking-[0.18em] text-violet/80">
                {s.n}
                <span className="h-px flex-1 bg-line-strong" />
              </p>
              <h3 className="mt-2.5 font-heading text-[19px] font-semibold tracking-[-0.025em] text-white sm:text-[20px]">{s.title}</h3>
              <p className="mt-1.5 hidden text-[15px] leading-relaxed text-text-dark-muted sm:block">{s.body}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-text-dark sm:text-[15px]">
                <span className="text-violet-bright">You receive: </span>
                {s.gets}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1 text-[15px]">
          <Link href="/company/methodology" className="link-editorial">
            Read the Odoo implementation method <span aria-hidden className="arrow">↗</span>
          </Link>
          <Link href="/company/team" className="link-editorial">
            Meet the team <span aria-hidden className="arrow">↗</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
