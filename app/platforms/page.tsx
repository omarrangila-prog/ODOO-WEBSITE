import type { Metadata } from 'next';
import Link from 'next/link';
import { platformGroups, platformEntries, platformNotice } from '@/data/platforms';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { PageArt } from '@/components/cinema/PageArt';

const PATH = '/platforms';
const DESCRIPTION =
  'The platforms ODOOVATIONS builds on and connects to: Odoo, Shopify, WooCommerce, WordPress, QuickBooks and the WhatsApp Business Platform, grouped by what you want to do with them.';

export const metadata: Metadata = buildMetadata({
  title: 'Platforms We Build On & Integrate | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

export default function PlatformsIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Platforms', path: PATH },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema('Platforms', PATH, DESCRIPTION),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Platforms ODOOVATIONS works with',
            itemListElement: platformEntries
              .filter((e) => e.dedicated)
              .map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.name, url: `https://odoovations.com${e.href}` })),
          },
        ]}
      />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <PageArt variant={3} />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Platforms</p>
          <h1 className="display-1 max-w-4xl">
            Your tools, <span className="signal-text">connected.</span>
          </h1>
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Most businesses already run on several platforms. We build on them and join them up, so information is entered
            once and arrives where it is needed.
          </p>
          <AnswerCard question="Which platforms do you work with?" className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted">
            Odoo for ERP and operations, Shopify and WooCommerce for online stores, WordPress for websites, QuickBooks for
            accounting integrations, and the WhatsApp Business Platform for customer conversations, plus payment, courier and
            banking APIs. We work with them as an independent team and claim no official partnership.
          </AnswerCard>
        </div>
      </section>

      <section className="theme-graphite bay-sm">
        <div className="shell space-y-14">
          {platformGroups.map((g) => {
            const items = platformEntries.filter((e) => e.group === g.id);
            return (
              <div key={g.id}>
                <h2 className="page-h2">{g.label}</h2>
                <p className="mt-3 max-w-[60ch] text-[17px] leading-relaxed text-text-dark-muted">{g.question}</p>
                <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((e) => (
                    <li key={e.id}>
                      <Link
                        href={e.href}
                        className="no-underline group flex h-full flex-col rounded-[20px] border border-line bg-white/[0.02] p-6 transition-colors hover:border-violet-bright/45 hover:bg-white/[0.04]"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-heading text-[22px] font-semibold tracking-[-0.025em] text-white">{e.name}</span>
                          <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-text-dark-muted transition-colors group-hover:border-violet-bright/60 group-hover:text-white">↗</span>
                        </span>
                        <span className="mt-2 block text-[16px] leading-relaxed text-text-dark-muted">{e.does}</span>
                        <span className="mt-4 text-[14px] text-violet-bright">{e.dedicated ? 'Platform page' : 'Service page'}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <p className="max-w-[80ch] text-[13px] leading-relaxed text-text-dark-muted">{platformNotice}</p>
        </div>
      </section>

      <CtaBand title="Tell us which systems you run." primaryLabel="Discuss Your Project" />
    </>
  );
}
