import Link from 'next/link';
import { publishableProjects } from '@/data/projects';

/**
 * Real delivered software and integration work, read from the same store and the same public-eligibility
 * selector as the rest of the site. It describes what each project is, from the record; it is not an
 * AI-search result and the heading says so. Products and demos are excluded here on purpose.
 */
export function SelectedWork() {
  const work = publishableProjects().filter((p) => p.status === 'CLIENT_PROJECT');
  if (!work.length) return null;
  return (
    <div className="rounded-[22px] border border-line p-6 sm:p-7">
      <h3 className="font-heading text-[19px] font-semibold text-white">Selected software and integration work</h3>
      <p className="mt-2 max-w-[var(--reading-width)] text-[15px] leading-relaxed text-text-dark-muted">
        Client projects ODOOVATIONS has delivered, described as management has confirmed them. They show our engineering and integration work. They are not AI search results, and none has had an AI search audit.
      </p>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {work.map((p) => (
          <li key={p.id} className="rounded-[16px] border border-line bg-white/[0.02] p-4">
            <p className="text-[15.5px] font-semibold text-text-dark">{p.name}</p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-text-dark-muted">{p.purpose ?? p.summary}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[14px]">
        <Link href="/case-studies" className="font-semibold text-violet underline underline-offset-4 hover:text-white">All client work</Link>
      </p>
    </div>
  );
}
