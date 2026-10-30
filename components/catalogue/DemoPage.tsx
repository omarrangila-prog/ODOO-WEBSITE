import Link from 'next/link';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { briefs, moduleAnchor, type Family } from '@/data/catalogue/manifest';
import { leafContent } from '@/data/catalogue/content';
import { canonicalRoute } from '@/data/catalogue/routes';
import { JsonLd } from '@/components/ui/JsonLd';
import { Hero, Band } from '@/components/ai-search/Layout';
import { FamilyDemo } from '@/components/demos/configs';

/**
 * A family's demonstration page (master brief, Appendix H): a working demonstration that runs in the browser
 * on invented data, then the sample deliverable for each module. Nothing here is client work or live software.
 */
const industryWalks = briefs.filter((b) => b.industry).map((b) => ({ title: b.title, steps: b.industry!.workflow.replace(/\.$/, '').split(' → ') }));

export function DemoPage({ family }: { family: Family }) {
  const mods = briefs.filter((b) => b.family === family.code);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Demonstrations', path: '/demonstrations' },
    { name: family.demo.name, path: family.demo.route },
  ];
  const description = `ODOOVATIONS ${family.demo.name}: ${family.demo.purpose.toLowerCase()}. Sample deliverables with invented data for ${mods.length} ${family.name.toLowerCase()} services.`;
  return (
    <>
      <JsonLd data={[webPageSchema(`ODOOVATIONS ${family.demo.name}`, family.demo.route, description), breadcrumbSchema(crumbs)]} />
      <Hero crumbs={crumbs} eyebrow={`Demonstration · ${family.name}`} title={`ODOOVATIONS ${family.demo.name}`} lede={family.demo.purpose} primary={{ label: 'Try it', href: '#try' }} secondary={{ label: `${family.name} services`, href: family.hub }} art={5} />

      <Band tone="graphite" id="try" title="Try it" intro={family.demo.interaction}>
        <FamilyDemo code={family.code} industries={industryWalks} />
        <p className="mt-6 max-w-[var(--reading-width)] text-[14.5px] text-text-dark-muted">{family.demo.boundary} None of this is client work or a client result.</p>
      </Band>

      <Band tone="dark" id="modules" title={`${mods.length} modules`}>
        <div className="space-y-12">
          {mods.map((b) => {
            const c = leafContent.find((x) => x.id === b.id);
            return (
              <article key={b.id} id={moduleAnchor(b)} className="scroll-mt-24">
                <h3 className="font-heading text-[20px] font-semibold text-white">{b.module}</h3>
                <p className="mt-1 text-[14.5px] text-text-dark-muted">
                  For <Link href={canonicalRoute(b)} className="underline underline-offset-4 hover:text-white">{b.title}</Link>. Evidence this module will show: {b.proof}
                </p>
                {c ? (
                  <figure className="m-0 mt-4 overflow-hidden rounded-[18px] border border-line">
                    <figcaption className="flex flex-wrap items-center gap-3 border-b border-line bg-white/[0.03] px-4 py-2.5">
                      <span className="text-[14.5px] font-semibold text-white">{c.sample.title}</span>
                      <span className="rounded-full border border-amber/50 bg-amber/10 px-3 py-0.5 text-[12px] font-semibold text-amber">Sample data</span>
                    </figcaption>
                    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${c.sample.title} (scrollable table)`}>
                      <table className="w-full min-w-[520px] text-left text-[14px]">
                        <thead>
                          <tr className="border-b border-line">{c.sample.columns.map((h) => <th key={h} scope="col" className="px-4 py-2.5 font-semibold text-text-dark">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {c.sample.rows.map((r, i) => (
                            <tr key={i} className="border-b border-line last:border-0">{r.map((v, j) => <td key={j} className="px-4 py-2.5 align-top text-text-dark-muted">{v}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </figure>
                ) : (
                  <p className="mt-3 text-[14.5px] text-text-dark-muted">The sample for this module is shown on its service page.</p>
                )}
              </article>
            );
          })}
        </div>
      </Band>
    </>
  );
}
