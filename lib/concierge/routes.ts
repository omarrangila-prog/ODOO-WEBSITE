import sitemap from '@/app/sitemap';

/**
 * The pages the concierge may open: every path in the sitemap, plus the contact form anchor. The agent can
 * only ask for a path; the browser opens it only if it is on this list.
 */
export function conciergeRoutes(): string[] {
  const paths = new Set<string>();
  for (const e of sitemap()) {
    try {
      paths.add(new URL(e.url).pathname.replace(/\/$/, '') || '/');
    } catch {
      /* skip malformed entries */
    }
  }
  return [...paths].sort();
}
