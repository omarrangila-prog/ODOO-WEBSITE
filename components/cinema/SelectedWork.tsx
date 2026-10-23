import Link from 'next/link';
import Image from 'next/image';
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

/**
 * Each project panel is a different zoomed crop of the signature artwork: the
 * peak, the long sweep, the lower arcs, the corner arc. It is one image the
 * homepage has already loaded, so it costs nothing extra, and it reads as brand
 * material and not as a picture of the system.
 */
const crops = [
  { scale: 2.1, origin: '74% 28%' },
  { scale: 1.7, origin: '92% 72%' },
  { scale: 2.7, origin: '60% 64%' },
  { scale: 2.2, origin: '96% 14%' },
] as const;

function Crop({ index }: { index: number }) {
  const c = crops[index % crops.length] as (typeof crops)[number];
  return (
    <span className="absolute inset-0 block" style={{ transform: `scale(${c.scale})`, transformOrigin: c.origin }}>
      <Image src="/art/ribbon-wide.webp" alt="" fill unoptimized sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-right mix-blend-screen" />
    </span>
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
                <span className="relative block aspect-[5/2] overflow-hidden rounded-[22px] border border-line bg-midnight">
                  <span aria-hidden className="absolute inset-0 block transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.06] motion-reduce:transform-none">
                    <Crop index={i} />
                  </span>
                  <span className="absolute left-5 top-4 z-10 text-[12px] tracking-[0.18em] text-violet-bright">
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
