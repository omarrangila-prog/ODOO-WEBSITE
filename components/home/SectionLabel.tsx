import type { ReactNode } from 'react';

/** The small numbered label above a section heading: "02 ── Evidence". The number is decoration. */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="band-eyebrow flex items-center gap-3">
      <span aria-hidden className="text-violet/80">{index}</span>
      <span aria-hidden className="h-px w-7 bg-violet/50" />
      {children}
    </p>
  );
}
