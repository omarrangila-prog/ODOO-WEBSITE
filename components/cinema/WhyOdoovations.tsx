import { SectionHead, Accent } from './SectionHead';

/**
 * Section 09. What is genuinely different, stated only where the site can back
 * it up: the seven capabilities live on the Services pages, the roles on the
 * Team page, and the Odoo position is the one the Brand page states. No awards,
 * rankings, ratings or guarantees.
 */
const strengths = [
  ['Technical engineering', 'Custom software, applications and integrations built by developers at senior and junior levels, with testing support.'],
  ['ERP specialisation', 'A dedicated Odoo department for implementation, custom modules and migration. Independent of Odoo SA, with no partner status claimed.'],
  ['Practical business understanding', 'Accounting, inventory and workflow reviewers check the logic against how the business really operates, before and after it is built.'],
  ['Dedicated quality validation', 'QA testers verify behaviour before delivery, working alongside the engineers and the domain reviewers.'],
  ['Creative capability', 'Video, motion graphics and design under the same roof, so the product and the way it is presented are made together.'],
  ['Coordinated delivery', 'One company across software, automation, ERP, web, marketing and content, so the pieces are planned as one project.'],
  ['Ongoing support', 'Maintenance and changes after launch, agreed in writing. Enquiries sent out of hours are received automatically and answered by a person when work resumes.'],
] as const;

export function WhyOdoovations() {
  return (
    <section aria-labelledby="why-h" className="stage-section">
      <div className="stage-inner">
        <SectionHead
          index="09"
          label="Why ODOOVATIONS"
          id="why-h"
          title={
            <>
              Technology is only as good as the <Accent>thinking</Accent> behind it.
            </>
          }
        />
        <ul className="mt-[clamp(48px,7vw,104px)] grid gap-x-[clamp(32px,6vw,110px)] gap-y-[clamp(28px,3.6vw,52px)] md:grid-cols-2">
          {strengths.map(([t, d], i) => (
            <li key={t} className="border-t border-line pt-5">
              <p className="flex items-baseline gap-4">
                <span aria-hidden className="text-[13px] tracking-[0.18em] text-violet/80">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-heading text-[clamp(21px,2.1vw,32px)] font-semibold tracking-[-0.025em] text-white">{t}</span>
              </p>
              <p className="mt-3 max-w-[52ch] pl-[calc(13px+1rem+1ch)] text-[16px] leading-relaxed text-text-dark-muted">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
