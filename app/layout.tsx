import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { CinemaFrame } from '@/components/layout/CinemaFrame';
import { ScrollReveal } from '@/components/cinema/ScrollReveal';
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

/*
 * Three faces, each with one job. Inter Tight sets the monumental headlines,
 * Inter sets running text, and Instrument Serif Italic is reserved for the
 * single expressive phrase per view ("by design."). Inter and Inter Tight are
 * variable fonts, so no weight list is needed and each is one file.
 */
const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#030307',
  colorScheme: 'dark',
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
    <html lang="en-PK" className={`${interTight.variable} ${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        {/* Global entity graph: Organization + WebSite only. LocalBusiness /
            ProfessionalService is scoped to the homepage, contact and Karachi
            pages (where it accurately represents the single physical office). */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-control focus:bg-[linear-gradient(100deg,#6a3df0,#8247f5)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <CinemaFrame />
        <ScrollReveal />
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
