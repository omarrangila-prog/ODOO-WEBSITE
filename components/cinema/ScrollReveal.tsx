'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Gentle scroll reveal for the inner pages: headings and cards that are BELOW
 * the fold rise a little and fade in as they are reached, staggered within their
 * group. It is a progressive enhancement done entirely after hydration:
 *
 *  - Nothing is hidden in the server HTML, so scrapers, no-JS visitors and print
 *    see the full page.
 *  - Anything already on screen when the page loads is left alone, so there is no
 *    flash of content that appears and then vanishes.
 *  - Reduced motion skips it completely.
 *  - The homepage's own staged sections (.stage-section) animate themselves and
 *    are excluded.
 */
const SELECTOR = 'main :is(h2, h3, [data-reveal]), main :is(section, div) > ul > li, main [class*="rounded-editorial"]';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    let io: IntersectionObserver | null = null;
    const marked: HTMLElement[] = [];
    let settle = 0;
    let onScroll: (() => void) | null = null;

    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
          (el) => !el.closest('.stage-section, [data-no-reveal], header, nav, details') && !el.classList.contains('reveal'),
        );
        const fold = window.innerHeight * 0.92;
        const groups = new Map<Element, number>();
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              (e.target as HTMLElement).classList.add('is-in');
              io?.unobserve(e.target);
            }
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
        );
        for (const el of nodes) {
          if (el.getBoundingClientRect().top < fold) continue; // already visible: leave it alone
          const parent = el.parentElement as Element;
          const n = groups.get(parent) ?? 0;
          groups.set(parent, n + 1);
          el.style.setProperty('--rv', `${Math.min(n, 6) * 70}ms`);
          el.classList.add('reveal');
          marked.push(el);
          io.observe(el);
        }
        root.classList.add('reveal-ready');

        /*
         * Safety net. IntersectionObserver only reports on rendered frames, so when frames are
         * slow, or a fast fling jumps past an element, that element can be skipped and would stay
         * hidden. Once scrolling settles, reveal everything at or above the bottom of the
         * viewport: it is either on screen or already behind the reader.
         */
        const sweep = () => {
          const line = window.innerHeight * 0.96;
          for (const el of marked) {
            if (el.classList.contains('is-in')) continue;
            if (el.getBoundingClientRect().top < line) {
              el.classList.add('is-in');
              io?.unobserve(el);
            }
          }
        };
        onScroll = () => {
          window.clearTimeout(settle);
          settle = window.setTimeout(sweep, 140);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        sweep();
      }),
    );

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      if (onScroll) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
      io?.disconnect();
      root.classList.remove('reveal-ready');
      for (const el of marked) el.classList.remove('reveal', 'is-in');
    };
  }, [pathname]);

  return null;
}
