/**
 * Every technology on the public Technology page must say how it is known.
 *   npm run tech:check
 */
import { techGroups, basisLabel, allTechItems } from '../data/technologies';

let failures = 0;
const fail = (m: string) => {
  failures++;
  console.error('FAIL  ' + m);
};

const seen = new Set<string>();
for (const t of allTechItems()) {
  if (!(t.basis in basisLabel)) fail(`${t.name}: unknown basis "${t.basis}"`);
  if (!t.use.trim()) fail(`${t.name}: no stated use`);
  const key = t.name.toLowerCase();
  if (seen.has(key)) fail(`${t.name}: listed twice`);
  seen.add(key);
}
for (const g of techGroups) {
  if (g.items.length === 0 && !g.none) fail(`${g.label}: empty group with no explanation`);
}
console.log(`${allTechItems().length} technologies in ${techGroups.length} groups.`);
console.log(failures ? `${failures} problem(s).` : 'All entries have a stated basis.');
process.exit(failures ? 1 : 0);
