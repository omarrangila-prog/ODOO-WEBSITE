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

/**
 * Search engines and AI answer engines, named one by one.
 *
 * The wildcard rule already lets every one of them in. They are listed anyway so a
 * later tightening of the wildcard cannot silently drop ODOOVATIONS out of an answer
 * engine, and so the intent is on record: being read, quoted and linked by search and
 * AI assistants is the point of the site. Every agent gets exactly the content people
 * get, and the same private paths are closed to all of them.
 *
 *  - search indexes: Googlebot, Bingbot (Bing also feeds ChatGPT search and Copilot),
 *    DuckDuckBot, Applebot;
 *  - AI search and on-demand fetchers: OAI-SearchBot and ChatGPT-User (OpenAI),
 *    Claude-SearchBot and Claude-User (Anthropic), PerplexityBot and Perplexity-User,
 *    DuckAssistBot;
 *  - model-training crawlers: GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
 *    CCBot (Common Crawl). Allowing them is a business choice: it lets the models
 *    themselves learn who ODOOVATIONS is. Remove a line to opt out of that one.
 */
const AGENTS = [
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
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: the whole public site is crawlable.
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      { userAgent: AGENTS, allow: '/', disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
