import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, SITE_URL } from '@/lib/seo';
import { glossary, glossaryGroups, GLOSSARY_REVIEWED } from '@/data/ai-glossary';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { CtaBand } from '@/components/ui/CtaBand';
import { Hero, Band } from '@/components/ai-search/Layout';

const PATH = '/resources/ai-search-glossary';
const DESCRIPTION = `${glossary.length} AI search terms in plain English: AEO, GEO, AI Mode, query fan-out, citation rate, AI crawlers, llms.txt, MCP, ACP and more, with how settled each one is.`;
export const metadata: Metadata = buildMetadata({ title: 'AI Search Glossary: AEO, GEO and AI Terms | ODOOVATIONS', description: DESCRIPTION, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: '/resources' },
  { name: 'AI search glossary', path: PATH },
];
const statusNote = { Platform: 'Documented by a search or AI company', Industry: 'Widely used; no single owner', Marketing: 'Mostly vendor language' } as const;

export default function GlossaryPage() {
  const set = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}${PATH}#terms`,
    name: 'AI search glossary',
    url: `${SITE_URL}${PATH}`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    dateModified: GLOSSARY_REVIEWED,
    hasDefinedTerm: glossary.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE_URL}${PATH}#${t.slug}`,
      name: t.term,
      ...(t.aka ? { alternateName: t.aka } : {}),
      description: t.definition,
      inDefinedTermSet: `${SITE_URL}${PATH}#terms`,
    })),
  };
  return (
    <>
      <JsonLd data={[set, breadcrumbSchema(crumbs)]} />
      <Hero crumbs={crumbs} eyebrow="Glossary" title="AI search glossary" lede={`${glossary.length} terms you will meet when buying AEO, GEO or AI search work, in plain English, with a note on how settled each one is.`} primary={{ label: 'Browse the terms', href: '#terms' }} secondary={{ label: 'AI Search services', href: '/services/ai-search-optimization' }} art={2} />

      <Band tone="graphite" id="how">
        <AnswerCard question="What do AEO and GEO mean?" className="max-w-4xl border-line text-text-dark-muted">
          <p>
            Answer engine optimization (AEO) makes your pages the clearest answer to buyers’ questions. Generative engine optimization (GEO) improves how AI assistants describe and cite your business across the web. The work overlaps heavily, and Google says optimizing for its AI features is still SEO. Reviewed {GLOSSARY_REVIEWED}; AI products change quickly, so each term notes whether a platform documents it, the industry uses it, or it is mainly marketing language.
          </p>
        </AnswerCard>
        <nav aria-label="Glossary sections" className="mt-8 flex flex-wrap gap-2">
          {glossaryGroups.map((g) => (
            <a key={g} href={`#${g.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[14px] text-text-dark-muted hover:border-line-strong hover:text-white">{g}</a>
          ))}
        </nav>
      </Band>

      <div id="terms">
        {glossaryGroups.map((g, i) => (
          <Band key={g} tone={i % 2 ? 'graphite' : 'dark'} id={g.toLowerCase().replace(/[^a-z]+/g, '-')} title={g}>
            <dl className="grid gap-5 lg:grid-cols-2">
              {glossary.filter((t) => t.group === g).map((t) => (
                <div key={t.slug} id={t.slug} className="scroll-mt-24 rounded-[18px] border border-line p-5">
                  <dt className="font-heading text-[18px] font-semibold text-white">
                    {t.term}
                    {t.aka && <span className="ml-2 text-[14px] font-normal text-text-dark-muted">({t.aka})</span>}
                  </dt>
                  <dd className="mt-2 text-[15.5px] leading-relaxed text-text-dark">{t.definition}</dd>
                  <dd className="mt-2 text-[14.5px] leading-relaxed text-text-dark-muted"><span className="font-semibold text-text-dark">Why it matters: </span>{t.why}</dd>
                  <dd className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-dark-muted">
                    <span className="rounded-full border border-line px-2.5 py-0.5" title={statusNote[t.status]}>{t.status}: {statusNote[t.status].toLowerCase()}</span>
                    {t.source && <a href={t.source.url} rel="noopener" className="underline underline-offset-4 hover:text-white">{t.source.label}</a>}
                  </dd>
                </div>
              ))}
            </dl>
          </Band>
        ))}
      </div>

      <Band tone="graphite" id="next" title="Keep going">
        <ul className="flex flex-wrap gap-3">
          {[
            ['AEO vs GEO vs SEO', '/resources/aeo-vs-geo-vs-seo'],
            ['Google AI Mode and AI Overviews: what site owners need', '/resources/google-ai-mode-ai-overviews-guide'],
            ['AI crawlers: who they are and what to allow', '/resources/ai-crawlers-user-agents'],
            ['Free AI crawler checker', '/tools/ai-crawler-checker'],
            ['How to measure AI search visibility', '/resources/how-to-measure-ai-search-visibility'],
          ].map(([l, h]) => (
            <li key={h}><Link href={h!} className="inline-flex min-h-[44px] items-center rounded-full border border-line px-4 text-[14.5px] text-text-dark-muted hover:border-line-strong hover:text-white">{l}</Link></li>
          ))}
        </ul>
      </Band>

      <CtaBand title="Want to know how AI assistants describe you?" body="Start with a dated AI search audit: the questions, the answers, the gaps and a written plan." primaryLabel="See the AI Search Audit" primaryHref="/services/ai-search-audit" />
    </>
  );
}
