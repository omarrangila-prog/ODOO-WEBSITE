import { countryNamesForForm } from './countries';

/** Full country list — priority markets first, then A–Z. See data/countries.ts. */
export const countries = [...countryNamesForForm, 'Other'];

export const industryOptions = [
  'Manufacturing',
  'Textile & Apparel',
  'Distribution',
  'Wholesale',
  'Retail & E-commerce',
  'Pharmaceuticals',
  'Healthcare / Clinics / Hospitals',
  'Construction',
  'Professional Services',
  'Food & Hospitality',
  'Logistics',
  'Import / Export',
  'Education',
  'Real Estate',
  'Automotive',
  'Agency / Media',
  'Other',
];

export const companySizes = [
  '1–10 employees',
  '11–50 employees',
  '51–200 employees',
  '201–500 employees',
  '500+ employees',
];

/**
 * What the enquiry is about. Covers every capability division, not just Odoo —
 * a visitor should be able to find their need without guessing which of our
 * words for it we used.
 */
export const serviceOptions = [
  'AI / Automation',
  'Custom Software',
  'Odoo / ERP',
  'Website',
  'Mobile App',
  'Marketing',
  'Advertising',
  'Video',
  'Graphic Design',
  'Content',
  'WhatsApp Automation',
  'Business System',
  'Something Else',
  'Not sure yet',
];

export const contactMethods = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'call', label: 'Phone call' },
] as const;

/**
 * How urgently the client needs it. These are used to understand urgency and
 * route the enquiry — selecting "Today" is NOT a commitment from us that it can
 * be delivered today. Any delivery date is confirmed only after scope review.
 */
export const timelineOptions = [
  'Today',
  'Within 24 hours',
  '2–3 days',
  'This week',
  'This month',
  'Within 1–3 months',
  'Flexible / exploring',
];

export const budgetOptions = [
  'Not sure yet',
  'Small / starter scope',
  'Mid-size project',
  'Large / multi-module',
];
