import Link from 'next/link';
import { ctas } from '@/data/ctas';
import { VioletRibbonScene } from './VioletRibbonScene';
import { Accent } from './SectionHead';

/**
 * Section 10. The page ends as confidently as it begins: the signature artwork
 * returns, flipped, as a static image with a very slow drift (no second
 * canvas), behind a single closing statement and two editorial links.
 */
export function FinalContact() {
  return (
    <section
      aria-labelledby="final-h"
      className="stage-section relative isolate flex min-h-[92svh] items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 78% 62%, rgba(70,44,200,0.22), transparent 70%)' }}
      />
      {/* Flipped, so it is a variation. On phones it keeps to the lower part (its fade points the other way because the flip reverses the mask). */}
      <VioletRibbonScene
        animated={false}
        className="-z-10 -scale-y-100 opacity-80 !inset-x-0 !top-auto bottom-0 h-[58%] [mask-image:linear-gradient(to_top,transparent,#000_40%)] lg:!inset-0 lg:h-auto lg:[mask-image:none]"
      />

      <div className="stage-inner">
        <p className="hero-eyebrow flex items-center gap-3">
          <span aria-hidden className="text-violet/80">10</span>
          <span aria-hidden className="h-px w-7 bg-violet/50" />
          Start
        </p>
        <h2 id="final-h" className="section-title mt-6 !text-[clamp(44px,8.4vw,150px)] !leading-[0.92]">
          Let’s build <br />
          what comes <Accent>next.</Accent>
        </h2>
        <p className="lede mt-8 max-w-[44ch] !text-[clamp(17px,1.5vw,24px)] !font-light">
          Tell us the challenge. We’ll help engineer the next step.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-[clamp(24px,3.2vw,56px)] gap-y-1">
          <Link href={ctas.general.href} className="link-editorial">
            Start a conversation <span aria-hidden className="arrow text-[0.85em]">↗</span>
          </Link>
          <Link href="/services" className="link-editorial">
            Explore our expertise <span aria-hidden className="arrow text-[0.85em]">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
