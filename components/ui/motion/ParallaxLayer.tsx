'use client';

import { useRef, type ReactNode } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utilities';

interface Props {
  children: ReactNode;
  className?: string;
  /** vertical travel in px across the scroll of the section */
  offset?: number;
}

/** Scroll-linked vertical parallax. Subtle by default. Reduced-motion static. */
export function ParallaxLayer({ children, className, offset = 40 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <m.div ref={ref} style={reduce ? undefined : { y }} className={cn(className)}>
      {children}
    </m.div>
  );
}
