import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publishedProducts, productCategories, productStatusLabel } from '@/data/products';
import { buildMetadata, breadcrumbSchema, webPageSchema, SITE_URL } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageArt } from '@/components/cinema/PageArt';

const PATH = '/products';
const DESCRIPTION = 'Business software products from ODOOVATIONS, each labelled live, demo, beta or custom solution, with who it is for and what it does.';

export const metadata: Metadata = buildMetadata({ title: 'Products | ODOOVATIONS', description: DESCRIPTION, path: PATH });

/**
 * The product catalogue index. It exists only while at least one product passes
 * the publication gate in data/products.ts; with none, the route is a 404 and
 * is absent from the sitemap, so there is never an empty or placeholder page to
 * index.
 */
export default function ProductsIndex() {
  const items = publishedProducts();
  if (items.length === 0) notFound();
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: PATH },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema('Products', PATH, DESCRIPTION),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'ODOOVATIONS products',
            itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${SITE_URL}/products/${p.slug}` })),
          },
        ]}
      />
      <section className="theme-dark grain relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        <PageArt variant={1} />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Products</p>
          <h1 className="display-1 max-w-4xl">Software you can look at.</h1>
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Each product shows its status honestly: a live product, a demo, a beta or a custom solution we adapt to your business.
          </p>
        </div>
      </section>
      <section className="theme-graphite bay-sm">
        <div className="shell space-y-14">
          {productCategories.map((c) => {
            const inCat = items.filter((p) => p.category === c.id);
            if (inCat.length === 0) return null;
            return (
              <div key={c.id}>
                <h2 className="page-h2">{c.label}</h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {inCat.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} className="no-underline group flex h-full flex-col rounded-[20px] border border-line bg-white/[0.02] p-6 transition-colors hover:border-violet-bright/45">
                        <span className="w-fit rounded-full border border-violet/40 px-3 py-1 text-[13px] text-violet-bright">{productStatusLabel[p.status]}</span>
                        <span className="mt-4 font-heading text-[22px] font-semibold tracking-[-0.025em] text-white">{p.name}</span>
                        <span className="mt-2 block text-[16px] leading-relaxed text-text-dark-muted">{p.businessProblem}</span>
                        <span className="mt-4 text-[14px] text-text-dark">For: {p.targetCustomer}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      <CtaBand title="Looking for something we do not list?" primaryLabel="Discuss Your Project" />
    </>
  );
}
