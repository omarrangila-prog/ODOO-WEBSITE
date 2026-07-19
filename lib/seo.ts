import type { Metadata } from 'next';
import { company } from '@/data/company';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://www.odoovations.com';

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
      locale: 'en_US',
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

export function organizationSchema() {
  const socials = Object.values(company.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_URL}`,
    description: company.description,
    slogan: company.tagline,
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
      telephone: company.phoneDisplay,
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
    description: company.description,
    url: SITE_URL,
    email: company.email,
    telephone: company.phoneDisplay,
    image: `${SITE_URL}${OG_IMAGE.url}`, logo: `${SITE_URL}${LOGO_URL}`,
    priceRange: '$$',
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
    name: company.name,
    url: SITE_URL,
  };
}

export function webPageSchema(name: string, path: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
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
