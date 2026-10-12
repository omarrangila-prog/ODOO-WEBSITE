'use client';

import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Boxes,
  Wallet,
  Factory,
  Users,
  BarChart3,
  Search,
  Bell,
} from 'lucide-react';
import { TextGap } from '@/components/ui/TextGap';

/**
 * Clean, coded Odoo-style operations dashboard — crisp at any size, correct
 * labels, themeable. Replaces the supplied AI raster (which had garbled text).
 * Purely presentational; example numbers are illustrative dashboard content,
 * not company statistics.
 */

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Sales', icon: ShoppingCart },
  { label: 'Purchase', icon: Truck },
  { label: 'Inventory', icon: Boxes },
  { label: 'Accounting', icon: Wallet },
  { label: 'Manufacturing', icon: Factory },
  { label: 'Employees', icon: Users },
  { label: 'Reporting', icon: BarChart3 },
];

const kpis = [
  { label: 'Total Sales', value: 'PKR 8.45M', delta: '+18.2%', up: true, spark: 'M0 14 C 8 10 14 16 22 9 S 38 6 48 3' },
  { label: 'Open Invoices', value: 'PKR 2.34M', delta: '−6.5%', up: false, spark: 'M0 6 C 10 10 16 4 24 11 S 40 14 48 8' },
  { label: 'Inventory Value', value: 'PKR 4.75M', delta: '+12.2%', up: true, spark: 'M0 12 C 10 8 18 13 26 6 S 40 4 48 5' },
];

const bars = [42, 55, 40, 68, 52, 88, 70, 60, 46, 58, 74, 63];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const donut = [
  { label: 'Textile', pct: 34, color: '#8D4BFF' },
  { label: 'Retail', pct: 28, color: '#B96BFF' },
  { label: 'Distribution', pct: 22, color: '#5B8DEF' },
  { label: 'Other', pct: 16, color: '#3A3F55' },
];

const activity = [
  { what: 'Sales Order confirmed', who: 'Bilal R.', when: '2 min ago', color: 'text-green' },
  { what: 'Invoice created', who: 'Fatima K.', when: '15 min ago', color: 'text-violet-bright' },
  { what: 'Payment received', who: 'Usman S.', when: '1 hr ago', color: 'text-cyan' },
];

export function OdooDashboard() {
  // donut stroke-dasharray math on a circumference of 100
  let offset = 25; // start at top
  return (
    <div className="w-full overflow-hidden rounded-[22px] border border-[rgba(163,99,255,0.18)] bg-[#0d0f1a] text-left shadow-[inset_1px_1px_0_rgba(255,255,255,0.04)]">
      {/* top bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
        <span className="font-heading text-[15px] font-bold lowercase text-white">
          odoo<span className="text-violet-bright">.</span>
        </span>
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-white/40" aria-hidden />
          <span className="text-[11px] text-white/40">Search…</span>
        </div>
        <Bell className="h-4 w-4 text-white/40" aria-hidden />
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(135deg,#8D4BFF,#D23AD9)] text-[10px] font-bold text-white">O</span>
      </div>

      <div className="flex">
        {/* sidebar */}
        <nav className="hidden w-[150px] shrink-0 flex-col gap-0.5 border-r border-white/[0.06] p-2.5 sm:flex">
          {nav.map((n) => (
            <span
              key={n.label}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-medium ${
                n.active ? 'bg-[linear-gradient(110deg,rgba(124,77,255,0.22),rgba(210,58,217,0.14))] text-white' : 'text-white/55'
              }`}
            >
              <n.icon className={`h-3.5 w-3.5 ${n.active ? 'text-violet-bright' : 'text-white/40'}`} aria-hidden />
              {n.label}
            </span>
          ))}
          {/* automations callout */}
          <div className="mt-2 rounded-xl border border-violet-bright/25 bg-[radial-gradient(circle_at_30%_0%,rgba(141,75,255,0.18),transparent)] p-2.5">
            <p className="text-[10px] font-semibold text-white/50">Automations</p>
            <TextGap />
            <p className="mt-0.5 font-heading text-[16px] font-bold text-white">46 <span className="text-[11px] font-medium text-white/60">flows</span></p>
            <TextGap />
            <p className="text-[10px] text-green">Running smoothly</p>
          </div>
        </nav>

        {/* main */}
        <div className="min-w-0 flex-1 p-3.5">
          <p className="mb-3 font-heading text-[15px] font-semibold text-white">Dashboard</p>

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                <p className="text-[10px] text-white/50">{k.label}</p>
                <TextGap />
                <p className="mt-1 font-heading text-[15px] font-bold text-white sm:text-[17px]">{k.value}</p>
                <TextGap />
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-semibold ${k.up ? 'text-green' : 'text-[#ff6b7a]'}`}>{k.delta}</span>
                  <svg viewBox="0 0 48 18" className="h-4 w-14" fill="none" aria-hidden>
                    <path d={k.spark} stroke={k.up ? '#38D39F' : '#ff6b7a'} strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* charts row */}
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-[1.5fr_1fr]">
            {/* sales bar chart */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="text-[11px] font-medium text-white/70">Sales Overview</p>
              <TextGap />
              <div className="mt-3 flex h-[86px] items-end gap-1.5">
                {bars.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-[3px] bg-[linear-gradient(180deg,#B96BFF,#7C4DFF)]"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[7px] text-white/35">{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* donut */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="text-[11px] font-medium text-white/70">Top Products</p>
              <TextGap />
              <div className="mt-2 flex items-center gap-3">
                <svg viewBox="0 0 36 36" className="h-[70px] w-[70px] -rotate-90" aria-hidden>
                  {donut.map((d) => {
                    const dash = `${d.pct} ${100 - d.pct}`;
                    const el = (
                      <circle
                        key={d.label}
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke={d.color}
                        strokeWidth="4"
                        strokeDasharray={dash}
                        strokeDashoffset={offset}
                      />
                    );
                    offset -= d.pct;
                    return el;
                  })}
                </svg>
                <ul className="space-y-1">
                  {donut.map((d) => (
                    <li key={d.label} className="flex items-center gap-1.5 text-[10px] text-white/60">
                      <span className="h-2 w-2 rounded-sm" style={{ background: d.color }} />
                      {d.label} <span className="text-white/40">{d.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* activity table */}
          <div className="mt-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
            <p className="text-[11px] font-medium text-white/70">Recent Activities</p>
            <TextGap />
            <ul className="mt-2 space-y-1.5">
              {activity.map((a) => (
                <li key={a.what} className="flex items-center gap-2 text-[11px]">
                  <span className={`h-1.5 w-1.5 rounded-full ${a.color.replace('text-', 'bg-')}`} aria-hidden />
                  <span className="flex-1 text-white/80">{a.what}</span>
                  <span className="hidden text-white/45 sm:inline">{a.who}</span>
                  <span className="text-white/35">{a.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
