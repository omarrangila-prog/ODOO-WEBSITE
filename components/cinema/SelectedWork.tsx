import Link from 'next/link';
import { publishableProjects, statusLabel } from '@/data/projects';
import { caseStudyHref } from '@/data/case-study-model';
import { countries, flagEmoji } from '@/data/countries';
import { SectionHead, Accent } from './SectionHead';

/**
 * Section 04. The four projects the brief names, in editorial rows, taken from
 * the verified registry so the classification on screen is the classification
 * on record. No screenshots exist yet, so there are none: each project is set
 * as type, with abstract line-work that is plainly artwork and not a picture of
 * the system. Only what management confirmed is stated; no outcome, number or
 * challenge has been invented.
 */
const featured = ['kcci-election', 'al-jadeed-election', 'scrabble-timer', 'whatsapp-digital-connection'];

function Lines({ seed }: { seed: number }) {
  const paths = Array.from({ length: 16 }, (_, i) => {
    const t = i / 15;
    const y = 90 - t * 64;
    const k = seed * 1.3;
    return (
      <path
        key={i}
        d={`M0 ${y.toFixed(1)} C 80 ${(y - 30 - Math.sin(k) * 14 - t * 10).toFixed(1)}, 190 ${(y + 26 + Math.cos(k) * 12 - t * 22).toFixed(1)}, 300 ${(y - 14 - t * 18 + seed * 3).toFixed(1)}`}
        strokeOpacity={0.12 + t * 0.55}
      />
    );
  });
  return (
    <svg viewBox="0 0 300 120" aria-hidden className="h-full w-full" fill="none" stroke="url(#work-grad)" strokeWidth="0.7" preserveAspectRatio="none">
      <defs>
        <linearGradient id="work-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#6b3df0" />
          <stop offset="1" stopColor="#d8c8ff" />
        </linearGradient>
      </defs>
      {paths}
    </svg>
  );
}

export function SelectedWork() {
  const all = publishableProjects();
  const rows = featured.map((id) => all.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section aria-labelledby="work-h" className="stage-section">
      <div className="stage-inner">
        <SectionHead
          index="04"
          label="Selected work"
          id="work-h"
          title={
            <>
              Proof is <Accent>in the work.</Accent>
            </>
          }
          lede="Real systems built for real organisations. Each carries its status exactly as recorded, and detailed case studies are shared on request until they are written up with evidence."
        />

        <ul className="mt-[clamp(48px,7vw,104px)] grid gap-x-8 gap-y-[clamp(40px,5vw,72px)] md:grid-cols-2">
          {rows.map((p, i) => {
            const href = caseStudyHref(p.id);
            const country = p.evidence.countryPublic && p.countryCode ? countries.find((c) => c.code === p.countryCode) : undefined;
            const inner = (
              <>
                <span className="relative block aspect-[5/2] overflow-hidden rounded-[22px] border border-line bg-[radial-gradient(ellipse_at_70%_30%,rgba(100,60,230,0.28),transparent_70%)]">
                  <span className="absolute inset-0 opacity-90 transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04] motion-reduce:transform-none">
                    <Lines seed={i + 1} />
                  </span>
                  <span className="absolute left-5 top-4 text-[12px] tracking-[0.18em] text-violet/90">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>

                <span className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-text-dark-muted">
                  <span className="rounded-full border border-violet/40 px-3 py-1 text-violet-bright">{statusLabel[p.status]}</span>
                  {p.industry && <span>{p.industry}</span>}
                  {country && (
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden>{flagEmoji(country.code)}</span>
                      {country.name}
                    </span>
                  )}
                </span>

                <span className="mt-4 block font-heading text-[clamp(26px,3vw,46px)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
                  {p.name}
                </span>
                <span className="mt-3 block max-w-[52ch] text-[16px] leading-relaxed text-text-dark-muted">{p.summary}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-[14px] text-text-dark">
                  {href ? 'Read the case study' : 'Case study available on request'}
                  {href && <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>}
                </span>
              </>
            );
            return (
              <li key={p.id} className={i % 2 === 1 ? 'md:mt-[clamp(0px,6vw,96px)]' : ''}>
                {href ? (
                  <Link href={href} className="no-underline group block">
                    {inner}
                  </Link>
                ) : (
                  <article className="group block">{inner}</article>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-[clamp(40px,5vw,72px)]">
          <Link href="/case-studies" className="link-editorial">
            See all work, including labelled demonstrations <span aria-hidden className="arrow">↗</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
