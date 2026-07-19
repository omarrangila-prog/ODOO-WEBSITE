import { AlertTriangle } from 'lucide-react';

/**
 * Clearly marks unverified placeholder content. Never ships fake data as real.
 */
export function DevPlaceholder({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber">
      <AlertTriangle className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}
