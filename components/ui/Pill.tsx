import type { ReactNode } from 'react';
import { cn } from '@/lib/utilities';

export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: 'neutral' | 'violet' | 'green' | 'amber';
  className?: string;
}) {
  const tones = {
    neutral:
      'bg-white/[0.04] text-text-dark-muted border-line [.theme-light_&]:bg-black/[0.04] [.theme-light_&]:text-ink-muted [.theme-light_&]:border-line-light',
    violet: 'bg-violet/12 text-violet-bright border-violet/25',
    green: 'bg-green/12 text-green border-green/25',
    amber: 'bg-amber/12 text-amber border-amber/30',
  } as const;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-[0.01em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
