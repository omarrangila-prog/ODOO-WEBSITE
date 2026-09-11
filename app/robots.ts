import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Private or non-indexable areas. Kept in one place so robots.txt and any
 * future noindex handling cannot drift apart.
 *
 * Note: robots.txt controls crawling, not indexing. Anything that must stay
 * out of the index needs a noindex directive as well — blocking a URL here
 * only prevents the crawler reading the page, not the URL being listed.
 */
const PRIVATE_PATHS = ['/api/', '/admin'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: the whole public site is crawlable.
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },

      /*
       * OpenAI's search crawler is named explicitly so a future tightening of
       * the wildcard rule cannot silently drop ODOOVATIONS out of ChatGPT
       * search results. It gets exactly the same access as everyone else —
       * the content served to it is identical to the content served to people.
       */
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
