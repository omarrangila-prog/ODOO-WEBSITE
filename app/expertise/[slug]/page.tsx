import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { divisions } from '@/data/catalogue/manifest';
import { divisionIntro } from '@/data/catalogue/hubs';
import { DivisionHubPage, divisionBySlug } from '@/components/catalogue/HubPage';

/** The eight division hubs from the master brief. Each lists its service families and their pages. */
export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((d) => ({ slug: d.route.replace('/expertise/', '') }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = divisionBySlug(params.slug);
  if (!d) return {};
  return buildMetadata({ title: `${d.name} services | ODOOVATIONS`, description: `${divisionIntro[d.name]} Services, packages and starting prices from ODOOVATIONS, Karachi.`, path: d.route });
}

export default function DivisionPage({ params }: { params: { slug: string } }) {
  const d = divisionBySlug(params.slug);
  if (!d) notFound();
  return <DivisionHubPage name={d.name} />;
}
