/**
 * Verifies the product catalogue gate: that the real records are in the state
 * the site assumes, and that the gate itself still refuses what it should.
 *   npm run products:check
 */
import { products, productBlockers, isPublishable, duplicateSlugs, publishedProducts, type Product } from '../data/products';

let failures = 0;
const fail = (m: string) => {
  failures++;
  console.error('FAIL  ' + m);
};
const ok = (m: string) => console.log('ok    ' + m);

// 1. Real records
for (const p of products) {
  const b = productBlockers(p);
  console.log(`${isPublishable(p) ? 'PUBLIC ' : 'private'}  ${p.slug} (${p.status})${b.length ? `: ${b.length} blocker(s)` : ''}`);
  for (const x of b) console.log('         - ' + x);
}
const dup = duplicateSlugs();
dup.length ? fail('duplicate slugs: ' + dup.join(', ')) : ok('slugs are unique');
for (const p of products) if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) fail(`slug not URL-safe: ${p.slug}`);

// 2. The gate, against fixtures
const good: Product = {
  name: 'Fixture', slug: 'fixture', category: 'crm', status: 'demo',
  targetCustomer: 'Teams tracking leads', businessProblem: 'Leads live in chat.',
  description: 'A fixture product whose description is comfortably longer than the eighty characters the gate requires.',
  features: ['One', 'Two', 'Three'],
  screenshots: [{ src: '/x.png', width: 10, height: 10, alt: 'A screen', approved: true }],
  integrations: [], deploymentModel: 'Hosted', pricingApproach: 'Per scope', implementationRequirements: [],
  support: 'Agreed', related: [], evidence: { verified: true, source: 'test' },
};
isPublishable(good) ? ok('a complete, verified demo passes') : fail('complete fixture was refused: ' + productBlockers(good).join('; '));

const cases: [string, Partial<Product>][] = [
  ['an in-development product', { status: 'in-development' }],
  ['unverified evidence', { evidence: { verified: false, source: 'test' } }],
  ['no evidence source', { evidence: { verified: true, source: '' } }],
  ['a short description', { description: 'Too short.' }],
  ['fewer than three features', { features: ['One'] }],
  ['no screenshot and no demo link (demo status)', { screenshots: [], demoUrl: undefined }],
  ['an unapproved screenshot only', { screenshots: [{ src: '/x.png', width: 1, height: 1, alt: 'a', approved: false }] }],
  ['undefined pricing approach', { pricingApproach: 'Not yet defined.' }],
];
for (const [name, patch] of cases) {
  isPublishable({ ...good, ...patch }) ? fail(`gate accepted ${name}`) : ok(`gate refuses ${name}`);
}
isPublishable({ ...good, status: 'custom-solution', screenshots: [] })
  ? ok('a custom solution needs no screenshot')
  : fail('custom solution wrongly required a screenshot');

console.log(`\n${publishedProducts().length} product(s) public of ${products.length}.`);
process.exit(failures ? 1 : 0);
