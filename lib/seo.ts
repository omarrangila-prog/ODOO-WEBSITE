import type { Metadata } from 'next';
import { company } from '@/data/company';
import { verifiedCountries } from '@/data/global-projects';
import { services } from '@/data/services';
import { hreflangAlternates } from './i18n';

/**
 * Canonical production origin.
 *
 * Uses `||` rather than `??` deliberately: an env var that is declared but
 * left EMPTY is a real and easy mistake, and `??` would happily accept "" and
 * emit broken canonicals, Open Graph URLs and sitemap entries across the whole
 * site. An empty value must fall back to the known canonical host.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://odoovations.com';

/**
 * The date the site's content was last revised, for the sitemap's lastmod. Bump it in a
 * release that changes page content. A lastmod that changes on every build (the old
 * `new Date()`) tells search engines nothing, so they learn to ignore it.
 */
export const CONTENT_REVISED = '2026-10-29';

/** IndexNow key (Bing, Yandex, Seznam, Naver). The same value is served at /<key>.txt. */
export const INDEXNOW_KEY = 'ab1171d1534e0cc4a07f1c2fe01d1e40';

export const OG_IMAGE = {
  url: '/images/odoovations-og-image.webp',
  width: 1200,
  height: 630,
  alt: 'ODOOVATIONS — Odoo implementation and custom development in Pakistan',
};

/** A per-page share image: the page title drawn on the brand canvas by app/og (PNG). */
export function ogImage(title: string, kicker?: string) {
  const sp = new URLSearchParams({ title });
  if (kicker) sp.set('kicker', kicker);
  return { url: `/og?${sp.toString()}`, width: 1200, height: 630, alt: title.replace(/\s*[|—–-]\s*ODOOVATIONS\s*$/i, '') };
}

/** Dedicated square company logo for structured data (publisher/Organization). */
export const LOGO_URL = '/images/odoovations-logo.png';

interface BuildMetaArgs {
  title: string;
  description: string;
  path: string; // e.g. '/services/odoo-implementation-pakistan'
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  noindex,
}: BuildMetaArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  // Titles passed here are complete page titles; mark absolute so the root
  // layout's "%s | ODOOVATIONS" template does not double-append the brand.
  const alreadyBranded = /ODOOVATIONS/i.test(title);
  return {
    title: alreadyBranded ? { absolute: title } : title,
    description,
    alternates: { canonical: url, ...(hreflangAlternates(path, SITE_URL) ? { languages: hreflangAlternates(path, SITE_URL) } : {}) },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      url,
      siteName: company.name,
      title,
      description,
      images: [ogImage(title)],
      locale: 'en_PK',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage(title).url],
    },
  };
}

/* ---------------------------------------------------------------------
   Structured data (JSON-LD) builders
   --------------------------------------------------------------------- */

/**
 * Genuine, understandable variations of the official name only.
 * These are real casing/spacing forms people actually write — not a typo dump.
 * The official spelling is always ODOOVATIONS.
 */
export const BRAND_ALTERNATE_NAMES = ['Odoovations', 'OdooVations', 'Odoo Vations'];

export function organizationSchema() {
  const socials = Object.values(company.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    alternateName: BRAND_ALTERNATE_NAMES,
    legalName: company.legalName,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}${LOGO_URL}`,
      contentUrl: `${SITE_URL}${LOGO_URL}`,
      caption: company.name,
    },
    image: { '@id': `${SITE_URL}/#logo` },
    description: company.description,
    slogan: company.tagline,
    email: company.email,
    telephone: company.phoneInternational,
    // ODOOVATIONS operates within the Kausar Innovations group.
    parentOrganization: { '@type': 'Organization', name: 'Kausar Innovations' },
    areaServed: verifiedCountries.map((c) => ({ '@type': 'Country', name: c.countryName })),
    ...(socials.length ? { sameAs: socials } : {}),
    // What the company works on, for entity understanding. Drawn from the service list, plus the
    // platforms it builds on; no certification or partnership is implied by naming them.
    knowsAbout: [
      ...services.map((s) => s.navLabel),
      'Odoo ERP',
      'Shopify',
      'WooCommerce',
      'WordPress',
      'QuickBooks integration',
      'WhatsApp Business Platform',
      'AI agents',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', '@id': `${SITE_URL}${s.href}#service`, name: s.title, url: `${SITE_URL}${s.href}` },
      })),
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: company.phoneInternational,
      email: company.email,
      areaServed: ['PK', 'Worldwide'],
      availableLanguage: ['English', 'Urdu'],
    },
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: company.name,
    alternateName: BRAND_ALTERNATE_NAMES,
    description: company.description,
    url: `${SITE_URL}/`,
    email: company.email,
    telephone: company.phoneInternational,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    image: `${SITE_URL}${OG_IMAGE.url}`,
    logo: `${SITE_URL}${LOGO_URL}`,
    areaServed: [
      { '@type': 'City', name: 'Karachi' },
      { '@type': 'Country', name: 'Pakistan' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: company.name,
    alternateName: BRAND_ALTERNATE_NAMES,
    url: `${SITE_URL}/`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-PK',
  };
}

export function webPageSchema(name: string, path: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${path}#webpage`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-PK',
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${path}`,
    // By reference, so every service page attaches to the one Organization node in the layout.
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Place', name: 'Worldwide (remote delivery)' },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
