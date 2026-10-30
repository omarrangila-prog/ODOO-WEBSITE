'use client';

import { useEffect, useState } from 'react';

/**
 * Progressive filter for a server-rendered directory. Every row is in the HTML for crawlers and for visitors
 * without JavaScript; this only hides rows that do not match. Rows carry data-search (lower-case text) and
 * data-billing; sections carry data-family-section and hide when they have no visible rows.
 */
export function DirectoryFilter({ billingOptions }: { billingOptions: { id: string; label: string }[] }) {
  const [q, setQ] = useState('');
  const [billing, setBilling] = useState('');
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const needle = q.trim().toLowerCase();
    let count = 0;
    document.querySelectorAll<HTMLElement>('[data-search]').forEach((row) => {
      const ok = (!needle || (row.dataset.search ?? '').includes(needle)) && (!billing || (row.dataset.billing ?? '').split(' ').includes(billing));
      row.hidden = !ok;
      if (ok) count++;
    });
    document.querySelectorAll<HTMLElement>('[data-family-section]').forEach((sec) => {
      sec.hidden = !sec.querySelector('[data-search]:not([hidden])');
    });
    setShown(needle || billing ? count : null);
  }, [q, billing]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="flex-1 text-[14px] font-semibold text-text-dark">
        Search services
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. Odoo, Shopify, chatbot, payroll"
          className="mt-2 block min-h-[44px] w-full rounded-control border border-line-strong bg-transparent px-4 text-[15px] font-normal text-text-dark placeholder:text-text-dark-muted"
        />
      </label>
      <label className="text-[14px] font-semibold text-text-dark">
        Billing
        <select
          value={billing}
          onChange={(e) => setBilling(e.target.value)}
          className="mt-2 block min-h-[44px] w-full rounded-control border border-line-strong bg-[#0d0b15] px-3 text-[15px] font-normal text-text-dark sm:w-56"
        >
          <option value="">Any</option>
          {billingOptions.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>
      </label>
      <p aria-live="polite" className="min-h-[1.5em] text-[14px] text-text-dark-muted sm:pb-3">
        {shown === null ? '' : `${shown} ${shown === 1 ? 'service' : 'services'} shown`}
      </p>
    </div>
  );
}
