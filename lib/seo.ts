import type { Metadata } from 'next';
import { company } from '@/data/company';
import { verifiedCountries } from '@/data/global-projects';

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

export const OG_IMAGE = {
  url: '/images/odoovations-og-image.webp',
  width: 1200,
  height: 630,
  alt: 'ODOOVATIONS — Odoo implementation and custom development in Pakistan',
};

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
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      url,
      siteName: company.name,
      title,
      description,
      images: [OG_IMAGE],
      locale: 'en_PK',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
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
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { '@type': 'Organization', name: company.name, url: SITE_URL },
    areaServed: ['Pakistan', 'Worldwide'],
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
