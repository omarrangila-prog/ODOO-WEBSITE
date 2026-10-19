import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { ctas } from '@/data/ctas';
import { getPublishedCaseStudy, publishedCaseStudies } from '@/data/case-study-model';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectCaseStudy } from '@/components/work/ProjectCaseStudy';

/**
 * Detail pages for real projects. generateStaticParams yields only records
 * that pass isPublishable(), and dynamicParams is off, so a draft, an
 * awaiting-assets record or an unknown slug is a 404, never a thin page.
 * Today no record passes, so this route builds no pages and nothing about it
 * appears in the sitemap or in any link.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies().map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = getPublishedCaseStudy(params.slug);
  if (!r) return {};
  return buildMetadata({
    title: r.seo?.title ?? `${r.name} — Case Study | ODOOVATIONS`,
    description: r.seo?.description ?? r.overview ?? `${r.name}, a project delivered by ODOOVATIONS.`,
    path: `/projects/${r.slug}`,
  });
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const r = getPublishedCaseStudy(params.slug);
  if (!r) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our Work', path: '/case-studies' },
    { name: r.name, path: `/projects/${r.slug}` },
  ];

  return (
    <>
      <JsonLd data={[webPageSchema(r.name, `/projects/${r.slug}`, r.overview ?? r.name), breadcrumbSchema(crumbs)]} />
      <ProjectCaseStudy record={r} />
      <CtaBand
        title="Have a similar problem?"
        primaryLabel="Discuss Your Project"
        primaryHref={`/contact?from=project-${r.slug}#form`}
        secondaryLabel="Explore Our Work"
        secondaryHref={ctas.portfolio.href}
      />
    </>
  );
}
