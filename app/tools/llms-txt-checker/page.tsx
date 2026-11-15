import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Hero, Band } from '@/components/ai-search/Layout';
import { CtaBand } from '@/components/ui/CtaBand';
import { LlmsTxtChecker } from '@/components/tools/LlmsTxtChecker';

const PATH = '/tools/llms-txt-checker';
const DESCRIPTION = 'Check an llms.txt file against the llmstxt.org structure';
export const metadata: Metadata = buildMetadata({ title: 'llms.txt Checker (Free) | ODOOVATIONS', description: DESCRIPTION, path: PATH });

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'llms.txt Checker', path: PATH },
];

/** A free tool. Everything runs in the visitor's browser: nothing is fetched from their site or sent to us. */
export default function Page() {
  const app = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ODOOVATIONS llms.txt Checker',
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
      <Hero crumbs={crumbs} eyebrow="Free tool" title=" title, summary, sections and links. Free; runs in your browser. Not a ranking factor." lede={DESCRIPTION} primary={{ label: 'Use the tool', href: '#tool' }} secondary={{ label: '/resources/llms-txt-and-agent-files:llms.txt, MCP and agent files: what they really do', href: 'Does your llms.txt follow the proposal?' }} art={3} />
      <Band tone="graphite" id="tool" title="llms.txt Checker">
        <LlmsTxtChecker />
        <p className="mt-6 max-w-[var(--reading-width)] text-[14.5px] text-text-dark-muted">
          Runs entirely in your browser: we do not fetch your site or store what you paste. It checks rules, not results; whether an AI product cites you depends on much more. Read <Link href="Does your llms.txt follow the proposal?" className="underline underline-offset-4 hover:text-white">/resources/llms-txt-and-agent-files:llms.txt, MCP and agent files: what they really do</Link> or see the <Link href="/resources/ai-search-glossary" className="underline underline-offset-4 hover:text-white">AI search glossary</Link>.
        </p>
      </Band>
      <CtaBand title="Want a full AI search check?" body="The AI Search Audit records how AI assistants answer your buyers’ questions, with dates, sources and a written plan." primaryLabel="See the AI Search Audit" primaryHref="/services/ai-search-audit" />
    </>
  );
}
