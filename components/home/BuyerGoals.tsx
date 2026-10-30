import Link from 'next/link';
import { SectionLabel } from './SectionLabel';
import { getBrief } from '@/data/catalogue/manifest';
import { canonicalRoute } from '@/data/catalogue/routes';
import { offersFor } from '@/lib/catalogue/leaf';
import { tierNamesFor } from '@/lib/catalogue/programme';
import { priceLabel, pkrLabel } from '@/lib/catalogue/resolve';

/**
 * Homepage section 3: start from the buyer's goal (Revision 3 §2). Each goal names the problem, one real
 * project or labelled sample, a bounded first purchase with its published price, and one next action.
 * Starting prices are read from the catalogue, so they match the service pages.
 */
const goals = [
  { title: 'Get more, better enquiries', problem: 'Marketing spend with no clear link to sales.', start: 'S020', example: { label: 'Sample: lead routing and duplicates', href: '/demonstrations/revenue-desk' }, more: { label: 'Lead-to-CRM programme', href: '/programmes#lead-to-crm' } },
  { title: 'Be found in search and AI answers', problem: 'Buyers ask AI assistants and you are not in the answer.', start: 'S003', example: { label: 'Sample: question baseline', href: '/demonstrations/answer-atlas' }, more: { label: 'AI Search', href: '/services/ai-search-optimization' } },
  { title: 'Automate repetitive work', problem: 'Staff retype data between systems every day.', start: 'S048', example: { label: 'Client project: WhatsApp Digital Connection', href: '/case-studies' }, more: { label: 'Workflow automation', href: '/services/business-process-automation' } },
  { title: 'Implement ERP or CRM', problem: 'Stock, sales and accounts that never agree.', start: 'S054', example: { label: 'Sample: order, stock and reconciliation', href: '/demonstrations/erp-sandbox' }, more: { label: 'ERP rollout programme', href: '/programmes#erp-rollout' } },
  { title: 'Build or modernise software', problem: 'A process that no off-the-shelf product fits.', start: 'S078', example: { label: 'Client project: KCCI Election System', href: '/case-studies' }, more: { label: 'Custom software', href: '/services/custom-software' } },
  { title: 'Sell more online and keep customers', problem: 'A store that loses orders and never follows up.', start: 'S094', example: { label: 'Sample: test order and refund', href: '/demonstrations/commerce-studio' }, more: { label: 'Commerce programme', href: '/programmes#commerce-retention' } },
  { title: 'Brand, content and creative', problem: 'Materials that look different every time.', start: 'S113', example: { label: 'Sample: identity and components', href: '/demonstrations/design-system-lab' }, more: { label: 'Design and branding', href: '/services/design-branding' } },
  { title: 'Run a technology or back-office function', problem: 'IT and admin work with no clear owner.', start: 'S147', example: { label: 'Sample: support matrix', href: '/demonstrations/operations-desk' }, more: { label: 'Managed operations', href: '/expertise/managed-operations' } },
];

function startOffer(id: string) {
  const b = getBrief(id)!;
  const route = canonicalRoute(b);
  const o = offersFor(b, tierNamesFor(id), route)[0]!;
  return { title: b.title, route, price: priceLabel(o), pkr: pkrLabel(o) };
}

export function BuyerGoals() {
  return (
    <section aria-labelledby="goals-h" className="band band-tight">
      <div className="band-inner">
        <SectionLabel index="03">Start from your goal</SectionLabel>
        <h2 id="goals-h" className="band-title mt-4 max-w-[34ch]">
          What do you need to change?
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {goals.map((g) => {
            const s = startOffer(g.start);
            return (
              <li key={g.title} className="flex flex-col rounded-[18px] border border-line p-5">
                <h3 className="font-heading text-[18px] font-semibold tracking-[-0.02em] text-white">{g.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-text-dark-muted">{g.problem}</p>
                <p className="mt-4 text-[14px] text-text-dark">
                  Start with{' '}
                  <Link href={s.route} className="font-semibold underline underline-offset-4 hover:text-white">
                    {s.title}
                  </Link>
                  : {s.price}
                  {s.pkr && <span className="block text-[13px] text-text-dark-muted">{s.pkr}</span>}
                </p>
                <div className="mt-auto flex flex-col gap-1 pt-4 text-[14px]">
                  <Link href={g.example.href} className="inline-flex min-h-[32px] items-center text-text-dark-muted underline underline-offset-4 hover:text-white">
                    {g.example.label}
                  </Link>
                  <Link href={g.more.href} className="inline-flex min-h-[32px] items-center font-semibold text-violet underline underline-offset-4 hover:text-white">
                    {g.more.label}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Discovery first', 'Paid assessment or blueprint when scope is unknown.'],
            ['Fixed-price projects', 'Bounded work with a stated scope.'],
            ['Monthly programmes', 'Ongoing work with a defined allowance.'],
            ['Support capacity', 'Hours for upkeep after launch.'],
          ].map(([t, d]) => (
            <p key={t} className="text-[14.5px] leading-relaxed text-text-dark-muted">
              <span className="block font-semibold text-text-dark">{t}</span>
              {d}
            </p>
          ))}
        </div>
        <p className="mt-6 text-[15px]">
          <Link href="/pricing" className="link-editorial">
            All packages and prices, in USD and PKR <span aria-hidden className="arrow">↗</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
