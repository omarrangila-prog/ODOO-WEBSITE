/**
 * SINGLE SOURCE OF TRUTH for editable business information.
 *
 * Anything wrapped in REPLACE_WITH_* is an intentional placeholder that MUST
 * be updated before launch. See LAUNCH_CHECKLIST.md for the full list.
 *
 * Client-safe values (WhatsApp number, scheduling URL, analytics ids) are read
 * from NEXT_PUBLIC_* env vars where available so they can differ per deployment.
 */

export const PLACEHOLDER = {
  whatsapp: 'REPLACE_WITH_REAL_WHATSAPP_NUMBER',
} as const;

const envWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const envScheduling = process.env.NEXT_PUBLIC_SCHEDULING_URL;

export const company = {
  name: 'ODOOVATIONS',
  legalName: 'ODOOVATIONS',
  tagline: 'Innovate • Automate • Elevate',
  description:
    'ODOOVATIONS helps businesses implement, customise and connect Odoo systems around the way their operations actually work.',
  founded: 2019,

  // Contact — replace placeholders before launch
  email: 'odoovations@gmail.com',
  phoneDisplay: '0334 7037531',
  phoneInternational: '+92 334 7037531',
  phoneHref: 'tel:+923347037531',
  // WhatsApp: env var wins; falls back to the real number.
  whatsapp: envWhatsApp && envWhatsApp.length > 0 ? envWhatsApp : '923347037531',
  whatsappMessage:
    'Hello ODOOVATIONS, I would like to discuss how Odoo could improve our business workflow.',

  // Scheduling — empty means scheduling CTAs render as a WhatsApp fallback.
  schedulingUrl: envScheduling && envScheduling.length > 0 ? envScheduling : '',

  // Location / service regions — NAP must stay identical everywhere.
  address: {
    street: 'Office 604, Landmark Plaza',
    city: 'Karachi',
    region: 'Sindh',
    country: 'Pakistan',
    countryCode: 'PK',
    // Full one-line NAP address for consistency across the site & profiles.
    full: 'Office 604, Landmark Plaza, Karachi, Pakistan',
  },
  serviceRegions: [
    'Karachi',
    'Pakistan-wide',
    'International (remote delivery)',
  ],

  // Social — only links with real URLs are rendered.
  social: {
    linkedin: '', // REPLACE_WITH_REAL_LINKEDIN_URL
    facebook: '', // REPLACE_WITH_REAL_FACEBOOK_URL
    instagram: '', // REPLACE_WITH_REAL_INSTAGRAM_URL
    youtube: '', // REPLACE_WITH_REAL_YOUTUBE_URL
  },

  // Credibility flags — keep FALSE unless genuinely verified.
  odooOfficialPartner: false, // Do NOT set true without a verified partnership.
  certifications: [] as string[], // Add only verified certifications.

  // NOTE: No headline "50+ projects / 100% satisfaction" style stats are stored
  // or shown. Add only genuinely verified figures, and only where they render
  // with real supporting proof.

  logo: {
    // Text logo is used by default; swap in an SVG/PNG path when available.
    src: '/images/odoovations-logo.png',
    alt: 'ODOOVATIONS',
  },
} as const;

export type Company = typeof company;
