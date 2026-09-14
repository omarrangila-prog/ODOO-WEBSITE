import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCtaBar } from '@/components/layout/MobileCtaBar';
import { Analytics } from '@/components/seo/Analytics';
import { VisitorTracker } from '@/components/leadintel/VisitorTracker';
import { ConsentBanner } from '@/components/leadintel/ConsentBanner';
import { JsonLd } from '@/components/ui/JsonLd';
import {
  SITE_URL,
  OG_IMAGE,
  organizationSchema,
  websiteSchema,
} from '@/lib/seo';
import { company } from '@/data/company';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#07070b' },
    { media: '(prefers-color-scheme: light)', color: '#f3f1ea' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ODOOVATIONS | Software, AI Automation, Odoo & Digital',
    template: '%s | ODOOVATIONS',
  },
  description:
    'ODOOVATIONS builds custom software, AI automations, Odoo ERP systems, websites, apps, marketing campaigns, video and creative work for businesses in Pakistan and worldwide.',
  applicationName: company.name,
  authors: [{ name: company.name }],
  // Kept short and genuinely descriptive. Search engines ignore this tag; it
  // is here as human-readable metadata, not as a ranking attempt.
  keywords: [
    'custom software development Pakistan',
    'AI automation',
    'AI agents',
    'Odoo implementation Pakistan',
    'WhatsApp automation',
    'POS software',
    'web development Karachi',
    'digital marketing Pakistan',
    'video production and creative studio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: company.name,
    title: 'ODOOVATIONS | Software, AI Automation, Odoo & Digital',
    description:
      'One team for technology, automation, software, creative and growth. Karachi-based, serving Pakistan and international clients remotely.',
    images: [OG_IMAGE],
    locale: 'en_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ODOOVATIONS | Software, AI Automation, Odoo & Digital',
    description:
      'We build, automate and grow businesses. Software, AI, Odoo, web, marketing and creative under one team.',
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        {/* Global entity graph: Organization + WebSite only. LocalBusiness /
            ProfessionalService is scoped to the homepage, contact and Karachi
            pages (where it accurately represents the single physical office). */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-control focus:bg-[linear-gradient(100deg,#7C4DFF,#E947C6)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <Suspense fallback={null}>
          <VisitorTracker />
        </Suspense>
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
