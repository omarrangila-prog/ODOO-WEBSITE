import Link from 'next/link';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { families, divisions, getFamily, type Family } from '@/data/catalogue/manifest';
import { familyIntro, divisionIntro } from '@/data/catalogue/hubs';
import { allLeaves, leafOffers, resolveRelated } from '@/lib/catalogue/leaf';
import { priceLabel } from '@/lib/catalogue/resolve';
import { canonicalRoute, merges } from '@/data/catalogue/routes';
import { briefs } from '@/data/catalogue/manifest';
import { JsonLd } from '@/components/ui/JsonLd';
import { CtaBand } from '@/components/ui/CtaBand';
import { Hero, Band } from '@/components/ai-search/Layout';

/** The pages in a family: built leaves with their starting price, plus merged briefs on established pages. */
export function familyItems(f: Family) {
  const leaves = allLeaves().filter((l) => l.brief.family === f.code);
  const items = leaves.map((l) => {
    const o = leafOffers(l);
    const first = o.find((x) => x.price !== null) ?? o[0]!;
    return { title: l.brief.title, href: l.route, text: l.content.definition, from: priceLabel(first) };
  });
  const merged = briefs
    .filter((b) => b.family === f.code && merges[b.id])
    .map((b) => ({ title: b.title, href: canonicalRoute(b), text: b.focus, from: '' }));
  return [...merged, ...items];
}

function ItemList({ items }: { items: ReturnType<typeof familyItems> }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((i) => (
        <li key={i.href} className="rounded-[18px] border border-line p-5">
          <Link href={i.href} className="font-heading text-[18px] font-semibold text-white underline-offset-4 hover:underline">
            {i.title}
          </Link>
          <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-text-dark-muted">{i.text}</p>
          {i.from && <p className="mt-3 text-[14px] text-text-dark">From {i.from.replace(/^From /, '')}</p>}
        </li>
      ))}
    </ul>
  );
}

export function FamilyHubPage({ family }: { family: Family }) {
  const intro = familyIntro[family.code]!;
  const division = divisions.find((d) => d.name === family.division)!;
  const items = familyItems(family);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: family.division, path: division.route },
    { name: family.name, path: family.hub },
  ];
  const description = `${intro.lede} ${items.length} services with stated packages. ${intro.boundary}`;
  return (
    <>
      <JsonLd data={[webPageSchema(family.name, family.hub, description), breadcrumbSchema(crumbs)]} />
      <Hero crumbs={crumbs} eyebrow={family.division} title={family.name} lede={intro.lede} primary={{ label: 'See the services', href: '#services' }} secondary={{ label: 'Compare prices', href: '/pricing' }} art={3} />
      <Band tone="graphite" id="services" title={`${items.length} services`} intro={intro.boundary}>
        <ItemList items={items} />
      </Band>
      {intro.existing && (
        <Band tone="dark" id="established" title="Related pages">
          <ul className="flex flex-wrap gap-3">
            {intro.existing.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[14.5px] text-text-dark-muted hover:border-line-strong hover:text-white">
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </Band>
      )}
      <CtaBand title={`Not sure which ${family.name.toLowerCase()} service fits?`} body="Describe what you need in a few lines. We reply with questions or a written scope; nothing is charged by asking." primaryLabel="Discuss your project" primaryHref={`/contact?interest=${encodeURIComponent(`${family.name}: not sure which service`)}#form`} />
    </>
  );
}

export function DivisionHubPage({ name }: { name: string }) {
  const division = divisions.find((d) => d.name === name)!;
  const fams = families.filter((f) => f.division === name);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Expertise', path: '/services' },
    { name, path: division.route },
  ];
  return (
    <>
      <JsonLd data={[webPageSchema(name, division.route, divisionIntro[name]!), breadcrumbSchema(crumbs)]} />
      <Hero crumbs={crumbs} eyebrow="Expertise" title={name} lede={divisionIntro[name]} primary={{ label: 'See the services', href: '#families' }} secondary={{ label: 'Compare prices', href: '/pricing' }} art={1} />
      <div id="families">
        {fams.map((f, i) => (
          <Band key={f.code} tone={i % 2 ? 'dark' : 'graphite'} id={f.code.toLowerCase()} title={<Link href={f.hub} className="underline-offset-4 hover:underline">{f.name}</Link>} intro={familyIntro[f.code]!.lede}>
            <ItemList items={familyItems(f).slice(0, 6)} />
            <p className="mt-6">
              <Link href={f.hub} className="font-semibold text-violet underline underline-offset-4 hover:text-white">
                All {familyItems(f).length} {f.name.toLowerCase()} services
              </Link>
            </p>
          </Band>
        ))}
      </div>
    </>
  );
}

export const familyByHub = (path: string) => families.find((f) => f.hub === path);
export const divisionBySlug = (slug: string) => divisions.find((d) => d.route === `/expertise/${slug}`);
export { getFamily, resolveRelated };
