import Link from 'next/link';
import { teamTotals, seniorSupervisorExperience } from '@/data/team';
import { SectionLabel } from './SectionLabel';

/**
 * Homepage section 2: who is behind the work, in numbers.
 *
 * Every figure comes from data/team.ts and nothing else. The headline number is
 * labelled for what it is: role positions management reported, shown as "team
 * positions" until the owner confirms unique people, and as "team members" after.
 * Roles with no supplied number (client communication, freelancers) are left out
 * of the total and the caption says so. The experience figure belongs to one
 * person and is labelled that way; it is not the company's age.
 *
 * Projects are not repeated here: the next sections show them.
 */
export function ProofSection() {
  const t = teamTotals();
  const exp = seniorSupervisorExperience;

  const stats: { n: string; label: string }[] = [
    { n: String(t.total), label: `${t.noun}${t.confirmedUnique ? '' : ' reported across the company'}` },
    { n: String(t.roleTypes), label: 'role titles, from leadership to server operations' },
    { n: String(t.departments), label: 'departments working on the same projects' },
  ];
  if (exp.approvedForPublication) stats.push({ n: exp.reportedYears, label: 'years of experience held by our senior supervisor' });

  return (
    <section aria-labelledby="proof-h" className="band band-tight">
      <div className="band-inner">
        <SectionLabel index="02">The team</SectionLabel>
        <h2 id="proof-h" className="sr-only">
          The ODOOVATIONS team in numbers
        </h2>

        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-0">
          {stats.map((s, i) => (
            <li key={s.label} className={i > 0 ? 'lg:border-l lg:border-line lg:pl-8' : ''}>
              <span className="block font-heading text-[clamp(44px,5.4vw,76px)] font-semibold leading-[0.95] tracking-[-0.045em] text-white">{s.n}</span>
              <span className="mt-3 block max-w-[24ch] text-[14.5px] leading-snug text-text-dark-muted sm:text-[15px]">{s.label}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[14px] leading-relaxed text-text-dark-muted">
          <span className="max-w-[78ch]">
            Positions are as reported by management and include {t.interns} interns. Client-communication staff and freelance collaborators are not counted.
            Based in Karachi, Pakistan, serving clients in Pakistan and abroad remotely.
          </span>
          <Link href="/company/team" className="link-editorial whitespace-nowrap text-[15px]">
            Every role and department <span aria-hidden className="arrow">↗</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
