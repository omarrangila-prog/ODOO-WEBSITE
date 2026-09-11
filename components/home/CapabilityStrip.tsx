'use client';

import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { capabilityStrip } from '@/data/divisions';

/**
 * Marquee of capabilities directly under the hero.
 *
 * Its job is the five-second read: whatever a visitor arrived looking for,
 * they should see the word for it here. The list is duplicated only for the
 * seamless scroll — the duplicate is aria-hidden so assistive technology and
 * crawlers see each capability exactly once.
 *
 * Motion is CSS-driven and pauses on hover; when the visitor prefers reduced
 * motion the strip renders as a static, wrapping list instead.
 */
export function CapabilityStrip() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className="theme-dark border-y border-line py-6" aria-label="What we do">
        <ul className="shell flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {capabilityStrip.map((c) => (
            <li key={c} className="text-[14px] font-medium text-text-dark/70">
              {c}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      className="theme-dark group relative overflow-hidden border-y border-line py-6"
      aria-label="What we do"
    >
      {/* Edge fades so items enter and leave rather than being cut off */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(90deg,var(--midnight),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(270deg,var(--midnight),transparent)]"
        aria-hidden
      />

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {capabilityStrip.map((c) => (
        <li key={c} className="flex items-center gap-x-10 whitespace-nowrap pr-10">
          <Link
            href="/services"
            tabIndex={ariaHidden ? -1 : undefined}
            className="text-[14.5px] font-medium text-text-dark/60 transition-colors hover:text-text-dark"
          >
            {c}
          </Link>
          <span className="h-1 w-1 rounded-full bg-violet-bright/40" aria-hidden />
        </li>
      ))}
    </ul>
  );
}
