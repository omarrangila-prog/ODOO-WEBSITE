import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { Reveal } from '@/components/ui/Reveal';

const flow = [
  { n: '01', k: 'Connect', d: 'Bring sales, inventory, accounts and operations into one system.' },
  { n: '02', k: 'Automate', d: 'Remove repeated work, delays, errors and constant follow-ups.' },
  { n: '03', k: 'Control', d: 'Make faster decisions using live operational information.' },
];

export function Manifesto() {
  return (
    <section className="relative theme-light">
      {/* Curved architectural transition rising into the dark hero */}
      <div className="absolute inset-x-0 -top-px -translate-y-full" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-[60px] w-full sm:h-[110px]">
          <path d="M0 120 C 360 20 1080 20 1440 120 Z" fill="var(--ivory)" />
        </svg>
      </div>

      <div className="shell bay grid gap-14 lg:grid-cols-[5fr_6fr] lg:gap-16">
        {/* Left: large heading */}
        <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
          <p className="eyebrow mb-6">The Objective</p>
          <MaskedReveal
            immediate={false}
            as="h2"
            className="display-2"
            lines={[
              <span key="1">One System.</span>,
              <span key="2">Every Department.</span>,
              <span key="3" className="signal-text">Complete Visibility.</span>,
            ]}
          />
          <p className="lede mt-7 max-w-md">
            ODOOVATIONS is a Karachi-based Odoo implementation, custom development and
            business-automation company helping organisations across Pakistan connect sales,
            inventory, accounting, manufacturing, CRM and reporting in one reliable system.
          </p>
          <p className="lede mt-4 max-w-md">
            The point of Odoo is not more software&mdash;it&rsquo;s fewer disconnected tools. Here is
            what that looks like in practice.
          </p>
        </div>

        {/* Right: three large numbered stages with a connecting line */}
        <ol className="relative">
          <span className="absolute left-[38px] top-4 bottom-4 hidden w-px bg-line-light sm:block" aria-hidden />
          {flow.map((item, i) => (
            <Reveal key={item.k} delay={i * 0.08} as="li" className="relative flex gap-6 border-b border-line-light py-10 first:pt-0 last:border-b-0 last:pb-0 sm:gap-8">
              <span className="relative z-10 font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-ink/15">
                {item.n}
              </span>
              <div className="pt-1">
                <h3 className="display-3 font-semibold">{item.k}</h3>
                <p className="mt-3 max-w-md text-[17px] leading-relaxed text-ink-muted">{item.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
