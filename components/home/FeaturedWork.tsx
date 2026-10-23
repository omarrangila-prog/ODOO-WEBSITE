import Link from 'next/link';
import { publishableProjects, statusLabel } from '@/data/projects';
import { caseStudyHref } from '@/data/case-study-model';
import { countries, flagEmoji } from '@/data/countries';
import { SectionLabel } from './SectionLabel';

/**
 * Homepage section 4: three projects, chosen for relevance to what visitors
 * come here to buy, not for how they photograph.
 *
 *  - KCCI Election System: institutional custom software with roles and reporting.
 *  - WhatsApp Digital Connection: an integration that pushes business documents
 *    to customers on WhatsApp.
 *  - Scrabble Tournament Timer: a narrow, specific application built to order.
 *
 * No screenshots exist for any of them, so none are shown, and nothing stands in
 * for one: no generic artwork, no mock interface. Each card states what
 * management has confirmed the system does. No client problem, result or
 * timeline is asserted because none has been supplied. Where a case study passes
 * its publication gate the card links to it; until then it says what is true.
 */
const featured = ['kcci-election', 'whatsapp-digital-connection', 'scrabble-timer'];

export function FeaturedWork() {
  const all = publishableProjects();
  const rows = featured.map((id) => all.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section aria-labelledby="work-h" className="band band-alt">
      <div className="band-inner">
        <SectionLabel index="04">Featured work</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="work-h" className="band-title max-w-[20ch]">
            Systems built for real organisations.
          </h2>
          <Link href="/case-studies" className="link-editorial text-[15px]">
            All work, including demonstrations <span aria-hidden className="arrow">↗</span>
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {rows.map((p) => {
            const href = caseStudyHref(p.id);
            const country = p.evidence.countryPublic && p.countryCode ? countries.find((c) => c.code === p.countryCode) : undefined;
            return (
              <li key={p.id}>
                <article className="flex h-full flex-col rounded-[22px] border border-line bg-white/[0.02] p-6 sm:p-7">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-dark-muted">
                    <span className="rounded-full border border-violet/40 px-3 py-1 text-violet-bright">{statusLabel[p.status]}</span>
                    {p.industry && <span>{p.industry}</span>}
                    {country && (
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden>{flagEmoji(country.code)}</span>
                        {country.name}
                      </span>
                    )}
                  </p>

                  <h3 className="mt-5 font-heading text-[clamp(24px,2.2vw,32px)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                    {p.name}
                  </h3>

                  {p.purpose && <p className="mt-3 text-[16px] leading-relaxed text-text-dark">{p.purpose}</p>}

                  {p.capabilities && (
                    <div className="mt-5 flex-1">
                      <p className="band-eyebrow !text-[11px]">What it does</p>
                      <ul className="mt-3 divide-y divide-line border-y border-line">
                        {p.capabilities.slice(0, 5).map((c, i) => (
                          <li key={c} className="flex gap-3 py-2 text-[14.5px] leading-snug text-text-dark">
                            <span aria-hidden className="w-5 shrink-0 pt-px text-[12px] tracking-[0.12em] text-violet/80">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="mt-6 text-[14px]">
                    {href ? (
                      <Link href={href} className="link-editorial">
                        Read the case study <span aria-hidden className="arrow">↗</span>
                      </Link>
                    ) : (
                      <span className="text-text-dark-muted">Case study and screenshots available on request.</span>
                    )}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-text-dark-muted">
          Have something similar in mind?
          <a href="#enquiry" className="link-editorial">
            Describe your project <span aria-hidden className="arrow">↓</span>
          </a>
        </p>
      </div>
    </section>
  );
}
