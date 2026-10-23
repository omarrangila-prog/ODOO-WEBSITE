import { departments, countLabel } from '@/data/team';

/**
 * In-page links are plain anchors, not next/link: next/link handles a same-page
 * hash with pushState, which never fires `hashchange`, so the department row
 * the link points at would scroll into view but stay closed.
 *
 * ODOOVATIONS at the centre, every department around it. A grid, deliberately
 * not an org chart: no reporting lines are drawn because no reporting
 * structure has been verified. Plain links, no motion, no hover-only content.
 */
export function TeamStructure() {
  return (
    <div>
      <div className="mx-auto grid max-w-md place-items-center rounded-editorial border border-violet bg-ivory-soft px-6 py-7 text-center">
        <p className="font-heading text-[clamp(22px,3vw,30px)] font-semibold tracking-[-0.02em] text-ink">ODOOVATIONS</p>{' '}
        <p className="mt-1 text-[14px] text-ink-muted">Twelve departments working on the same project</p>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <li key={d.id}>
            <a
              href={`#${d.id}`}
              className="flex h-full min-h-[44px] flex-col rounded-control border border-line-light bg-ivory-soft px-4 py-3.5 transition-colors hover:border-violet"
            >
              <span className="font-heading text-[16px] font-semibold leading-snug text-ink">{d.name}</span>{' '}
              {countLabel(d) && <span className="mt-1 text-[13px] text-ink-muted">{countLabel(d)}</span>}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-center text-[14px] text-ink-muted">
        This shows who contributes, not who reports to whom. A reporting structure has not been published.
      </p>
    </div>
  );
}
