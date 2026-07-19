import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

interface Props {
  title: string;
  updated: string;
  crumbLabel: string;
  crumbPath: string;
  children: ReactNode;
}

/**
 * Legal pages: full-width editorial header on graphite, then the body at a
 * comfortable reading width (720px) — never a collapsed narrow column.
 */
export function LegalLayout({ title, updated, crumbLabel, crumbPath, children }: Props) {
  return (
    <>
      <section className="theme-graphite grain relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-10 h-[360px] w-[360px] radial-core opacity-60" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: crumbLabel, path: crumbPath }]} />
          <h1 className="display-1">{title}</h1>
          <p className="mt-5 text-[15px] text-text-dark-muted">Last updated: {updated}</p>
        </div>
      </section>

      <section className="theme-dark bay-sm">
        <div className="shell">
          <div className="max-w-[var(--reading-width)] space-y-7 text-[17px] leading-[1.75] text-text-dark-muted [&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-[clamp(24px,2.4vw,32px)] [&_h2]:font-semibold [&_h2]:tracking-[-0.03em] [&_h2]:text-text-dark [&_a]:text-violet-bright [&_a]:underline-offset-4 hover:[&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
