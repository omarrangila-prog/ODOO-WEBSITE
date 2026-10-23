import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utilities';

/**
 * Brand lockup: the real ODOOVATIONS ring mark, keyed onto a transparent
 * background so it sits directly on the black canvas as in the approved design
 * (it used to sit on a white tile), beside a letter-spaced wordmark.
 *
 * No aria-label: the visible wordmark is the accessible name, and an
 * aria-label that differed from it would fail WCAG 2.5.3 (label in name). A
 * trailing sr-only "home" states the destination without contradicting what is
 * on screen.
 */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  /** Header mode: no tagline. The footer lockup keeps it. */
  compact?: boolean;
}) {
  return (
    <Link href="/" className={cn('group inline-flex min-h-[44px] items-center gap-3', className)}>
      <Image
        src="/images/odoovations-mark-clear.webp"
        alt=""
        aria-hidden
        width={72}
        height={72}
        priority
        className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_0_14px_rgba(130,71,245,0.55)]"
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[14px] font-medium uppercase tracking-[0.2em] text-text-dark sm:text-[15px]">
          ODOOVATIONS
        </span>
        {!compact && (
          <>
            {' '}
            <span className="mt-1.5 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.22em] text-text-dark-muted">
              Innovate • Automate • Elevate
            </span>
          </>
        )}
      </span>
      <span className="sr-only">home</span>
    </Link>
  );
}
