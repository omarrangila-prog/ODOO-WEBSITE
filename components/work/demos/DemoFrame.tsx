'use client';

import type { ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

/**
 * The window every working demonstration sits in.
 *
 * The badge and the note are not optional: these screens are built by ODOOVATIONS
 * with invented data to show how a kind of system behaves. They are never a
 * screenshot of a client's system and must not be mistaken for one.
 */
export function DemoFrame({
  title,
  onReset,
  children,
}: {
  title: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <figure className="m-0 overflow-hidden rounded-[20px] border border-line-strong bg-[#0d0b15] shadow-float">
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-white/[0.03] px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="text-[13px] font-medium text-text-dark">{title}</span>
        <span className="ml-auto inline-flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-amber/50 bg-amber/10 px-2.5 py-0.5 text-[11.5px] font-semibold text-amber">
            Demonstration &middot; sample data
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full border border-line px-3 text-[12.5px] text-text-dark-muted transition-colors hover:border-line-strong hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Reset
          </button>
        </span>
      </figcaption>
      <div>{children}</div>
      <p className="border-t border-line px-4 py-2.5 text-[12.5px] leading-snug text-text-dark-muted">
        Built by ODOOVATIONS with invented sample data to show how this kind of system works. It is not a screenshot of
        the client&rsquo;s system.
      </p>
    </figure>
  );
}

/** Shared control styles so the three demonstrations feel like one product family. */
export const demo = {
  tab: 'min-h-[44px] rounded-full border px-4 text-[14px] font-medium transition-colors',
  tabOn: 'border-violet-bright/60 bg-violet/[0.14] text-white',
  tabOff: 'border-line text-text-dark-muted hover:border-line-strong hover:text-white',
  btn: 'inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-5 text-[14px] font-semibold text-[#0a0812] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40',
  btnGhost:
    'inline-flex min-h-[44px] items-center justify-center rounded-full border border-line-strong px-5 text-[14px] font-medium text-text-dark transition-colors hover:border-violet-bright/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-40',
  chip: 'inline-flex min-h-[36px] items-center rounded-full border border-line px-3 text-[13px] text-text-dark-muted transition-colors hover:border-line-strong hover:text-white',
  label: 'text-[11.5px] font-semibold uppercase tracking-[0.14em] text-text-dark-muted',
  card: 'rounded-[14px] border border-line bg-white/[0.025] p-4',
} as const;
