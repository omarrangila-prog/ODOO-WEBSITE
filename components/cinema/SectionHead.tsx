import type { ReactNode } from 'react';
import { cn } from '@/lib/utilities';

/** The expressive phrase: Instrument Serif Italic in lavender. One per heading, at most. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="accent-serif">{children}</em>;
}

/**
 * Section opener in the reference's editorial language: a small numbered
 * marker, a monumental sans heading with one serif accent, and a quiet lede.
 * The number is decorative; the heading carries the meaning.
 */
export function SectionHead({
  index,
  label,
  title,
  lede,
  id,
  className,
  titleClassName,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={cn('max-w-[1000px]', className)}>
      <p className="hero-eyebrow flex items-center gap-3">
        <span aria-hidden className="text-violet/80">{index}</span>
        <span aria-hidden className="h-px w-7 bg-violet/50" />
        {label}
      </p>
      <h2 id={id} className={cn('section-title mt-5', titleClassName)}>
        {title}
      </h2>
      {lede && <p className="lede mt-6 max-w-[58ch]">{lede}</p>}
    </header>
  );
}
