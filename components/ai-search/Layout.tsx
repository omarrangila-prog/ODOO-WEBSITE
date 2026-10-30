import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { PageArt } from '@/components/cinema/PageArt';
import { EnquiryForm } from './EnquiryForm';
import type { RequestTypeId } from '@/lib/ai-search/request';
import { company } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { cn } from '@/lib/utilities';

export function Hero({
  crumbs,
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  aside,
  art = 2,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  aside?: ReactNode;
  art?: number;
}) {
  return (
    <section className="theme-dark grain relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <PageArt variant={art} />
      <div className="shell relative">
        <Breadcrumbs items={crumbs} />
        <div className={cn(Boolean(aside) && 'grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10')}>
          <div>
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h1 className="display-1 max-w-4xl">{title}</h1>
            <p className="mt-7 max-w-[var(--reading-width)] font-heading text-[clamp(19px,2.2vw,26px)] font-medium leading-[1.3] tracking-[-0.02em] text-text-dark">{lede}</p>
            {(primary || secondary) && (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {primary && (
                  <ButtonLink href={primary.href}>
                    {primary.label}
                    <ArrowNudge />
                  </ButtonLink>
                )}
                {secondary && (
                  <ButtonLink href={secondary.href} variant="secondary">
                    {secondary.label}
                  </ButtonLink>
                )}
              </div>
            )}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

export function Band({ tone = 'graphite', id, title, intro, children, className }: { tone?: 'dark' | 'graphite' | 'light'; id?: string; title?: ReactNode; intro?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className={cn(`theme-${tone} bay-sm scroll-mt-24`, className)}>
      <div className="shell">
        {title && (
          <div className="mb-9 max-w-3xl">
            <h2 id={id ? `${id}-h` : undefined} className="page-h2">
              {title}
            </h2>
            {intro && <div className="mt-4 text-[17px] leading-relaxed text-text-dark-muted">{intro}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-[16.5px] leading-relaxed text-text-dark">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-bright" aria-hidden />
          {t}
        </li>
      ))}
    </ul>
  );
}

/** The enquiry section: the form beside the other ways to get in touch. */
export function EnquirySection({ defaultType, title = 'Ask us, free', intro }: { defaultType?: RequestTypeId; title?: string; intro?: ReactNode }) {
  const waConfigured = Boolean(company.whatsapp) && !company.whatsapp.startsWith('REPLACE');
  return (
    <section id="enquiry" aria-labelledby="enquiry-h" className="theme-dark grain relative overflow-hidden bay-sm scroll-mt-24">
      <div className="shell relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <h2 id="enquiry-h" className="display-2">
            {title}
          </h2>
          <div className="mt-5 max-w-[var(--reading-width)] text-[17px] leading-relaxed text-text-dark-muted">
            {intro ?? (
              <p>
                Tell us the website and what you are asking for. A person reads every request and replies during Pakistan business hours. Sending it is free and commits you to nothing.
              </p>
            )}
          </div>
          <ul className="mt-7 space-y-3 text-[16px]">
            <li>
              <a href={`mailto:${company.email}?subject=AI%20Search%20enquiry`} className="text-violet-bright underline underline-offset-4">
                {company.email}
              </a>
            </li>
            {waConfigured && (
              <li>
                <a href={whatsappLink(company.whatsapp, 'Hello ODOOVATIONS, I would like to ask about AI Search (AEO and GEO).')} target="_blank" rel="noopener noreferrer" className="text-violet-bright underline underline-offset-4">
                  Message us on WhatsApp
                </a>
              </li>
            )}
            <li className="text-text-dark-muted">Office 604, Landmark Plaza, Karachi, Pakistan</li>
          </ul>
        </div>
        <div className="rounded-[24px] border border-line bg-graphite/80 p-5 shadow-float sm:p-8">
          <EnquiryForm defaultType={defaultType} />
        </div>
      </div>
    </section>
  );
}
