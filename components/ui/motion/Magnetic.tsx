'use client';

import { useRef, type ReactNode } from 'react';
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Magnetic wrapper — the element is gently pulled toward the cursor and springs
 * back on leave. Disabled for reduced motion and coarse (touch) pointers.
 */
export function Magnetic({ children, className, strength = 0.35 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x: sx, y: sy }}
      className={className}
    >
      {children}
    </m.span>
  );
}
