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
 */
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const content = lines ?? [children];

  // Static (SSR, no-JS, reduced-motion, or before mount): show text at rest.
  if (reduce || !mounted) {
    return <Tag className={className}>{lines ? lines : children}</Tag>;
  }

  const trigger = immediate
    ? { initial: { y: '110%' }, animate: { y: '0%' } }
    : { initial: { y: '110%' }, whileInView: { y: '0%' }, viewport: { once: true, amount: 0.2 } };

  return (
    <Tag className={className}>
      {content.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
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
