import type { Metadata } from 'next';
import Link from 'next/link';
import { techGroups, basisLabel } from '@/data/technologies';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { PageArt } from '@/components/cinema/PageArt';

const PATH = '/technologies';
const DESCRIPTION =
  'The technologies ODOOVATIONS builds with, grouped by frontend, backend, data, AI, ERP and commerce, infrastructure and quality assurance, with the basis for each one stated.';

export const metadata: Metadata = buildMetadata({
  title: 'Technology We Build With | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

export default function TechnologiesPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Technology', path: PATH },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), webPageSchema('Technology', PATH, DESCRIPTION)]} />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <PageArt variant={5} />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Technology</p>
          <h1 className="display-1 max-w-4xl">
            What we build with, <span className="signal-text">and how we know.</span>
          </h1>
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            A list of every framework would be easy to write and worth little. Each entry below says why it is here: we use
            it on this website, it is part of Odoo, or it is a capability the owner has reported or confirmed.
          </p>
          <AnswerCard question="How should I read this page?" className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted">
            The technology for your project is chosen to suit the project, and named in the proposal. Listing a tool here is
            not a claim that every person on the team is expert in it, and a tool that is missing is not a claim that we
            cannot work with it. Ask, and we will say plainly whether it is something we would take on.
          </AnswerCard>
        </div>
      </section>

      <section className="theme-graphite bay-sm">
        <div className="shell space-y-12">
          {techGroups.map((g) => (
            <div key={g.id} className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[280px_1fr] lg:gap-14">
              <div>
                <h2 className="page-h2 !text-[clamp(24px,2.4vw,32px)]">{g.label}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-text-dark-muted">{g.intro}</p>
              </div>
              {g.items.length > 0 ? (
                <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {g.items.map((t) => (
                    <li key={t.name}>
                      <p className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-white">{t.name}</p>
                      <p className="mt-0.5 text-[15px] leading-snug text-text-dark">{t.use}</p>
                      <p className="mt-1 text-[13px] text-text-dark-muted">{basisLabel[t.basis]}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="max-w-[60ch] text-[16px] leading-relaxed text-text-dark-muted">{g.none}</p>
              )}
            </div>
          ))}
          <p className="border-t border-line pt-8 text-[15px] text-text-dark-muted">
            Department capabilities come from the <Link href="/company/team">team page</Link>. The platforms we connect to are on the{' '}
            <Link href="/platforms">platforms page</Link>, with the notice that their names do not imply partnership.
          </p>
        </div>
      </section>

      <CtaBand title="Have a specific stack in mind?" primaryLabel="Discuss Your Project" />
    </>
  );
}
