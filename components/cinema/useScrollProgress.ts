'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Progress through a tall "sticky stage" section, 0 at the moment its top
 * reaches the top of the viewport and 1 when its bottom reaches the bottom of
 * the viewport. It reports through a callback rather than React state, so a
 * scroll-linked effect updates the DOM directly and the component never
 * re-renders while the visitor scrolls.
 *
 * Reads happen at most once per animation frame, the listener is passive, and
 * nothing runs while the section is far off-screen. Reduced motion is the
 * caller's decision; this hook only measures.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T>,
  onProgress: (p: number) => void,
  /** 'sticky': tall stage that pins (default). 'through': an ordinary tall section being read. */
  mode: 'sticky' | 'through' = 'sticky',
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let near = true;

    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      let p: number;
      if (mode === 'through') {
        // 0 when the section top reaches 70% down the viewport, 1 when its BOTTOM does,
        // so by the time the last row is being read the whole thing has played.
        const line = window.innerHeight * 0.7;
        p = Math.min(1, Math.max(0, (line - r.top) / r.height));
      } else {
        const span = r.height - window.innerHeight;
        p = span <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / span));
      }
      onProgress(p);
    };
    const schedule = () => {
      if (!near || raf) return;
      raf = requestAnimationFrame(measure);
    };

    const io = new IntersectionObserver(
      (es) => {
        near = es.some((e) => e.isIntersecting);
        if (near) schedule();
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, onProgress, mode]);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
