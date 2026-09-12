import Link from 'next/link';
import { Video, FileText, Clock3, ShieldCheck } from 'lucide-react';
import { verifiedCountries, hasVerifiedInternationalFootprint } from '@/data/global-projects';
import { flagEmoji } from '@/data/countries';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';

const practices = [
  { icon: Video, label: 'Remote discovery & demos' },
  { icon: FileText, label: 'Shared written documentation' },
  { icon: Clock3, label: 'Agreed time-zone overlap' },
  { icon: ShieldCheck, label: 'Scoped, revocable access' },
];

/**
 * Global delivery, stated at the level the evidence supports.
 *
 * Country chips render only from `verifiedCountries`. With nothing verified
 * beyond Pakistan, the section says "remote delivery worldwide" and shows no
 * count and no flag wall — see data/global-projects.ts for why.
 */
export function GlobalDeliveryBand() {
  return (
    <section className="theme-graphite grain relative overflow-hidden bay-sm">
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[520px] w-[620px] radial-core opacity-50" aria-hidden />
      <div className="shell relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-5">Global delivery</p>
          <h2 className="display-2">
            Built in Karachi.
            <br />
            <span className="signal-text">Delivered across borders.</span>
          </h2>
          <p className="lede mt-6 max-w-[46ch]">
            Remote discovery, development, demonstrations, testing and support let one team
            deliver projects across time zones &mdash; from one office, with no branches we would
            have to invent.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {/* Verified footprint only. Today that is the registered office. */}
            {hasVerifiedInternationalFootprint ? (
              <>
                <span className="basis-full text-[12px] font-semibold uppercase tracking-[0.12em] text-text-dark-muted">
                  Markets we have delivered in
                </span>
                {verifiedCountries.map((c) => (
                  <span
                    key={c.countryCode}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[13.5px] text-text-dark"
                  >
                    <span aria-hidden>{flagEmoji(c.countryCode)}</span>
                    {c.countryName}
                  </span>
                ))}
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-bright/40 bg-violet/10 px-3.5 py-1.5 text-[13.5px] font-medium text-text-dark">
                  <span aria-hidden>{flagEmoji('PK')}</span>
                  Karachi, Pakistan &mdash; headquarters
                </span>
                <span className="rounded-full border border-line px-3.5 py-1.5 text-[13.5px] text-text-dark-muted">
                  Remote delivery worldwide
                </span>
              </>
            )}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/company/global-delivery" variant="secondary">
              How remote delivery works
              <ArrowNudge className="h-[18px] w-[18px]" />
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:pt-14">
          {practices.map((p) => (
            <li
              key={p.label}
              className="flex items-center gap-3.5 rounded-panel border border-line bg-white/[0.02] p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-control bg-[linear-gradient(120deg,#7C4DFF,#E947C6)] text-white">
                <p.icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span className="text-[15px] font-medium text-text-dark">{p.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
