import { pkrNote } from '@/data/currency';
/**
 * /llms.txt and /llms-full.txt, following the llms.txt proposal (llmstxt.org):
 * a short Markdown index of the site for language models, and a longer file that
 * carries the answer-first text of every important page, so an assistant can
 * answer questions about ODOOVATIONS from the company's own words instead of a
 * guess. Both are generated from the same data files as the pages, at build time.
 */
import { company } from '@/data/company';
import { services } from '@/data/services';
import { solutions } from '@/data/solutions';
import { industries } from '@/data/industries';
import { platformPages, platformNotice } from '@/data/platforms';
import { resources } from '@/data/resources';
import { faqs } from '@/data/faq';
import { publishedCaseStudies } from '@/data/case-study-model';
import { locations } from '@/data/locations';
import { plans, formatPrice, terms, contentUnit, outcomeNotice } from '@/data/ai-search-pricing';
import { companyFacts, notClaimed } from './facts';
import { SITE_URL } from './seo';

const u = (path: string) => `${SITE_URL}${path}`;
const first = (text: string) => {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
};

const company_pages = [
  ['About ODOOVATIONS', '/company/about', 'Who the company is and how it is organised.'],
  ['Company and brand information', '/company/brand', 'Official name, spelling, contact details and key facts.'],
  ['Team', '/company/team', 'Every role, its reported count and what each department does.'],
  ['Methodology', '/company/methodology', 'How an implementation is run, stage by stage.'],
  ['How we price', '/company/pricing', 'What drives the cost of a project.'],
  ['Global delivery', '/company/global-delivery', 'How international clients are served remotely.'],
  ['Selected clients', '/company/clients', 'Organisations the wider group has worked with, and how that is verified.'],
  ['FAQ', '/faq', 'Questions people ask before writing.'],
  ['Contact', '/contact', 'Enquiry form with service paths, WhatsApp, email and phone.'],
] as const;

export function llmsTxt(): string {
  const L: string[] = [];
  L.push(`# ${company.name}`, '');
  L.push(`> ${company.description}`, '');
  L.push('Key facts:');
  for (const f of companyFacts().slice(0, 10)) L.push(`- ${f.label}: ${f.value}`);
  L.push('', 'Not claimed: ' + notClaimed.map((x) => x.replace(/\.$/, '')).join('; ') + '.', '');

  L.push('## Services');
  for (const s of services) L.push(`- [${s.title}](${u(s.href)}): ${first(s.answer ?? s.intro)}`);
  L.push(`- [AI Search packages and pricing](${u('/services/ai-search-pricing')}): ${plans.filter((p) => p.price !== null).map((p) => `${p.name} ${formatPrice(p)}`).join('; ')}; Enterprise by quote. Prices in USD before taxes.`);
  L.push('', '## Platforms');
  for (const p of platformPages) L.push(`- [${p.title}](${u(p.href)}): ${first(p.answer)}`);
  L.push(`- [All platforms](${u('/platforms')}): ${platformNotice}`);
  L.push('', '## Solutions');
  for (const s of solutions) L.push(`- [${s.eyebrow}: ${s.metaTitle.replace(/\s*[|—-]\s*ODOOVATIONS.*$/i, '')}](${u(s.href)}): ${first(s.answer)}`);
  L.push('', '## Projects');
  for (const r of publishedCaseStudies()) L.push(`- [${r.name}](${u(`/projects/${r.slug}`)}): ${first(r.overview ?? r.name)}`);
  L.push(`- [All work](${u('/case-studies')}): client projects with their status, and labelled demonstration scenarios.`);
  L.push('', '## Industries');
  for (const i of industries) L.push(`- [${i.name}](${u(i.href)}): ${first(i.description)}`);
  L.push('', '## Guides');
  for (const r of resources) L.push(`- [${r.h1}](${u(r.href)}): ${first(r.summary)}`);
  L.push('', '## Company');
  for (const [t, p, d] of company_pages) L.push(`- [${t}](${u(p)}): ${d}`);
  L.push('', '## Optional');
  for (const l of locations) L.push(`- [${l.metaTitle.replace(/\s*[|—-]\s*ODOOVATIONS.*$/i, '')}](${u(l.href)})`);
  L.push(`- [Full text for language models](${u('/llms-full.txt')}): every summary, scope and answer above in one file.`);
  return L.join('\n') + '\n';
}

export function llmsFullTxt(): string {
  const L: string[] = [];
  L.push(`# ${company.name}: full reference`, '');
  L.push(`> ${company.description}`, '');
  L.push(`Source: ${u('/')} · Generated from the site's own data at build time. Where this file and a page differ, the page is current.`, '');

  L.push('## Key facts', '');
  for (const f of companyFacts()) L.push(`- **${f.label}:** ${f.value}${f.href ? ` (${u(f.href)})` : ''}`);
  L.push('', '## What ODOOVATIONS does not do or claim', '');
  for (const n of notClaimed) L.push(`- ${n}`);

  L.push('', '## Services', '');
  for (const s of services) {
    L.push(`### ${s.title}`, `URL: ${u(s.href)}`, '', s.answer ?? s.intro, '');
    if (s.whatWeDo.length) L.push(...s.whatWeDo.map((w) => `- ${w.title}: ${w.body}`), '');
  }

  L.push('### AI Search packages and pricing', `URL: ${u('/services/ai-search-pricing')}`, '', 'Prices are in USD, before taxes. ' + pkrNote + ' ' + outcomeNotice, '');
  for (const p of plans) L.push(`#### ${p.name}: ${formatPrice(p)}`, '', ...p.includes.map((i) => `- ${i}`), '');
  L.push(contentUnit, '', ...terms.map((t) => `- ${t.title}: ${t.body}`), '');

  L.push('## Platforms', '', platformNotice, '');
  for (const p of platformPages) {
    L.push(`### ${p.title}`, `URL: ${u(p.href)}`, '', p.answer, '');
    if (p.boundary) L.push(p.boundary, '');
    L.push(...p.included.map((x) => `- ${x.title}: ${x.body}`), '', `Not a fit when: ${p.notAFit.join(' ')}`, '', `Evidence: ${p.evidence}`, '');
  }

  L.push('## Solutions', '');
  for (const s of solutions) L.push(`### ${s.metaTitle.replace(/\s*[|—-]\s*ODOOVATIONS.*$/i, '')}`, `URL: ${u(s.href)}`, '', s.answer, '', `For: ${s.forWho}`, '');

  L.push('## Projects', '');
  for (const r of publishedCaseStudies()) {
    L.push(`### ${r.name}`, `URL: ${u(`/projects/${r.slug}`)}`, `Status: client project${r.clientDisplayName ? `, built for ${r.clientDisplayName}` : ''}.`, '', r.overview ?? '', '');
    if (r.scope) L.push('What the system does:', ...r.scope.map((s) => `- ${s.title}: ${s.detail}`), '');
    L.push(r.outcomes?.length ? `Outcomes: ${r.outcomes.map((o) => `${o.statement} (${o.evidence})`).join(' ')}` : 'Outcomes: none published yet; results are added only with evidence.', '');
  }

  L.push('## Industries', '');
  for (const i of industries) L.push(`### ${i.name}`, `URL: ${u(i.href)}`, '', i.description, '');

  L.push('## Guides', '');
  for (const r of resources) L.push(`### ${r.h1}`, `URL: ${u(r.href)} · Updated ${r.updated}`, '', r.summary, '');

  L.push('## Frequently asked questions', '');
  for (const f of faqs) L.push(`### ${f.question}`, '', f.answer, '');

  return L.join('\n') + '\n';
}
