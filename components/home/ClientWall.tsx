import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { featuredClients, clientSource, clientCount } from '@/data/clients';

/**
 * Typographic client strip. Real names from the group profile, no logos,
 * no invented counts — the only number is the length of the published list.
 */
export function ClientWall() {
  return (
    <section className="theme-light border-y border-line-light py-14 sm:py-16">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Selected clients</p>
            <h2 className="font-heading text-[clamp(22px,2.6vw,32px)] font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
              Businesses across education, food, commodities, publishing, textiles and retail.
            </h2>{' '}
            <p className="mt-3 text-[15px] text-ink-muted">
              Clients of the {clientSource.parentCompany} group, of which ODOOVATIONS is part.
            </p>
          </div>
          <Link
            href="/company/clients"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-violet"
          >
            All {clientCount} named clients
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
          {featuredClients.map((name) => (
            <li
              key={name}
              className="border-l-2 border-line-light pl-4 font-heading text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink/80"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
