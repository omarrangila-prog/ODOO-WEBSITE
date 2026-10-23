import Link from 'next/link';
import {
  departmentGroups,
  groupCountLabel,
  seniorSupervisorExperience,
  verifiedUniqueEmployees,
} from '@/data/team';
import { SectionHead, Accent } from './SectionHead';

/**
 * Section 06. The multidisciplinary workforce, set as large departmental
 * typography. Every figure comes from data/team.ts; they are role positions as
 * reported by management and the section says so. No overall headcount is shown
 * unless the owner has confirmed a unique-people number, and no faces or names
 * appear because none have been approved.
 */
export function TeamOverview() {
  return (
    <section aria-labelledby="team-h" className="stage-section">
      <div className="stage-inner">
        <SectionHead
          index="06"
          label="The people"
          id="team-h"
          title={
            <>
              Behind every system, <br className="hidden md:block" />
              real <Accent>expertise.</Accent>
            </>
          }
          lede="Great technology takes more than coding. Software engineers, Odoo specialists, AI professionals, designers, quality reviewers, business-domain experts, sales and operations work on the same projects."
        />

        <ul className="mt-[clamp(48px,7vw,104px)] border-t border-line">
          {departmentGroups.map((g, i) => (
            <li key={g.id} className="grid items-baseline gap-x-8 gap-y-2 border-b border-line py-[clamp(18px,2.2vw,30px)] md:grid-cols-[56px_1.4fr_1fr_auto]">
              <span aria-hidden className="text-[13px] tracking-[0.18em] text-violet/80">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-heading text-[clamp(24px,3.4vw,52px)] font-semibold leading-[1.05] tracking-[-0.038em] text-white">{g.label}</h3>
              <p className="text-[15px] leading-relaxed text-text-dark-muted">{g.summary}</p>
              <p className="text-[13px] tracking-[0.04em] text-violet-bright md:text-right">{groupCountLabel(g.id)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
          <p className="max-w-[62ch] text-[14px] leading-relaxed text-text-dark-muted">
            Counts are role positions reported by management. They are not a verified headcount: one person may hold more
            than one role, and the roster is still being confirmed.
            {verifiedUniqueEmployees !== null && ` Confirmed team members: ${verifiedUniqueEmployees}.`}
          </p>
          {seniorSupervisorExperience.approvedForPublication && (
            <p className="border-l border-violet/50 pl-5 text-[15px] leading-relaxed text-text-dark">
              <span className="font-heading text-[clamp(30px,3.4vw,48px)] font-semibold tracking-[-0.03em] text-white">
                {seniorSupervisorExperience.reportedYears}
              </span>{' '}
              years of professional experience, reported for one senior supervisor on the team.
            </p>
          )}
        </div>

        <p className="mt-[clamp(36px,4vw,64px)]">
          <Link href="/company/team" className="link-editorial">
            Meet the ODOOVATIONS team <span aria-hidden className="arrow">↗</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
