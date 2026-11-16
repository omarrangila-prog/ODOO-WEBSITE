import { llmsFullTxt } from '@/lib/llms';
import { allLeaves, leafOffers } from '@/lib/catalogue/leaf';
import { priceLabel, pkrLabel } from '@/lib/catalogue/resolve';
import { programmes } from '@/data/catalogue/programmes';
import { SITE_URL } from '@/lib/seo';
import { services } from '@/data/services';
import { solutions } from '@/data/solutions';
import { industries } from '@/data/industries';

/**
 * The concierge's knowledge base, built from the same data the pages render, so it cannot drift from the
 * site. `scripts/concierge-setup.ts` uploads it to ElevenLabs. It adds the service catalogue and its published
 * packages, which llms-full.txt summarises only.
 */
export function conciergeKnowledge(): string {
  const L: string[] = [llmsFullTxt(), '', '## Service catalogue: pages and published packages', ''];
  L.push('Prices are proposed launch prices in US dollars before taxes; PKR is indicative at the site’s dated rate. The final price is confirmed in a written scope. Third-party costs (licences, ads, hosting) are separate.', '');
  for (const leaf of allLeaves()) {
    const c = leaf.content;
    L.push(`### ${leaf.brief.title}`, `URL: ${SITE_URL}${leaf.route} (path ${leaf.route})`, '', c.definition, '', `For: ${c.whoFor}`, '');
    for (const o of leafOffers(leaf)) L.push(`- ${o.name}: ${priceLabel(o)} (${pkrLabel(o)}). Includes: ${o.scope.join('; ')}`);
    L.push('');
  }
  L.push('## Combined programmes', `URL: ${SITE_URL}/programmes`, '');
  for (const p of programmes) L.push(`- ${p.name}: for ${p.forWho.charAt(0).toLowerCase()}${p.forWho.slice(1)} Outcome: ${p.outcome}`);
  L.push('', '## Key pages', '');
  for (const [label, path] of [
    ['All services', '/services'], ['Pricing directory', '/pricing'], ['Programmes', '/programmes'], ['Solutions', '/solutions'],
    ['Industries', '/industries'], ['Work and case studies', '/case-studies'], ['Demonstrations (invented data)', '/demonstrations'],
    ['FAQ', '/faq'], ['About', '/company/about'], ['Methodology', '/company/methodology'], ['Guides', '/resources'], ['Contact and enquiry form', '/contact'],
  ]) L.push(`- ${label}: path ${path}`);
  return L.join('\n') + '\n';
}

/**
 * A short directory that is always in the agent's context (not retrieved), so it can name the right page
 * for any topic without waiting on search: every service, solution and industry with its path and one line.
 */
export function conciergeDirectory(): string {
  const one = (t: string) => (t.split(/(?<=[.!?])\s/)[0] ?? t).slice(0, 220);
  const L: string[] = ['# ODOOVATIONS site directory (always current)', ''];
  L.push('## Services');
  for (const s of services) L.push(`- ${s.title} — ${s.href}: ${one(s.answer ?? s.intro)}`);
  L.push('', '## Solutions');
  for (const s of solutions) L.push(`- ${s.metaTitle.replace(/\s*[|—-]\s*ODOOVATIONS.*$/i, '')} — ${s.href}`);
  L.push('', '## Industries');
  for (const i of industries) L.push(`- ${i.name} — ${i.href}: ${one(i.description)}`);
  L.push('', '## Catalogue services (packages with published prices; details in the knowledge base)');
  for (const l of allLeaves()) L.push(`- ${l.brief.title} — ${l.route}`);
  return L.join('\n') + '\n';
}
