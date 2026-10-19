import { Linkedin, Check } from 'lucide-react';
import { company } from '@/data/company';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { TextGap } from '@/components/ui/TextGap';

/**
 * Department overview. Names the whole multidisciplinary team, not only the
 * engineers and Odoo implementers the section used to describe. No counts
 * here: the homepage should not repeat the Team page's numbers, and a number
 * stated twice is a number that can drift.
 */
const teamAreas = [
  'Software engineering',
  'Odoo ERP specialists',
  'AI & automation',
  'Creative production',
  'Quality assurance',
  'Business validation',
  'Sales & client relations',
  'Infrastructure & operations',
];

/**
 * Team band. Links to /company/team for the full structure. No portrait or
 * individual cards: those appear only once real, approved photographs exist.
 */
export function ExpertMoment() {
  const linkedin = company.social.linkedin;

  return (
    <section id="founder" className="theme-light bay">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Designed operational visual (stands in for a portrait, not an empty box) */}
        <div className="relative">
          <div className="relative aspect-[4/5] max-w-[520px] overflow-hidden rounded-editorial border border-line-light bg-[linear-gradient(145deg,#14151d,#0b0c11)] shadow-panel-light">
            <div className="absolute inset-0 arch-grid opacity-[0.35]" aria-hidden />
            <div className="absolute inset-0 grid place-items-center p-8">
              <div className="text-center">
                <span className="font-heading text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                  Business
                  <br />
                  <span className="signal-text">first.</span>
                </span>
                <p className="mt-6 text-[14px] leading-relaxed text-white/60">
                  Technology second.
                  <br />
                  Always in that order.
                </p>
              </div>
            </div>
            <span className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 radial-core" aria-hidden />
          </div>
        </div>

        {/* Statement */}
        <div>
          <p className="eyebrow mb-6">The People Behind It</p>
          <TextGap />
          <h2 className="display-2">
            The People Behind{' '}
            <span className="signal-text">Every Successful System.</span>
          </h2>{' '}

          <p className="mt-8 border-l-2 border-violet/40 pl-6 font-heading text-[clamp(18px,2vw,22px)] font-medium leading-relaxed text-ink">
            Our working principle: we begin by understanding your workflow, your team and your
            operational problems. The technology comes after the business logic is clear.
          </p>{' '}

          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            Great technology requires more than coding. Our multidisciplinary workforce brings together software
            engineers, Odoo specialists, AI professionals, designers, quality reviewers, business-domain experts,
            sales representatives and operational support teams &mdash; based in Karachi and part of the Kausar
            Innovations group.
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {teamAreas.map((e) => (
              <li key={e} className="flex items-start gap-2 text-[15px] text-ink-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden />
                {e}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <ButtonLink href="/company/team">
              Meet the ODOOVATIONS Team
              <ArrowNudge className="h-4 w-4" />
            </ButtonLink>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-violet underline-offset-4 hover:underline">
                <Linkedin className="h-4 w-4" aria-hidden />
                Connect on LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
