/**
 * The package a visitor chose on a service page, carried to the contact form as ?interest=… and on to the
 * notification email and CRM record. It arrives from a URL, so both the form and the API accept only a short
 * plain-text label and drop anything else.
 */
const INTEREST = /^[\p{L}\p{N} ,.()\-–—/&:+'’]{3,160}$/u;

export function cleanInterest(v: unknown): string {
  const s = String(v ?? '').trim();
  return INTEREST.test(s) ? s : '';
}

/** "Technical SEO — Growth (USD 1,200 one time)" */
export const interestLabel = (service: string, tier: string, price: string) => `${service} — ${tier} (${price})`;
