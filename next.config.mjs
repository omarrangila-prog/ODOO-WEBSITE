/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

// Preview and development deployments must never be indexed; only the production deployment may be.
// Vercel sets VERCEL_ENV to "production", "preview" or "development". The header (not robots.txt) is
// used on purpose: a crawler blocked by robots.txt cannot see a noindex, whereas a header is read.
const notProduction = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== 'production';
const previewHeaders = notProduction ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : [];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1440, 1920],
  },
  async headers() {
    return [{ source: '/:path*', headers: [...securityHeaders, ...previewHeaders] }];
  },
  async redirects() {
    return [
      // Host consolidation: www is a duplicate of the canonical apex host.
      // One permanent hop, path preserved, so Google indexes a single origin.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.odoovations.com' }],
        destination: 'https://odoovations.com/:path*',
        permanent: true,
      },
      // AI Search was published for a day as one service page and one guide; both were consolidated
      // into the AI Search hub and the AEO vs GEO vs SEO guide, which now answer those questions.
      { source: '/services/aeo-geo-ai-search-optimisation', destination: '/services/ai-search-optimization', permanent: true },
      // The catalogue brief proposed these two guides; the existing guides already answer them (audit/catalogue/routes).
      { source: '/resources/aeo-geo-service-scope', destination: '/resources/aeo-vs-geo-vs-seo', permanent: true },
      { source: '/resources/measure-ai-search-visibility', destination: '/resources/how-to-measure-ai-search-visibility', permanent: true },
      { source: '/resources/what-are-aeo-and-geo', destination: '/resources/aeo-vs-geo-vs-seo', permanent: true },
      // Consolidate the alternate integration slug onto the canonical one.
      {
        source: '/services/odoo-integration-services',
        destination: '/services/odoo-integration',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
