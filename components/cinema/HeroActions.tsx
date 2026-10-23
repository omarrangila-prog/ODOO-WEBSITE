'use client';

import { ButtonLink } from '@/components/ui/Button';
import { track } from '@/lib/analytics';

/**
 * The hero's two actions. A client component only so the clicks can be
 * measured; the markup is plain links, so they work before hydration.
 *
 * The primary action scrolls to the enquiry form lower on this page. A plain
 * anchor is used on purpose: next/link's client-side navigation to a hash on the
 * current page does not reliably scroll, and a hash change here should not need
 * a route transition at all.
 */
export function HeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <a
        href="#enquiry"
        onClick={() => track('hero_primary_cta_click', { source: 'hero' })}
        className="group/btn relative inline-flex min-h-[52px] select-none items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-7 font-heading text-[15px] font-semibold tracking-tight text-[#050509] transition-colors duration-200 hover:bg-violet-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-bright focus-visible:ring-offset-2 focus-visible:ring-offset-midnight motion-reduce:transition-none"
      >
        Discuss Your Project
        <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 motion-reduce:transform-none">↗</span>
      </a>
      <ButtonLink
        href="/case-studies"
        variant="secondary"
        onClick={() => track('hero_secondary_cta_click', { source: 'hero' })}
      >
        Explore Our Work
      </ButtonLink>
    </div>
  );
}
