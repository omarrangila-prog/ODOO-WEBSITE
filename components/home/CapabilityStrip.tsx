import Link from 'next/link';
import { capabilityStrip } from '@/data/divisions';

/**
 * Marquee of capabilities directly under the hero.
 *
 * Its job is the five-second read: whatever a visitor arrived looking for,
 * they should see the word for it here. The list is duplicated only for the
 * seamless scroll — the duplicate is aria-hidden so assistive technology and
 * crawlers see each capability exactly once.
 *
 * Motion is CSS-driven and pauses on hover. Reduced-motion is handled in CSS
 * too (`motion-reduce:` stops the marquee), so this is a server component —
 * it ships no JavaScript at all.
 */
export function CapabilityStrip() {
  return (
    <section
      className="theme-dark group relative overflow-hidden border-y border-line py-3"
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

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center">
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
            className="inline-flex min-h-[44px] items-center text-[14.5px] font-medium text-text-dark/60 transition-colors hover:text-text-dark"
          >
            {c}
          </Link>
          <span className="h-1 w-1 rounded-full bg-violet-bright/40" aria-hidden />
        </li>
      ))}
    </ul>
  );
}
