import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { families } from '@/data/catalogue/manifest';
import { JsonLd } from '@/components/ui/JsonLd';
import { Hero, Band } from '@/components/ai-search/Layout';

const PATH = '/demonstrations';
const DESCRIPTION = 'Sample deliverables from every ODOOVATIONS service family, with invented data and labelled as samples. For real client projects, see our client work.';
export const metadata: Metadata = buildMetadata({ title: 'Sample Work and Demonstrations | ODOOVATIONS', description: DESCRIPTION, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Demonstrations', path: PATH },
];

export default function DemonstrationsIndex() {
  return (
    <>
      <JsonLd data={[webPageSchema('Demonstrations', PATH, DESCRIPTION), breadcrumbSchema(crumbs)]} />
      <Hero crumbs={crumbs} eyebrow="Sample work" title="Demonstrations" lede="A working demonstration for each service family, running in your browser on invented data, plus the sample deliverables we hand over. Real client projects are on a separate page and are never mixed with these." primary={{ label: 'See the families', href: '#families' }} secondary={{ label: 'Client work', href: '/case-studies' }} art={5} />
      <Band tone="graphite" id="families" title={`${families.length} service families`}>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {families.map((f) => (
            <li key={f.code} className="rounded-[18px] border border-line p-5">
              <Link href={f.demo.route} className="font-heading text-[18px] font-semibold text-white underline-offset-4 hover:underline">
                ODOOVATIONS {f.demo.name}
              </Link>
              <p className="mt-1 text-[13.5px] text-text-dark-muted">{f.name}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-text-dark-muted">{f.demo.purpose}.</p>
            </li>
          ))}
        </ul>
      </Band>
    </>
  );
}
