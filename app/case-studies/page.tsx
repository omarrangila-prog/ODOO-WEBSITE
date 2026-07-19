import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CaseStudiesEditorial } from '@/components/home/CaseStudiesEditorial';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Our Work — Odoo Case Studies',
  description:
    'How businesses moved from disconnected operations to connected, controlled Odoo systems. Real operational improvement across textile and distribution.',
  path: '/case-studies',
});

export default function CaseStudiesIndex() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our Work', path: '/case-studies' },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="theme-light pt-32 sm:pt-40">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
        </div>
      </div>
      <CaseStudiesEditorial as="h1" />
      <CtaBand title="Could your operations run like this?" />
    </>
  );
}
