'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Wraps decorative motion so it only runs while it is on screen. It sets
 * `data-live` on its own element, and the `.mv` rules in globals.css start and
 * stop the animations from that attribute. The attribute is written directly to
 * the DOM, so scrolling past never re-renders anything.
 */
export function LiveOnScreen({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.live = entry?.isIntersecting ? 'true' : 'false';
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-live="false" className={className}>
      {children}
    </div>
  );
}
