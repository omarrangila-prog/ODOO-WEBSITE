import Link from 'next/link';
import { publishableProjects, statusLabel } from '@/data/projects';
import { featuredClients, clientSource } from '@/data/clients';
import { SectionLabel } from './SectionLabel';

/**
 * Homepage section 2: why trust us.
 *
 * Only evidence that exists is shown, and each kind is labelled for what it is:
 *  - projects management has confirmed, with the status on record;
 *  - organisations the wider Kausar Innovations group has worked with, named
 *    in text (no logos: none are held with permission) and kept visibly apart
 *    from ODOOVATIONS' own projects;
 *  - plain statements about how we describe ourselves, each of which is a
 *    policy of this site rather than a claim about results.
 *
 * There are no counters, ratings, awards or testimonials, because none have
 * been verified. When a named, approved testimonial exists it belongs in the
 * third column.
 */
export function ProofSection() {
  const projects = publishableProjects().filter((p) => p.status === 'CLIENT_PROJECT');

  return (
    <section aria-labelledby="proof-h" className="band">
      <div className="band-inner">
        <SectionLabel index="02">Evidence</SectionLabel>
        <h2 id="proof-h" className="band-title mt-4 max-w-[22ch]">
          Evidence, stated plainly.
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr_1fr] lg:gap-12">
          <div>
            <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-white">Projects management has confirmed</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {projects.map((p) => (
                <li key={p.id} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-[16px] text-text-dark">{p.name}</span>
                  <span className="shrink-0 text-[13px] text-violet-bright">{statusLabel[p.status]}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] leading-relaxed text-text-dark-muted">
              Detailed case studies with screenshots are published when the client has approved them.{' '}
              <Link href="/case-studies">See all work, including labelled demonstrations</Link>.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-white">Clients of the wider group</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-text-dark">
              {featuredClients.slice(0, 8).join(' · ')}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-text-dark-muted">
              Organisations that {clientSource.parentCompany}, the group ODOOVATIONS belongs to, has worked with. Not every
              engagement was delivered under the ODOOVATIONS name.{' '}
              <Link href="/company/clients">Read the full roster and how it is verified</Link>.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-white">How we describe ourselves</h3>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-text-dark">
              <li>An independent Odoo implementation team. We do not claim official partner status.</li>
              <li>Every project on this site carries its status: client project, prototype or demonstration.</li>
              <li>No invented figures, ratings or testimonials. Results appear only with evidence behind them.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
