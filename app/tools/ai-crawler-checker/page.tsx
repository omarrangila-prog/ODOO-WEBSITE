import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Hero, Band } from '@/components/ai-search/Layout';
import { CtaBand } from '@/components/ui/CtaBand';
import { AiCrawlerChecker } from '@/components/tools/AiCrawlerChecker';

const PATH = '/tools/ai-crawler-checker';
const DESCRIPTION = 'Paste a robots.txt and see which AI crawlers, from OpenAI, Anthropic, Perplexity, Google, Apple, Meta and others, may fetch your pages. Free; runs in your browser.';
export const metadata: Metadata = buildMetadata({ title: 'AI Crawler Checker (Free) | ODOOVATIONS', description: DESCRIPTION, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'AI Crawler Checker', path: PATH },
];

/** A free tool. Everything runs in the visitor's browser: nothing is fetched from their site or sent to us. */
export default function Page() {
  const app = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ODOOVATIONS AI Crawler Checker',
    url: `${SITE_URL}${PATH}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any (runs in the browser)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    provider: { '@id': `${SITE_URL}/#organization` },
    description: DESCRIPTION,
  };
  return (
    <>
      <JsonLd data={[app, breadcrumbSchema(crumbs)]} />
      <Hero crumbs={crumbs} eyebrow="Free tool" title="Which AI crawlers can read your site?" lede={DESCRIPTION} primary={{ label: 'Use the tool', href: '#tool' }} secondary={{ label: 'AI crawlers: who they are and what to allow', href: '/resources/ai-crawlers-user-agents' }} art={3} />
      <Band tone="graphite" id="tool" title="AI Crawler Checker">
        <AiCrawlerChecker />
        <p className="mt-6 max-w-[var(--reading-width)] text-[14.5px] text-text-dark-muted">
          Runs entirely in your browser: we do not fetch your site or store what you paste. It checks rules, not results; whether an AI product cites you depends on much more. Read <Link href="/resources/ai-crawlers-user-agents" className="underline underline-offset-4 hover:text-white">AI crawlers: who they are and what to allow</Link> or see the <Link href="/resources/ai-search-glossary" className="underline underline-offset-4 hover:text-white">AI search glossary</Link>.
        </p>
      </Band>
      <CtaBand title="Want a full AI search check?" body="The AI Search Audit records how AI assistants answer your buyers’ questions, with dates, sources and a written plan." primaryLabel="See the AI Search Audit" primaryHref="/services/ai-search-audit" />
    </>
  );
}
