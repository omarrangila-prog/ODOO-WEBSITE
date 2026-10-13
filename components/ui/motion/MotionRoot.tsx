'use client';

import { LazyMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default);

/**
 * Wrap a page's animated sections once. Components inside use `m` rather than
 * `motion`: `motion` carries every feature in the library (~34KB gzipped) in
 * whichever chunk imports it, while `m` is a bare element that takes its
 * features from here. `strict` makes a stray `motion` import inside the tree
 * throw in development instead of quietly re-bundling the whole library.
 *
 * Content is server-rendered at its resting state either way; only the motion
 * waits for the features to arrive.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
