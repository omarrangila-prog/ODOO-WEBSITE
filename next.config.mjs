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

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1440, 1920],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
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
