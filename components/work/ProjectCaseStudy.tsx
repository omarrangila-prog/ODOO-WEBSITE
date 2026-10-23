import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { statusLabel } from '@/data/projects';
import { publishedCaseStudies, type CaseStudyRecord } from '@/data/case-study-model';
import { countries } from '@/data/countries';
import { getPath, pathHref } from '@/data/enquiry-paths';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { LazyDemo } from './demos/LazyDemo';

/**
 * Reusable detail page for a real project. Every section renders only when
 * its content exists — a project with screenshots but no video has no video
 * block, and nothing here ever draws an empty frame or a placeholder
 * sentence. The page is reached only for records that pass isPublishable().
 */
export function ProjectCaseStudy({ record: r }: { record: CaseStudyRecord }) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our Work', path: '/case-studies' },
    { name: r.name, path: `/projects/${r.slug}` },
  ];
  const shots = r.screenshots ?? [];
  const related = publishedCaseStudies().filter((x) => x.slug !== r.slug).slice(0, 3);
  const features = [...(r.modules ?? []), ...(r.capabilities ?? [])];
  const tech = [...(r.stack ?? []), ...(r.integrations ?? [])];
  const path = getPath(r.enquiryPath);
  const unpublished = [
    shots.length === 0 && !r.video ? 'screenshots of the delivered system' : null,
    !r.outcomes?.length ? 'measured results' : null,
    !r.testimonial?.approved ? 'a client testimonial' : null,
  ].filter((x): x is string => Boolean(x));
  const country = r.countryCode ? countries.find((c) => c.code === r.countryCode)?.name : undefined;
  const facts = (
    [
      ['Status', statusLabel[r.classification]],
      ['Client', r.clientDisplayName],
      ['Sector', r.industry],
      ['Country', country],
      ['Type', r.serviceCategory],
    ] as [string, string | undefined][]
  ).filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <article>
      {/* 1 — Hero */}
      <section className="theme-dark grain relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">
            {statusLabel[r.classification]}
            {r.industry ? ` · ${r.industry}` : ''}
          </p>{' '}
          <MaskedReveal as="h1" className="display-1 max-w-4xl" lines={[<span key="1">{r.name}</span>]} />{' '}
          {r.overview && <p className="lede mt-7 max-w-[var(--reading-width)]">{r.overview}</p>}
          {r.cover && (
            <Image
              src={r.cover.src}
              width={r.cover.width}
              height={r.cover.height}
              alt={r.cover.alt}
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="mt-10 h-auto w-full max-w-4xl rounded-editorial border border-line"
            />
          )}
        </div>
      </section>

      {/* 1b — At a glance + what the system does */}
      {(r.scope?.length ?? 0) > 0 && (
        <section className="theme-light bay-sm" aria-labelledby="does-h">
          <div className="shell">
            <dl className="grid gap-x-8 gap-y-4 border-y border-line-light py-5 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{k}</dt>
                  <dd className="mt-1 text-[16px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <h2 id="does-h" className="display-2">What the system does</h2>
                {r.purpose && <p className="mt-5 text-[18px] leading-relaxed text-ink">{r.purpose}</p>}
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                  Each line below is a function management has confirmed the system performs.
                </p>
              </div>
              <ol className="divide-y divide-line-light border-y border-line-light">
                {r.scope!.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-4">
                    <span aria-hidden className="pt-1 text-[12px] tracking-[0.14em] text-violet">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-heading text-[18px] font-semibold tracking-[-0.015em] text-ink">{s.title}</span>
                      <span className="mt-1 block text-[15.5px] leading-relaxed text-ink-muted">{s.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* 1c — A working demonstration, labelled as one */}
      {r.demonstration && (
        <section className="theme-graphite bay-sm" aria-labelledby="demo-h">
          <div className="shell">
            <p className="eyebrow mb-4">Working demonstration</p>
            <h2 id="demo-h" className="display-2 max-w-3xl">{r.demonstration.heading}</h2>
            <p className="mt-4 max-w-[var(--reading-width)] text-[16.5px] leading-relaxed text-text-dark-muted">{r.demonstration.intro}</p>
            <div className="mt-8">
              <LazyDemo id={r.demonstration.kind} />
            </div>
          </div>
        </section>
      )}

      {/* 1d — What this page rests on */}
      {r.scope && (
        <section className="theme-light bay-sm" aria-labelledby="basis-h">
          <div className="shell">
            <h2 id="basis-h" className="display-2 max-w-3xl">What this page rests on</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-editorial border border-line-light bg-ivory-soft p-6">
                <h3 className="font-heading text-[18px] font-semibold text-ink">Confirmed</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-muted">
                  What the system does, as listed above. {r.factsSource}
                </p>
              </div>
              {r.demonstration && (
                <div className="rounded-editorial border border-line-light bg-ivory-soft p-6">
                  <h3 className="font-heading text-[18px] font-semibold text-ink">Built for this page</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink-muted">
                    The demonstration above, made by ODOOVATIONS with invented data. It illustrates the kind of workflow involved. It is not a screen from the delivered system.
                  </p>
                </div>
              )}
              {unpublished.length > 0 && (
                <div className="rounded-editorial border border-line-light bg-ivory-soft p-6">
                  <h3 className="font-heading text-[18px] font-semibold text-ink">Not published yet</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink-muted">
                    {new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(unpublished).replace(/^./, (c) => c.toUpperCase())}.
                    {' '}We publish these only with the client&rsquo;s approval and the evidence behind them.{' '}
                    <Link href={pathHref(r.enquiryPath ?? 'other', `project-${r.slug}`)} className="text-violet underline underline-offset-4">
                      Ask what can be shared
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 1e — Questions to settle first */}
      {r.briefing && (
        <section className="theme-graphite bay-sm" aria-labelledby="brief-h">
          <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 id="brief-h" className="display-2">{r.briefing.heading}</h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-text-dark-muted">{r.briefing.intro}</p>
              {path && (
                <div className="mt-8">
                  <ButtonLink href={pathHref(path.id, `project-${r.slug}`)}>Discuss a project like this</ButtonLink>
                </div>
              )}
              {(r.relatedServices?.length ?? 0) > 0 && (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
                  {r.relatedServices!.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="inline-flex min-h-[44px] items-center font-medium text-violet underline-offset-4 hover:underline">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ol className="divide-y divide-line border-y border-line">
              {r.briefing.questions.map((q, i) => (
                <li key={q} className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-3.5 text-[16px] leading-relaxed text-text-dark">
                  <span aria-hidden className="pt-0.5 text-[12px] tracking-[0.14em] text-violet/80">{String(i + 1).padStart(2, '0')}</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 2-4 — Problem, solution, features */}
      {(r.problem || r.solution || features.length > 0) && (
        <section className="theme-light bay">
          <div className="shell grid gap-12 lg:grid-cols-2">
            {r.problem && (
              <div>
                <h2 className="display-2">The business problem</h2>{' '}
                <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">{r.problem}</p>
                {r.requirements && r.requirements.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {r.requirements.map((q) => (
                      <li key={q} className="flex items-start gap-2 text-[16px] text-ink-muted">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-violet" aria-hidden />
                        {q}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {r.solution && (
              <div>
                <h2 className="display-2">What was delivered</h2>{' '}
                <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">{r.solution}</p>
                {(r.delivery || r.deploymentStatus || r.supportScope) && (
                  <dl className="mt-5 space-y-3 text-[16px]">
                    {r.delivery && <div><dt className="font-semibold text-ink">Delivery</dt>{' '}<dd className="text-ink-muted">{r.delivery}</dd></div>}
                    {r.deploymentStatus && <div><dt className="font-semibold text-ink">Deployment</dt>{' '}<dd className="text-ink-muted">{r.deploymentStatus}</dd></div>}
                    {r.supportScope && <div><dt className="font-semibold text-ink">Support</dt>{' '}<dd className="text-ink-muted">{r.supportScope}</dd></div>}
                  </dl>
                )}
              </div>
            )}
            {features.length > 0 && (
              <div className="lg:col-span-2">
                <h2 className="font-heading text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">Important features</h2>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[16px] text-ink-muted">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-violet" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5 — Product gallery */}
      {shots.length > 0 && (
        <section className="theme-graphite bay">
          <div className="shell">
            <h2 className="display-2">The system itself</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {shots.map((s) => (
                <li key={s.src}>
                  <figure>
                    <Image
                      src={s.src}
                      width={s.width}
                      height={s.height}
                      alt={s.alt}
                      loading="lazy"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full rounded-control border border-line"
                    />
                    {s.caption && <figcaption className="mt-2 text-[14px] text-text-dark-muted">{s.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 6 — Walkthrough video */}
      {r.video && (
        <section className="theme-light bay">
          <div className="shell max-w-4xl">
            <h2 className="display-2">Walkthrough</h2>
            <video controls preload="none" poster={r.video.poster} className="mt-8 w-full rounded-editorial border border-line-light">
              <source src={r.video.src} />
            </video>
            {r.video.caption && <p className="mt-3 text-[14px] text-ink-muted">{r.video.caption}</p>}
          </div>
        </section>
      )}

      {/* 7 — Technology, only where verified */}
      {tech.length > 0 && (
        <section className="theme-light bay-sm">
          <div className="shell">
            <h2 className="font-heading text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">Technology and integrations</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {tech.map((t) => (
                <li key={t} className="rounded-full border border-line-light bg-ivory-soft px-4 py-2 text-[14px] font-medium text-ink">{t}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 8 — Verified outcomes: each carries its evidence */}
      {r.outcomes && r.outcomes.length > 0 && (
        <section className="theme-graphite bay">
          <div className="shell">
            <h2 className="display-2">Verified outcomes</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {r.outcomes.map((o) => (
                <li key={o.statement} className="rounded-editorial border border-line p-6">
                  <p className="font-heading text-[20px] font-semibold leading-snug">{o.statement}</p>{' '}
                  <p className="mt-3 text-[14px] text-text-dark-muted">
                    Evidence: {o.evidence}
                    {o.measuredOver ? ` Measured over ${o.measuredOver}.` : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {r.testimonial?.approved && (
        <section className="theme-light bay-sm">
          <div className="shell max-w-3xl">
            <blockquote className="border-l-2 border-violet pl-6 font-heading text-[clamp(18px,2vw,22px)] font-medium leading-relaxed text-ink">
              {r.testimonial.quote}
              <footer className="mt-3 text-[14px] font-normal text-ink-muted">{r.testimonial.attribution}</footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* 9 — Related work */}
      {related.length > 0 && (
        <section className="theme-light bay-sm">
          <div className="shell">
            <h2 className="font-heading text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">More of our work</h2>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {related.map((x) => (
                <li key={x.slug}>
                  <Link href={`/projects/${x.slug}`} className="inline-flex min-h-[44px] items-center font-medium text-violet underline-offset-4 hover:underline">
                    {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
