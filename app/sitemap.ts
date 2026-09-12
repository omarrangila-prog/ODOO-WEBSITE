import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { caseStudies } from '@/data/caseStudies';
import { locations } from '@/data/locations';
import { resources } from '@/data/resources';
import { solutions } from '@/data/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
    { path: '/company/global-delivery', priority: 0.6 },
    { path: '/company/clients', priority: 0.7 },
    { path: '/company/pricing', priority: 0.7 },
    { path: '/faq', priority: 0.7 },
    { path: '/company/brand', priority: 0.5 },
    { path: '/contact', priority: 0.8 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
  ];

  const serviceRoutes = services.map((s) => ({ path: s.href, priority: 0.8 }));
  const industryRoutes = industries.map((i) => ({ path: i.href, priority: 0.8 }));
  const caseRoutes = caseStudies.map((c) => ({
    path: `/case-studies/${c.slug}`,
    priority: 0.7,
  }));
  // Local SEO pages are high value.
  const locationRoutes = locations.map((l) => ({ path: l.href, priority: 0.85 }));
  const resourceRoutes = resources.map((r) => ({ path: r.href, priority: 0.6 }));
  // Exact-intent solution landing pages are high value.
  const solutionRoutes = solutions.map((s) => ({ path: s.href, priority: 0.8 }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...caseRoutes,
    ...locationRoutes,
    ...resourceRoutes,
    ...solutionRoutes,
  ].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
