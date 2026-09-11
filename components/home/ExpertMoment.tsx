import Image from 'next/image';
import { Linkedin, Check } from 'lucide-react';
import { company } from '@/data/company';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';

const expertise = [
  'Odoo implementation & configuration',
  'Custom module development',
  'Process automation',
  'AI-assisted dashboards',
  'Reporting & analytics',
  'Third-party & API integrations',
];

/**
 * Founder photo is intentionally NOT shown as an empty placeholder box.
 * When a real portrait exists, set company.founderPhoto and it renders;
 * otherwise a designed operational visual panel is shown in its place.
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
          <h2 className="display-2">
            You Are Not Hiring a Software Vendor.{' '}
            <span className="signal-text">You Are Building a Better Way to Run Your Business.</span>
          </h2>

          <blockquote className="mt-8 border-l-2 border-violet/40 pl-6 text-[clamp(18px,2vw,22px)] leading-relaxed text-ink">
            &ldquo;We begin by understanding your workflow, your team and your operational
            problems. The technology comes after the business logic is clear.&rdquo;
          </blockquote>

          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted">
            ODOOVATIONS is a Pakistan-based team of Odoo implementers and developers who have
            helped businesses replace disconnected spreadsheets and manual approvals with one
            connected system. We combine local operational understanding with structured,
            international-standard delivery.
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {expertise.map((e) => (
              <li key={e} className="flex items-start gap-2 text-[15px] text-ink-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden />
                {e}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <ButtonLink href="/contact#form" variant="secondary">
              Book a Consultation
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
