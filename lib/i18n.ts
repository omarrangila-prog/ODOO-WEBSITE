/**
 * LANGUAGES
 *
 * The site is in English today. This file is the single place that says which
 * languages exist, which are published, and how they are addressed, so adding a
 * language is a data change plus translated content, not a search through the
 * codebase.
 *
 * Rules this file enforces:
 *  - A locale is exposed only when `published` is true. An unpublished locale
 *    produces no hreflang tags, no switcher entry and no routes.
 *  - A locale becomes publishable only after its content has been written and
 *    reviewed by a person fluent in it. Machine translation alone is not a
 *    reason to set `published`.
 *  - Nothing here redirects a visitor by country or browser language. Visitors
 *    choose a language; they are never moved to one.
 *  - `dir` drives the document direction, so a right-to-left language flips the
 *    page without per-component work (Tailwind's `rtl:` variant and logical
 *    properties such as `ms-*` / `ps-*` follow `dir`).
 *
 * See docs/LANGUAGES.md for the steps to add one.
 */
export interface LocaleConfig {
  /** Short code used in the URL prefix and in this file. */
  code: string;
  /** Value for <html lang> and hreflang. Region-qualified where the audience is. */
  htmlLang: string;
  /** The language's own name, shown in a switcher. */
  label: string;
  dir: 'ltr' | 'rtl';
  /** URL prefix. The default language has none, so existing URLs never change. */
  pathPrefix: string;
  /** True only when reviewed content exists for every page that would be listed. */
  published: boolean;
}

export const locales: LocaleConfig[] = [
  { code: 'en', htmlLang: 'en-PK', label: 'English', dir: 'ltr', pathPrefix: '', published: true },
  // Prepared, not published: no reviewed Urdu content exists yet.
  { code: 'ur', htmlLang: 'ur-PK', label: 'اردو', dir: 'rtl', pathPrefix: '/ur', published: false },
];

export const defaultLocale = locales[0] as LocaleConfig;

export function publishedLocales(): LocaleConfig[] {
  return locales.filter((l) => l.published);
}

/**
 * hreflang alternates for a path, or undefined while there is only one
 * published language. A page with no alternatives should not announce any, and
 * a half-published language must never appear in search results.
 */
export function hreflangAlternates(path: string, siteUrl: string): Record<string, string> | undefined {
  const live = publishedLocales();
  if (live.length < 2) return undefined;
  const out: Record<string, string> = {};
  const tail = path === '/' ? '' : path;
  for (const l of live) out[l.htmlLang] = `${siteUrl}${l.pathPrefix}${tail}` || siteUrl;
  out['x-default'] = `${siteUrl}${tail}` || siteUrl;
  return out;
}
