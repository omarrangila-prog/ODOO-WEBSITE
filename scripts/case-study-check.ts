/**
 * Reports, for every real project, whether its case study may be published
 * and exactly what is still missing. Exits non-zero if a record is marked
 * 'published' while blockers remain, so a premature status change is caught
 * before it reaches a build.
 *
 * Run: npm run case-study:check
 */
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { caseStudyRecords, blockers, publishStatusLabel } from '../data/case-study-model';

const PUBLIC = join(process.cwd(), 'public');
const MAX_IMAGE_BYTES = 1_500_000;
let published = 0;
let wronglyPublished = 0;
let assetProblems = 0;

for (const r of caseStudyRecords()) {
  const problems = blockers(r);
  const images = [r.cover, ...(r.screenshots ?? [])].filter((i): i is NonNullable<typeof i> => Boolean(i));
  const assets: string[] = [];
  for (const img of images) {
    if (!img.src.startsWith(`/case-studies/${r.slug}/`)) assets.push(`${img.src} is not under /case-studies/${r.slug}/`);
    const file = join(PUBLIC, img.src);
    if (!existsSync(file)) assets.push(`${img.src} does not exist in /public`);
    else if (statSync(file).size > MAX_IMAGE_BYTES) assets.push(`${img.src} is ${(statSync(file).size / 1e6).toFixed(1)} MB; optimise below 1.5 MB`);
  }
  if (r.video && !existsSync(join(PUBLIC, r.video.src))) assets.push(`${r.video.src} does not exist in /public`);
  assetProblems += assets.length;

  const ok = problems.length === 0 && assets.length === 0;
  if (r.status === 'published' && !ok) wronglyPublished++;
  if (r.status === 'published' && ok) published++;

  console.log(`\n${ok ? 'READY ' : 'NOT READY'}  ${r.name}  [${publishStatusLabel[r.status]}]`);
  for (const p of [...problems, ...assets]) console.log(`    - ${p}`);
}

console.log(`\n${caseStudyRecords().length} real projects, ${published} publishable and published, ${wronglyPublished} marked published but blocked, ${assetProblems} asset problem(s).`);
if (wronglyPublished > 0) {
  console.error('\nFAILED: a record is marked "published" while blockers remain. Move it back to "under-review" or fix the blockers above.');
  process.exit(1);
}
