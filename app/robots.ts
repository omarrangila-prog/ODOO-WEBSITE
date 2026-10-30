import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Private or non-indexable areas. Kept in one place so robots.txt and any
 * future noindex handling cannot drift apart.
 *
 * Note: robots.txt controls crawling, not indexing. Anything that must stay
 * out of the index needs a noindex directive as well. Blocking a URL here
 * only prevents the crawler reading the page, not the URL being listed.
 */
const PRIVATE_PATHS = ['/api/', '/admin'];

/**
 * Crawlers that fetch pages so an assistant or search product can show or cite them.
 * Blocking one of these can remove the site from that product's answers.
 *  - search indexes: Googlebot, Bingbot (Bing's index also feeds ChatGPT search and Copilot),
 *    DuckDuckBot, Applebot;
 *  - AI search and user-requested fetches: OAI-SearchBot and ChatGPT-User (OpenAI),
 *    Claude-SearchBot and Claude-User (Anthropic), PerplexityBot and Perplexity-User, DuckAssistBot.
 */
const SEARCH_AGENTS = [
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  'Applebot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'DuckAssistBot',
];

/**
 * Crawlers whose stated purpose is collecting content for model training.
 *
 * This is a SEPARATE decision from search. The providers publish separate crawlers for each and say
 * each setting is independent (for example, OpenAI documents that blocking GPTBot does not by itself
 * remove a site from ChatGPT search, which uses OAI-SearchBot). The site has always allowed these
 * through the wildcard rule, and naming them here keeps that choice unchanged and visible. To opt out
 * of training only, move a name into a `disallow: '/'` rule; search access is unaffected.
 *  - GPTBot (OpenAI), ClaudeBot (Anthropic), Google-Extended (limits use for AI training and grounding
 *    in some other Google systems; it is not a search control), Applebot-Extended, CCBot (Common Crawl).
 * The `*` rule below already applies to every crawler not listed, so providers can be added or removed
 * without changing who else may read the site.
 */
const TRAINING_AGENTS = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: the whole public site is crawlable.
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: SEARCH_AGENTS, allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: TRAINING_AGENTS, allow: '/', disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
