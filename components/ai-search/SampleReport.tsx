import { measurementDefinitions, recordFields } from '@/data/ai-search';

/**
 * What a monthly report looks like, as a layout. It is labelled in two places as an illustrative sample
 * and shows no client result: the answer rows hold the format of an entry, not an entry; the one number
 * is the arithmetic of a formula, flagged as arithmetic. No AI answer naming ODOOVATIONS (or anyone) is
 * shown, because none is a real result.
 */
const sections = [
  ['1', 'Baseline and method', 'The questions, the search experiences, the locale and the dates, and how many valid runs each figure rests on.'],
  ['2', 'Findings by question', 'For each question: was the brand named, was the domain cited, what was said, and which sources were used.'],
  ['3', 'Accuracy', 'Anything an assistant said about the business that is wrong or out of date, and where the wrong version probably came from.'],
  ['4', 'Work done this month', 'Pages changed, fixes made, profiles corrected, outreach carried out.'],
  ['5', 'Measurement', 'Mention rate, citation rate, referral traffic and qualified enquiries, each shown separately, with the limits.'],
  ['6', 'Next month', 'What to keep, what to drop and what to do next.'],
];

export function SampleReport() {
  return (
    <figure className="m-0 overflow-hidden rounded-[22px] border border-line-strong bg-[#0d0b15]">
      <figcaption className="flex flex-wrap items-center gap-3 border-b border-line bg-white/[0.03] px-5 py-3">
        <span className="font-heading text-[15px] font-semibold text-white">Monthly report: layout</span>
        <span className="rounded-full border border-amber/50 bg-amber/10 px-3 py-0.5 text-[12px] font-semibold text-amber">Demonstration report — sample data</span>
      </figcaption>

      <div className="grid gap-px bg-line md:grid-cols-2">
        <div className="bg-[#0d0b15] p-5 sm:p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-dark-muted">What it contains</p>
          <ol className="mt-4 space-y-3.5">
            {sections.map(([n, t, d]) => (
              <li key={n} className="grid grid-cols-[1.75rem_1fr] gap-x-2">
                <span aria-hidden className="pt-0.5 text-[12px] tracking-[0.12em] text-violet">{n}</span>
                <span>
                  <span className="block text-[15.5px] font-semibold text-text-dark">{t}</span>
                  <span className="block text-[14px] leading-relaxed text-text-dark-muted">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-[#0d0b15] p-5 sm:p-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-dark-muted">One record in the answer log</p>
          <dl className="mt-4 divide-y divide-line text-[14px]">
            {recordFields.map((f, i) => (
              <div key={f} className="grid grid-cols-[1.75rem_1fr] gap-x-2 py-2">
                <dt aria-hidden className="text-[12px] tracking-[0.12em] text-violet">{String(i + 1).padStart(2, '0')}</dt>
                <dd className="text-text-dark">{f}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[13px] leading-relaxed text-text-dark-muted">Failed runs are recorded too, and kept out of the rates.</p>
        </div>
      </div>

      <div className="border-t border-line bg-[#0d0b15] p-5 sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-dark-muted">How the two rates are worked out</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {measurementDefinitions
            .filter((m) => m.term === 'Mention rate' || m.term === 'Citation rate')
            .map((m) => (
              <div key={m.term} className="rounded-[14px] border border-line bg-white/[0.025] p-4">
                <p className="font-heading text-[16px] font-semibold text-white">{m.term}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-text-dark-muted">{m.definition}</p>
              </div>
            ))}
        </div>
        <p className="mt-4 text-[13.5px] leading-relaxed text-text-dark-muted">
          Arithmetic example, not a result: if 12 of 20 valid recorded answers name the brand, the mention rate is 12 ÷ 20, which is 60%, and the report says it rests on 20 answers.
        </p>
      </div>
    </figure>
  );
}
