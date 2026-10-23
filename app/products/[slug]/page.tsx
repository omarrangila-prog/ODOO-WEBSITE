import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { publishedProducts, getPublishedProduct, productCategories, productStatusLabel } from '@/data/products';
import { contactHref } from '@/data/ctas';
import { buildMetadata, breadcrumbSchema, webPageSchema, SITE_URL } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageArt } from '@/components/cinema/PageArt';

/** Only products that pass the gate get a page; anything else is a 404, not a thin page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPublishedProduct(params.slug);
  if (!p) return {};
  return buildMetadata({ title: `${p.name} | ODOOVATIONS`, description: p.description.slice(0, 160), path: `/products/${p.slug}` });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getPublishedProduct(params.slug);
  if (!p) notFound();
  const cat = productCategories.find((c) => c.id === p.category);
  const path = `/products/${p.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: p.name, path },
  ];
  const related = p.related.map((s) => getPublishedProduct(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const shots = p.screenshots.filter((s) => s.approved && s.alt.trim());

  // SoftwareApplication only for products people can actually use or try. No price, rating or review is emitted: none are held.
  const schema =
    p.status === 'custom-solution'
      ? null
      : {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: p.name,
          description: p.description,
          applicationCategory: 'BusinessApplication',
          url: `${SITE_URL}${path}`,
          publisher: { '@id': `${SITE_URL}/#organization` },
        };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema(p.name, path, p.description), ...(schema ? [schema] : [])]} />
      <article>
        <section className="theme-dark grain relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
          <PageArt variant={2} />
          <div className="shell relative">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow mb-6">{cat?.label ?? 'Product'} · {productStatusLabel[p.status]}</p>
            <h1 className="display-1 max-w-5xl">{p.name}</h1>
            <p className="lede mt-7 max-w-[var(--reading-width)]">{p.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref('Business System', `product-${p.slug}`)}>
                Discuss {p.name}
                <ArrowNudge />
              </ButtonLink>
              {p.demoUrl && (
                <ButtonLink href={p.demoUrl} external variant="secondary">
                  Open the demo
                </ButtonLink>
              )}
            </div>
          </div>
        </section>

        <section className="theme-graphite bay-sm">
          <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="page-h2">Who it is for</h2>
              <p className="mt-6 text-[17px] leading-relaxed text-text-dark-muted">{p.targetCustomer}</p>
              <h2 className="page-h2 mt-12">The problem it addresses</h2>
              <p className="mt-6 text-[17px] leading-relaxed text-text-dark-muted">{p.businessProblem}</p>
            </div>
            <div>
              <h2 className="page-h2">Features</h2>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[17px] leading-relaxed text-text-dark-muted">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-green" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {shots.length > 0 && (
          <section className="theme-dark bay-sm">
            <div className="shell">
              <h2 className="page-h2">What it looks like</h2>
              <ul className="mt-8 grid gap-5 md:grid-cols-2">
                {shots.map((s) => (
                  <li key={s.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} width={s.width} height={s.height} alt={s.alt} loading="lazy" className="h-auto w-full rounded-[18px] border border-line" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="theme-graphite bay-sm">
          <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
            <dl className="divide-y divide-line border-y border-line">
              {[
                ['Integrations', p.integrations.length ? p.integrations.join(', ') : 'Agreed per project'],
                ['Deployment', p.deploymentModel],
                ['Pricing', p.pricingApproach],
                ['Support', p.support],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <dt className="font-heading text-[17px] font-semibold text-white">{k}</dt>
                  <dd className="text-[16px] leading-relaxed text-text-dark-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h2 className="page-h2 !text-[clamp(24px,2.4vw,32px)]">What implementation needs from you</h2>
              {p.implementationRequirements.length > 0 ? (
                <ul className="mt-6 space-y-3">
                  {p.implementationRequirements.map((r) => (
                    <li key={r} className="text-[16px] leading-relaxed text-text-dark-muted">{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 text-[16px] leading-relaxed text-text-dark-muted">Agreed with you during scoping.</p>
              )}
              <p className="mt-8 text-[13px] text-text-dark-muted">Source of these facts: {p.evidence.source}</p>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="theme-dark pb-4">
            <div className="shell text-[15px] text-text-dark-muted">
              Related products:{' '}
              {related.map((r, i, arr) => (
                <span key={r.slug}>
                  <Link href={`/products/${r.slug}`}>{r.name}</Link>
                  {i < arr.length - 1 && ' · '}
                </span>
              ))}
            </div>
          </section>
        )}

        <CtaBand title={`Interested in ${p.name}?`} primaryLabel="Discuss Your Project" primaryHref={contactHref('Business System', `product-${p.slug}`)} />
      </article>
    </>
  );
}
