/**
 * GLOBAL PROJECT FOOTPRINT
 *
 * Countries render on the site ONLY where `verified === true`. Until then
 * the global-delivery section says "Remote delivery worldwide" and shows no
 * count, no flags and no country list — a wall of unverified flags is a
 * claim, and we do not make claims we cannot evidence.
 *
 * The United States, Canada (Toronto), the UAE (Dubai), Turkey, Morocco and
 * South Africa were confirmed by ODOOVATIONS management on 2026-09-12 as
 * markets where the business has delivered client work. They are published
 * on that confirmation; `publicEvidence` records the source. Toronto is a
 * city in Canada, Dubai is an emirate in the UAE, and "Africa" is a
 * continent — none of those are separate entries.
 *
 * No country COUNT is published. The site names the markets and stops.
 */
export interface GlobalProject {
  countryCode: string; // ISO 3166-1 alpha-2
  countryName: string;
  city?: string;
  projectCount: number;
  categories: string[];
  verified: boolean;
  /** A case-study slug, client approval reference, or deployed URL. */
  publicEvidence?: string;
}

export const globalProjects: GlobalProject[] = [
  { countryCode: 'PK', countryName: 'Pakistan', city: 'Karachi', projectCount: 0, categories: [], verified: true, publicEvidence: 'Registered office — Office 604, Landmark Plaza, Karachi' },
  { countryCode: 'US', countryName: 'United States', projectCount: 0, categories: [], verified: true, publicEvidence: 'Confirmed by ODOOVATIONS management, 2026-09-12' },
  { countryCode: 'CA', countryName: 'Canada', city: 'Toronto', projectCount: 0, categories: [], verified: true, publicEvidence: 'Confirmed by ODOOVATIONS management, 2026-09-12' },
  { countryCode: 'AE', countryName: 'United Arab Emirates', city: 'Dubai', projectCount: 0, categories: [], verified: true, publicEvidence: 'Confirmed by ODOOVATIONS management, 2026-09-12' },
  { countryCode: 'TR', countryName: 'Turkey', projectCount: 0, categories: [], verified: true, publicEvidence: 'Confirmed by ODOOVATIONS management, 2026-09-12' },
  { countryCode: 'MA', countryName: 'Morocco', projectCount: 0, categories: [], verified: true, publicEvidence: 'Confirmed by ODOOVATIONS management, 2026-09-12' },
  { countryCode: 'ZA', countryName: 'South Africa', projectCount: 0, categories: [], verified: true, publicEvidence: 'Confirmed by ODOOVATIONS management, 2026-09-12' },
];

/** Only these may appear on the public site. */
export const verifiedCountries = globalProjects.filter((g) => g.verified);

/** True when there is enough verified international evidence to show a
    "projects across N markets" bar rather than the generic wording. */
export const hasVerifiedInternationalFootprint =
  verifiedCountries.filter((g) => g.countryCode !== 'PK').length > 0;
