import Link from 'next/link';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utilities';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading font-medium rounded-full transition-all duration-200 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-bright focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none select-none tracking-tight';

const sizes: Record<Size, string> = {
  md: 'text-[15px] px-5 min-h-[48px]',
  lg: 'text-[15px] px-7 min-h-[52px]',
};

const variants: Record<Variant, string> = {
  // A clean white pill on the black canvas, as in the approved design's top-right action.
  // No gradient and no glow: the hairline-and-white language is the point.
  primary:
    'bg-white text-[#050509] hover:bg-violet-bright hover:text-[#050509] active:bg-violet motion-reduce:transition-none',
  secondary:
    'text-text-dark border border-white/[0.2] bg-transparent hover:border-violet-bright/70 hover:bg-white/[0.05]',
  ghost:
    'text-text-dark hover:bg-white/5',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; loading?: boolean };

type ButtonAsLink = CommonProps & { href: string; external?: boolean; onClick?: () => void };

export const Button = forwardRef<HTMLButtonElement, ButtonAsButton>(function Button(
  { variant = 'primary', size = 'lg', className, children, fullWidth, loading, disabled, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
});

export function ButtonLink({
  variant = 'primary',
  size = 'lg',
  className,
  children,
  fullWidth,
  href,
  external,
  onClick,
}: ButtonAsLink) {
  const classes = cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Small arrow that nudges on parent-button hover. Pair with Button/ButtonLink. */
export function ArrowNudge({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-[18px] w-[18px] transition-transform duration-200 ease-premium group-hover/btn:translate-x-1', className)}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
