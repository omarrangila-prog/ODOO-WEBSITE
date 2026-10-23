import Link from 'next/link';
import { platformGroups, platformEntries, platformNotice } from '@/data/platforms';
import { SectionLabel } from './SectionLabel';
import { LiveOnScreen } from './LiveOnScreen';

/**
 * Homepage section 5: the tools your business already uses, grouped by what
 * you are trying to do with them.
 *
 * Names are set as plain text. No official logos are used, because a row of
 * vendor logos reads as a partnership and none is claimed. Platforms with a
 * dedicated page of their own link to it; the rest link to the service page
 * that covers them. The notice under the grid says what the names do and do
 * not mean.
 *
 * Each column starts on a dashed line whose dashes drift from left to right,
 * so the five groups read as paths into one set of systems. The drift is CSS
 * only, runs while the section is on screen (see `.mv` in globals.css), and is
 * off for reduced motion.
 */
export function PlatformsSection() {
  return (
    <section aria-labelledby="platforms-h" className="band">
      <div className="band-inner">
        <SectionLabel index="05">Platforms &amp; integrations</SectionLabel>
        <h2 id="platforms-h" className="band-title mt-4 max-w-[24ch]">
          Built to work with the systems you already run.
        </h2>
        <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-text-dark-muted">
          Grouped by what you are trying to do. Where a platform has its own page, it opens there.
        </p>

        <LiveOnScreen className="mv mt-10">
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {platformGroups.map((g) => {
              const items = platformEntries.filter((e) => e.group === g.id);
              return (
                <div key={g.id}>
                  <div aria-hidden className="mv-path relative mb-5 h-px">
                    <span className="absolute -left-px -top-[3px] h-[7px] w-[7px] rounded-full bg-violet-bright" />
                  </div>
                  <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-white">{g.label}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-text-dark-muted">{g.question}</p>
                  <ul className="mt-5 space-y-4">
                    {items.map((e) => (
                      <li key={e.id}>
                        <Link href={e.href} className="no-underline group block">
                          <span className="inline-flex items-center gap-2 font-heading text-[17px] font-semibold text-white">
                            {e.name}
                            <span aria-hidden className="text-[14px] text-text-dark-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">↗</span>
                          </span>
                          <span className="mt-0.5 block text-[14px] leading-snug text-text-dark-muted">{e.does}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </LiveOnScreen>

        <p className="mt-10 max-w-[80ch] text-[13px] leading-relaxed text-text-dark-muted">{platformNotice}</p>
      </div>
    </section>
  );
}
