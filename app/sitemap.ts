import type { MetadataRoute } from 'next';
import { SITE_URL, CONTENT_REVISED } from '@/lib/seo';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { caseStudies } from '@/data/caseStudies';
import { locations } from '@/data/locations';
import { resources } from '@/data/resources';
import { solutions } from '@/data/solutions';
import { publishedCaseStudies } from '@/data/case-study-model';
import { platformPages } from '@/data/platforms';
import { publishedProducts } from '@/data/products';
import { allLeaves } from '@/lib/catalogue/leaf';
import { families as catalogueFamilies, divisions as catalogueDivisions } from '@/data/catalogue/manifest';

export default function sitemap(): MetadataRoute.Sitemap {

  const staticRoutes = [
    { path: '/', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/solutions', priority: 0.9 },
    { path: '/industries', priority: 0.9 },
    { path: '/rapid-delivery', priority: 0.8 },
    { path: '/resources', priority: 0.7 },
    { path: '/case-studies', priority: 0.8 },
    { path: '/company/about', priority: 0.6 },
    { path: '/company/methodology', priority: 0.6 },
    { path: '/company/team', priority: 0.6 },
    { path: '/company/global-delivery', priority: 0.6 },
    { path: '/company/clients', priority: 0.7 },
    { path: '/company/pricing', priority: 0.7 },
    { path: '/faq', priority: 0.7 },
    { path: '/company/brand', priority: 0.5 },
    { path: '/services/ai-search-pricing', priority: 0.8 },
    { path: '/pricing', priority: 0.8 },
    { path: '/platforms', priority: 0.85 },
    { path: '/technologies', priority: 0.6 },
    { path: '/tools/operations-check', priority: 0.6 },
    { path: '/contact', priority: 0.8 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
  ];

  const serviceRoutes = [...services.map((s) => ({ path: s.href, priority: 0.8 })), ...allLeaves().map((l) => ({ path: l.route, priority: 0.7 })), ...catalogueFamilies.filter((f) => !services.some((s) => s.href === f.hub)).map((f) => ({ path: f.hub, priority: 0.75 })), ...catalogueDivisions.map((d) => ({ path: d.route, priority: 0.75 })), { path: '/demonstrations', priority: 0.6 }, { path: '/programmes', priority: 0.7 }, ...catalogueFamilies.map((f) => ({ path: f.demo.route, priority: 0.5 }))];
  const industryRoutes = industries.map((i) => ({ path: i.href, priority: 0.8 }));
  const caseRoutes = caseStudies.map((c) => ({
    path: `/case-studies/${c.slug}`,
    priority: 0.7,
  }));
  // Real project case studies: empty until one passes every publication check.
  const projectRoutes = publishedCaseStudies().map((r) => ({ path: `/projects/${r.slug}`, priority: 0.7 }));
  // Local SEO pages are high value.
  const locationRoutes = locations.map((l) => ({ path: l.href, priority: 0.85 }));
  const platformRoutes = platformPages.map((p) => ({ path: p.href, priority: 0.8 }));
  // Products appear only once they pass the publication gate (data/products.ts), index page included.
  const products = publishedProducts();
  const productRoutes = products.length
    ? [{ path: '/products', priority: 0.8 }, ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.7 }))]
    : [];
  const resourceRoutes = resources.map((r) => ({ path: r.href, priority: 0.6, updated: r.updated }));
  // Exact-intent solution landing pages are high value.
  const solutionRoutes = solutions.map((s) => ({ path: s.href, priority: 0.8 }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...caseRoutes,
    ...projectRoutes,
    ...locationRoutes,
    ...platformRoutes,
    ...productRoutes,
    ...resourceRoutes,
    ...solutionRoutes,
  ].map((r: { path: string; priority: number; updated?: string }) => ({
    url: `${SITE_URL}${r.path}`,
    // Guides carry their own reviewed date; everything else the date of the last content release.
    lastModified: r.updated ?? CONTENT_REVISED,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
