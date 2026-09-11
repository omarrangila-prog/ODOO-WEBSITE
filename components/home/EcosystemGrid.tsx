import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { divisions } from '@/data/divisions';
import { cn } from '@/lib/utilities';

/**
 * The capability ecosystem, as a bento grid.
 *
 * Card size follows `division.weight`, so the three core engineering divisions
 * read as the largest commitments without the others looking like afterthoughts.
 * Each card carries the plain-language business outcome, which is the part a
 * non-technical visitor is actually scanning for.
 */
const span: Record<string, string> = {
  lg: 'md:col-span-3 lg:col-span-2 lg:row-span-2',
  md: 'md:col-span-3 lg:col-span-2',
  sm: 'md:col-span-6 lg:col-span-6',
};

export function EcosystemGrid() {
  return (
    <section id="ecosystem" className="theme-light bay-sm scroll-mt-24">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">The ecosystem</p>
          <h2 className="display-2">
            Seven capabilities. <span className="signal-text">One team.</span>
          </h2>
          <p className="lede mt-5">
            Most businesses end up managing a software house, an agency, a designer and a video
            editor who have never spoken to each other. These sit in one place, which is why the
            ad, the landing page and the system behind it agree with one another.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-6 lg:grid-cols-6">
          {divisions.map((d) => {
            const large = d.weight === 'lg';
            return (
              <Link
                key={d.id}
                href={d.href}
                className={cn(
                  'group relative flex flex-col justify-between overflow-hidden rounded-editorial border border-line-light bg-white/60 p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-violet/30 hover:shadow-panel-light sm:p-8',
                  span[d.weight],
                )}
              >
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-control bg-[linear-gradient(120deg,#7C4DFF,#E947C6)] text-white">
                    <d.icon className={large ? 'h-6 w-6' : 'h-5 w-5'} aria-hidden />
                  </span>

                  <h3
                    className={cn(
                      'mt-6 font-heading font-semibold leading-[1.12] tracking-[-0.025em] text-ink',
                      large ? 'text-[clamp(26px,3vw,38px)]' : 'text-[clamp(21px,2.2vw,26px)]',
                    )}
                  >
                    {d.label}
                  </h3>

                  <p
                    className={cn(
                      'mt-3 max-w-[46ch] leading-relaxed text-ink-muted',
                      large ? 'text-[17px]' : 'text-[15.5px]',
                    )}
                  >
                    {d.summary}
                  </p>

                  {/* Capability proof — only the large cards have room for it */}
                  {large && d.capabilities[0] && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {d.capabilities[0].items.slice(0, 5).map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line-light px-3 py-1 text-[12.5px] text-ink-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-line-light pt-5">
                  {/* The outcome is the payoff line — it slides in on hover on
                      pointer devices, and is simply always visible otherwise. */}
                  <span className="text-[14.5px] font-medium leading-snug text-ink/70 transition-colors group-hover:text-violet">
                    {d.outcome}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-ink/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet"
                    aria-hidden
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-[16px] text-ink-muted">
          Looking for a specific system rather than a capability?{' '}
          <Link href="/solutions" className="text-violet underline underline-offset-4">
            Browse the solution library
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
