import Image from 'next/image';
import { cn } from '@/lib/utilities';

/**
 * The signature artwork as an inner-page hero backdrop. Every inner page used to
 * open on the same faint grid and purple blob, which made the whole site feel like
 * one page. This reuses the ribbon (one cached 70 KB image, already loaded by the
 * homepage) and crops, scales, flips and tilts it differently per variant, so
 * each page has its own composition drawn from the same material.
 *
 * It is faded out toward the left and the bottom so the headline and lede stay
 * clean, dimmed on phones, and drifts very slowly (CSS only, off for reduced
 * motion). Decorative: hidden from assistive technology.
 */
const variants = [
  { scale: 1.1, x: '0%', y: '0%', rot: 0, flipY: false },
  { scale: 1.3, x: '4%', y: '-4%', rot: 0, flipY: true },
  { scale: 1.75, x: '-6%', y: '8%', rot: 0, flipY: false },
  { scale: 1.45, x: '2%', y: '-14%', rot: -5, flipY: false },
  { scale: 1.2, x: '6%', y: '6%', rot: 4, flipY: true },
  { scale: 1.9, x: '-14%', y: '-4%', rot: -9, flipY: false },
] as const;

export function PageArt({ variant = 0, className }: { variant?: number; className?: string }) {
  const v = variants[Math.abs(variant) % variants.length] as (typeof variants)[number];
  return (
    <div aria-hidden="true" className={cn('page-art pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${v.x}, ${v.y}) rotate(${v.rot}deg) scale(${v.scale}) scaleY(${v.flipY ? -1 : 1})` }}
      >
        <Image
          src="/art/ribbon-wide.webp"
          alt=""
          fill
          loading="eager"
          unoptimized
          sizes="100vw"
          className="ribbon-drift object-cover object-right mix-blend-screen"
        />
      </div>
    </div>
  );
}
