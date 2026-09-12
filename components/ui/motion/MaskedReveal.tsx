'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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

export function MaskedReveal({
  children,
  lines,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger = 0.09,
  immediate = true,
}: Props) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<'static' | 'animate'>('static');
  useEffect(() => {
    // Above-the-fold text that has already painted must stay put.
    setMode(immediate && alreadyPainted() ? 'static' : 'animate');
  }, [immediate]);

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
  if (reduce || mode === 'static') {
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

  const trigger = immediate
    ? { initial: { y: '110%' }, animate: { y: '0%' } }
    : { initial: { y: '110%' }, whileInView: { y: '0%' }, viewport: { once: true, amount: 0.2 } };

  return (
    <Tag className={className}>
      {content.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          {i > 0 && ' '}
          <motion.span
            className="block"
            {...trigger}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
