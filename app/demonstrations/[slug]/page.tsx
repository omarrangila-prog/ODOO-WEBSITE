import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { families } from '@/data/catalogue/manifest';
import { DemoPage } from '@/components/catalogue/DemoPage';

export const dynamicParams = false;

const bySlug = (slug: string) => families.find((f) => f.demo.route === `/demonstrations/${slug}`);

export function generateStaticParams() {
  return families.map((f) => ({ slug: f.demo.route.replace('/demonstrations/', '') }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = bySlug(params.slug);
  if (!f) return {};
  return buildMetadata({ title: `${f.demo.name}: sample work | ODOOVATIONS`, description: `ODOOVATIONS ${f.demo.name}: sample deliverables, with invented data, for our ${f.name.toLowerCase()} services. Not client work.`, path: f.demo.route });
}

export default function Page({ params }: { params: { slug: string } }) {
  const f = bySlug(params.slug);
  if (!f) notFound();
  return <DemoPage family={f} />;
}
