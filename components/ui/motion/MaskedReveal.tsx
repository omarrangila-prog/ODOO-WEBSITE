'use client';

import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  /** Split into lines; each line masks up independently. Pass an array of nodes. */
  lines?: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /**
   * Above-the-fold content animates on mount; below-the-fold uses scroll-in.
   * Defaults to true so hero text is always revealed reliably.
   */
  immediate?: boolean;
}

/**
 * Masked text reveal — the animation is a PROGRESSIVE ENHANCEMENT. Text renders
 * visible (y:0) in SSR and without JS; the slide-up only plays once mounted, so
 * a failed/slow hydration can never leave the headline hidden.
 *
 * `immediate` mode additionally refuses to animate text the visitor has
 * already seen. On a server-rendered page hydration always lands after first
 * paint, so "mount, then start from y:110%" meant the headline appeared,
 * vanished, and slid back in — a visible flash and a layout shift on the LCP
 * element. If first-contentful-paint has already fired when we mount, the
 * text is left exactly where it is. Scroll-in (`immediate={false}`) reveals
 * are unaffected: they trigger before the element is in view.
 */
function alreadyPainted(): boolean {
  if (typeof performance === 'undefined' || !performance.getEntriesByType) return true;
  return performance.getEntriesByType('paint').some((e) => e.name === 'first-contentful-paint');
}

/**
 * Implemented with a CSS transition and one IntersectionObserver rather than
 * framer-motion. This component is used in 18 files, so it was what pulled the
 * ~120KB animation library onto nearly every route for a single slide-up;
 * the library stays in the chunks of the few components that genuinely need
 * springs, gestures or scroll-linked values. Easing, duration, stagger, line
 * structure and the already-painted guard are unchanged.
 */
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function MaskedReveal({
  children,
  lines,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger = 0.09,
  immediate = true,
}: Props) {
  // static  = text at rest (SSR, no-JS, reduced motion, already-seen hero text)
  // armed   = lines parked below their mask, waiting to play
  // shown   = lines transitioned to rest
  const [mode, setMode] = useState<'static' | 'armed' | 'shown'>('static');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Above-the-fold text that has already painted must stay put.
    if (prefersReducedMotion() || (immediate && alreadyPainted())) {
      setMode('static');
      return;
    }
    setMode('armed');
  }, [immediate]);

  useEffect(() => {
    if (mode !== 'armed') return;
    if (immediate) {
      // Two frames so the parked state is painted before the transition runs.
      let r2 = 0;
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setMode('shown'));
      });
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setMode('shown');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMode('shown');
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode, immediate]);

  const content = lines ?? [children];

  /**
   * Static (SSR, no-JS, reduced-motion, or already-seen hero text): text at
   * rest. Each line is still its own block so the layout is identical to the
   * animated branch — rendering the lines as bare inline spans put two
   * headline lines on one line as "SystemsThat". The leading space text node
   * is collapsed by CSS inside a block, so it is invisible, but it means
   * textContent reads "Systems That" for scrapers and retrieval systems that
   * do not honour block layout the way innerText does.
   */
  if (mode === 'static') {
    if (!lines) return <Tag className={className}>{children}</Tag>;
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {i > 0 && ' '}
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      {content.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          {i > 0 && ' '}
          <span
            className="block"
            style={{
              transform: mode === 'shown' ? 'translateY(0%)' : 'translateY(110%)',
              transition: `transform 800ms ${EASE} ${delay + i * stagger}s`,
              willChange: mode === 'shown' ? undefined : 'transform',
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
