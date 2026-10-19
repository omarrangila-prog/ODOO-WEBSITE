
/**
 * In-page links are plain anchors, not next/link: next/link handles a same-page
 * hash with pushState, which never fires `hashchange`, so the department row
 * the link points at would scroll into view but stay closed.
 *
 * How the departments meet on a project. This is the INTENDED delivery
 * sequence, not an audited record that every past project followed it; the
 * page says so beneath the list. Steps name the department involved and link
 * to it. An ordered list, so the sequence is carried by the markup itself
 * rather than by arrows that a screen reader or a scraper would not see.
 */
const steps = [
  { t: 'Business discovery', d: 'The first enquiry is taken and the requirement is understood in the client’s own words.', who: 'Sales & Business Development', href: '#sales-business-development' },
  { t: 'Domain expert review', d: 'Accounting and inventory logic, and the real workflow with its exceptions, are reviewed before anything is built.', who: 'Business Operations & Validation', href: '#business-operations' },
  { t: 'Technical architecture', d: 'Technical direction, standards and the shape of the system are decided.', who: 'Executive Leadership', href: '#executive-leadership' },
  { t: 'Build', d: 'Software, Odoo or AI work is developed against the reviewed workflow.', who: 'Software, Odoo and AI engineering', href: '#software-engineering' },
  { t: 'Manual business-logic verification', d: 'Someone who understands the business checks that what was built matches how the business works.', who: 'Business Operations & Validation', href: '#business-operations' },
  { t: 'QA testing', d: 'Functional, regression and workflow tests are run, and fixes are verified.', who: 'Quality Assurance', href: '#quality-assurance' },
  { t: 'Deployment & infrastructure', d: 'Environments are prepared and the release is deployed.', who: 'Infrastructure & Server Operations', href: '#infrastructure' },
  { t: 'Training & handover', d: 'The client’s team is trained on their real workflows and the system is handed over.', who: 'Odoo and software teams, with client communication', href: '#client-communication' },
];

export function TeamWorkflow() {
  return (
    <div>
      <ol className="grid gap-4 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.t} className="flex gap-4 rounded-editorial border border-line-light bg-ivory-soft p-5">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-violet font-heading text-[15px] font-semibold text-violet"
              aria-hidden
            >
              {i + 1}
            </span>{' '}
            <div>
              <h3 className="font-heading text-[18px] font-semibold leading-snug text-ink">{s.t}</h3>{' '}
              <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{s.d}</p>{' '}
              <p className="mt-2 text-[14px]">
                <a href={s.href} className="inline-flex min-h-[44px] items-center font-medium text-violet underline-offset-4 hover:underline">
                  {s.who}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-editorial border border-line-light bg-ivory-soft p-6 sm:p-8">
        <h3 className="font-heading text-[20px] font-semibold text-ink">An illustrative example</h3>
        <p className="mt-3 max-w-[var(--reading-width)] text-[16px] leading-relaxed text-ink-muted">
          An accountant reviews how ledger entries should behave. An inventory specialist validates the stock-movement
          rules. A workflow reviewer checks the process exceptions. Developers implement the corrections, QA verifies
          the behaviour, and infrastructure staff support deployment.
        </p>{' '}
        <p className="mt-3 max-w-[var(--reading-width)] text-[14px] leading-relaxed text-ink-muted">
          This is the intended multidisciplinary process, not an audited claim that every past project followed this
          exact sequence.
        </p>
      </div>
    </div>
  );
}
