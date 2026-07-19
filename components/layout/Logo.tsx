import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utilities';

/**
 * Brand lockup: the real ODOOVATIONS ring mark (cropped from the supplied logo)
 * on a subtle light plate so it reads cleanly on the dark header, paired with a
 * crisp text wordmark that stays sharp at any size.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ODOOVATIONS — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span
        aria-hidden
        className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px] border border-line-strong bg-white ring-1 ring-inset ring-black/5"
      >
        {/* Clean, pre-cropped ring mark. */}
        <Image
          src="/images/odoovations-mark.png"
          alt=""
          width={72}
          height={72}
          className="h-[26px] w-[26px] object-contain"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[16px] font-bold tracking-tight text-text-dark [.theme-light_&]:text-ink">
          ODOOVATIONS
        </span>
        <span className="mt-1 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-text-dark-muted [.theme-light_&]:text-ink-muted">
          Innovate • Automate • Elevate
        </span>
      </span>
    </Link>
  );
}
