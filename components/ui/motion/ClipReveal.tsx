'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utilities';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: 'left' | 'bottom';
}

/**
 * Image reveal — CSS-only, VISIBLE BY DEFAULT. A one-shot fade/scale plays on
 * mount via CSS animation (`.clip-reveal`), which cannot leave the image hidden
 * even if JS fails. Reduced-motion users get the final state instantly (handled
 * globally in globals.css). No JS scroll trigger, so images always render.
 */
export function ClipReveal({ children, className }: Props) {
  return <div className={cn('clip-reveal overflow-hidden', className)}>{children}</div>;
}
