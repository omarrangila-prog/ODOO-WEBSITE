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
 *
 * It reads no layout at load. Deciding what is "already on screen" used to call
 * getBoundingClientRect on every candidate, and each call can force the browser
 * to lay the page out. An IntersectionObserver reports the same information
 * without a forced layout.
 */
const SELECTOR = 'main :is(h2, h3, [data-reveal]), main :is(section, div) > ul > li, main [class*="rounded-editorial"]';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const marked: HTMLElement[] = [];
    let first: IntersectionObserver | null = null;
    let second: IntersectionObserver | null = null;
    let settle = 0;
    let onScroll: (() => void) | null = null;

    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
          (el) => !el.closest('.stage-section, [data-no-reveal], header, nav, details') && !el.classList.contains('reveal'),
        );
        const groups = new Map<Element, number>();
        const margin = '0px 0px -8% 0px';

        // Second pass: reveal a marked element when it is reached.
        second = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              (e.target as HTMLElement).classList.add('is-in');
              second?.unobserve(e.target);
            }
          },
          { rootMargin: margin, threshold: 0.05 },
        );

        // First pass: whatever is already inside the viewport is left alone; the rest is marked.
        first = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              const el = e.target as HTMLElement;
              first?.unobserve(el);
              if (e.isIntersecting) continue;
              // Only content below the fold is hidden. Content already scrolled past stays visible.
              if (e.boundingClientRect.bottom < 0) continue;
              const parent = el.parentElement as Element;
              const n = groups.get(parent) ?? 0;
              groups.set(parent, n + 1);
              el.style.setProperty('--rv', `${Math.min(n, 6) * 70}ms`);
              el.classList.add('reveal');
              marked.push(el);
              second?.observe(el);
            }
          },
          { rootMargin: margin, threshold: 0.05 },
        );
        for (const el of nodes) first.observe(el);
        root.classList.add('reveal-ready');

        /*
         * Safety net. IntersectionObserver only reports on rendered frames, so when frames are
         * slow, or a fast fling jumps past an element, that element can be skipped and would stay
         * hidden. Once scrolling settles, reveal anything in a section that is at or above the
         * bottom of the viewport. It asks about the section, not every element, so it stays cheap.
         */
        const sweep = () => {
          const line = window.innerHeight * 0.96;
          const sectionTop = new Map<Element, number>();
          for (const el of marked) {
            if (el.classList.contains('is-in')) continue;
            const sec = el.closest('section') ?? el.parentElement ?? el;
            let top = sectionTop.get(sec);
            if (top === undefined) {
              top = sec.getBoundingClientRect().top;
              sectionTop.set(sec, top);
            }
            if (top > line) continue; // the whole section is still below the viewport
            if (el.getBoundingClientRect().top < line) {
              el.classList.add('is-in');
              second?.unobserve(el);
            }
          }
        };
        onScroll = () => {
          window.clearTimeout(settle);
          settle = window.setTimeout(sweep, 140);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
      }),
    );

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      if (onScroll) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
      first?.disconnect();
      second?.disconnect();
      root.classList.remove('reveal-ready');
      for (const el of marked) el.classList.remove('reveal', 'is-in');
    };
  }, [pathname]);

  return null;
}
