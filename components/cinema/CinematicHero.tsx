import Link from 'next/link';
import { ctas } from '@/data/ctas';
import { VioletRibbonScene } from './VioletRibbonScene';
import { HeroMarkers } from './HeroMarkers';

/**
 * The homepage hero, built from the approved design: a deep-black stage, the
 * oversized sans headline with its expressive lavender italic phrase, quiet
 * editorial links, and the sculptural violet ribbon behind everything.
 *
 * Deliberately no dashboard, no card grid and no buttons. The headline is one
 * real <h1> of real text; the prefix is visually hidden but keeps the brand
 * name in the page's primary heading for search and assistive technology.
 */
export function CinematicHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-midnight"
    >
      {/* Atmosphere: a soft ultraviolet bloom behind the sculpture. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 52% 62% at 76% 50%, rgba(70,44,200,0.20), transparent 70%), radial-gradient(ellipse 30% 40% at 96% 4%, rgba(120,90,255,0.16), transparent 70%)',
        }}
      />
      {/* Phones: the artwork owns the lower half and fades in toward the top, so it never sits behind the copy. */}
      <VioletRibbonScene className="-z-10 !inset-x-0 !top-auto bottom-0 h-[54%] [mask-image:linear-gradient(to_bottom,transparent,#000_36%)] lg:!inset-0 lg:h-auto lg:[mask-image:none]" />

      <div
        className="relative flex flex-1 flex-col"
        style={{
          paddingInline: 'calc(var(--frame-inset) + clamp(20px, 4.6vw, 88px))',
          paddingTop: 'calc(var(--frame-inset) + clamp(84px, 11vh, 120px))',
          paddingBottom: 'calc(var(--frame-inset) + clamp(10px, 2.4vh, 28px))',
        }}
      >
        <div className="flex flex-1 flex-col justify-start pb-[2vh] lg:justify-center">
          <p className="hero-eyebrow cin-rise" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span className="hidden sm:inline">ODOOVATIONS <span aria-hidden className="mx-2 opacity-60">/</span></span>Business Engineering Studio
          </p>

          <h1 id="hero-title" className="hero-title mt-[clamp(14px,2.2vh,26px)]">
            <span className="sr-only">ODOOVATIONS: </span>
            <span className="line cin-rise" style={{ '--d': '120ms' } as React.CSSProperties}>Business,</span>{' '}
            <span className="line cin-rise" style={{ '--d': '220ms' } as React.CSSProperties}>Reimagined.</span>{' '}
            <span className="hero-italic cin-rise" style={{ '--d': '380ms' } as React.CSSProperties}>by design.</span>
          </h1>

          <p
            className="hero-sub cin-rise mt-[clamp(18px,3.2vh,36px)] max-w-[34ch] sm:max-w-[40ch]"
            style={{ '--d': '560ms' } as React.CSSProperties}
          >
            We build software, ERP, and intelligent systems for the way business actually works.
          </p>

          <div
            className="cin-rise mt-[clamp(22px,4.4vh,52px)] flex flex-wrap items-center gap-x-[clamp(24px,3.2vw,56px)] gap-y-1"
            style={{ '--d': '700ms' } as React.CSSProperties}
          >
            <Link href="/case-studies" className="link-editorial">
              Discover our work <span aria-hidden className="arrow text-[0.85em]">↗</span>
            </Link>
            <Link href={ctas.general.href} className="link-editorial">
              Start a conversation <span aria-hidden className="arrow text-[0.85em]">↗</span>
            </Link>
          </div>
        </div>

        <div className="cin-fade" style={{ '--d': '900ms' } as React.CSSProperties}>
          <HeroMarkers />
        </div>
      </div>
    </section>
  );
}
