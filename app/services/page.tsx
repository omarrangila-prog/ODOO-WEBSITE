import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/data/services';
import { divisions } from '@/data/divisions';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const PATH = '/services';
const DESCRIPTION =
  'AI automation, custom software, Odoo ERP, websites and apps, marketing and advertising, creative and video, content and social — the full ODOOVATIONS capability list in one place.';

export const metadata: Metadata = buildMetadata({
  title: 'Software, AI, Odoo, Web & Creative | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

export default function ServicesIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'What We Do', path: PATH },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema('What We Do', PATH, DESCRIPTION),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'ODOOVATIONS capability divisions',
            itemListElement: divisions.map((d, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: d.title,
              url: `https://odoovations.com${d.href}`,
            })),
          },
        ]}
      />

      {/* Editorial header */}
      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[6%] top-1/4 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">What we do</p>
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">Technology, Automation,</span>,
              <span key="2">Software, Creative <span className="signal-text">&amp; Growth.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Seven divisions, one team. Below is the complete list of what each one covers &mdash;
            not a summary, the actual list, so you can see whether the thing you need is on it.
          </p>

          <AnswerCard
            question="What services does ODOOVATIONS provide?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            ODOOVATIONS provides AI automation and AI agents; custom software and product
            development; Odoo ERP implementation, customisation and support; websites, web
            applications and mobile apps; digital marketing and advertising; creative, video and
            animation production; and content and social media management. The company is based in
            Karachi, Pakistan and serves international clients remotely.
          </AnswerCard>
        </div>
      </section>

      {/* Divisions with full capability lists */}
      <section className="theme-light bay-sm">
        <div className="shell">
          {divisions.map((d, i) => (
            <article
              key={d.id}
              id={d.id}
              className="scroll-mt-24 border-t border-line-light py-14 first:border-t-0 first:pt-0 sm:py-16"
            >
              <div className="grid gap-10 lg:grid-cols-[1fr_1.45fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-[14px] font-semibold text-ink/25">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-control bg-[linear-gradient(120deg,#7C4DFF,#E947C6)] text-white">
                      <d.icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>

                  <h2 className="mt-5 font-heading text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
                    {d.title}
                  </h2>
                  <p className="mt-4 max-w-[44ch] text-[16.5px] leading-relaxed text-ink-muted">
                    {d.answer}
                  </p>

                  <Link
                    href={d.href}
                    className="group mt-6 inline-flex items-center gap-2 text-[15.5px] font-semibold text-violet"
                  >
                    {d.ctaLabel}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>

                  {d.pages.length > 1 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {d.pages.map((pg) => (
                        <li key={pg.href}>
                          <Link
                            href={pg.href}
                            className="inline-block rounded-full border border-line-light px-3.5 py-1.5 text-[13px] text-ink-muted transition-colors hover:border-violet/40 hover:text-violet"
                          >
                            {pg.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* The full capability list, grouped so it stays scannable */}
                <div className="grid gap-8 sm:grid-cols-2">
                  {d.capabilities.map((group) => (
                    <div key={group.group}>
                      <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                        {group.group}
                      </h3>
                      <ul className="mt-3 space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item} className="text-[15.5px] leading-snug text-ink-muted">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Every service page, as a plain index */}
      <section className="theme-graphite bay-sm">
        <div className="shell">
          <h2 className="display-2">Every capability page</h2>
          <p className="lede mt-5 max-w-[var(--reading-width)]">
            Each one covers the problems it solves, how we work, what you get and what it depends
            on.
          </p>
          <ul className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="group flex h-full items-start justify-between gap-4 rounded-panel border border-line bg-white/[0.02] p-5 transition-colors hover:border-violet-bright/40 hover:bg-white/[0.04]"
                >
                  <span>
                    <span className="block text-[15.5px] font-semibold text-text-dark">
                      {s.navLabel}
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed text-text-dark-muted">
                      {s.tagline}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 h-4 w-4 shrink-0 text-text-dark-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not sure which of these you need?"
        body="Describe the problem in your own words — a voice note, a spreadsheet or a screenshot is enough. We will tell you what we would build and what we would leave alone."
        primaryLabel="Describe My Requirement"
      />
    </>
  );
}
