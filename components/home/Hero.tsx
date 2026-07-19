import { Boxes, Blocks, Zap, LifeBuoy } from 'lucide-react';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/motion/Magnetic';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { HeroDashboardVisual } from './HeroDashboardVisual';

const capabilities = [
  { icon: Boxes, label: 'Implementation', sub: 'Sales, stock, accounts connected' },
  { icon: Blocks, label: 'Custom Modules', sub: 'For the steps standard Odoo misses' },
  { icon: Zap, label: 'Automation', sub: 'Approvals & follow-ups on autopilot' },
  { icon: LifeBuoy, label: 'Support', sub: 'A real person after go-live' },
];

const industries = ['Manufacturing', 'Textile', 'Distribution', 'Retail', 'Professional Services'];

export function Hero() {
  return (
    <section className="theme-dark grain relative isolate overflow-hidden">
      {/* Layered background — uses theme tokens so it adapts to OS light/dark */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 90% at 78% 35%, var(--graphite) 0%, var(--midnight) 60%)' }}
        />
        <div className="absolute inset-0 arch-grid opacity-[0.4]" />
        <div className="absolute right-[14%] top-[30%] h-[560px] w-[640px] -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(124,77,255,0.22),transparent_68%)]" />
        <div className="absolute bottom-0 right-[8%] h-[360px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(210,58,217,0.12),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: 'linear-gradient(to bottom, var(--midnight), transparent)' }} />
      </div>

      <div className="shell relative grid min-h-[860px] items-center gap-12 py-28 pt-36 lg:grid-cols-12 lg:gap-16 lg:py-0 lg:pt-24">
        {/* Left content — 5 cols */}
        <div className="lg:col-span-5">
          <span className="eyebrow-pill mb-7">
            <span className="status-dot" aria-hidden />
            <MaskedReveal as="span">Odoo Implementation · Karachi</MaskedReveal>
          </span>

          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[0.98] tracking-[-0.045em] text-[clamp(44px,4.6vw,68px)]"
            stagger={0.08}
            lines={[
              <span key="1">Run Your Whole</span>,
              <span key="2">Business in{' '}
                <span className="bg-[linear-gradient(90deg,#7A4DFF,#A85DF5_48%,#E04ACF)] bg-clip-text text-transparent">
                  One System.
                </span>
              </span>,
            ]}
          />

          <p className="mt-7 max-w-[46ch] text-[clamp(17px,1.35vw,19px)] leading-[1.62] text-text-dark/85">
            Sales on WhatsApp, stock in Excel, invoices on paper. We move it all into one Odoo
            system&mdash;so your team stops chasing updates and starts seeing them in real time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <ButtonLink href="/contact#form" className="min-h-[54px] text-[15.5px]">
                Show Us Your Workflow
                <ArrowNudge />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/#services" variant="secondary" className="min-h-[54px] text-[15.5px] border-[rgba(170,110,255,0.4)]">
              See How It Works
              <ArrowNudge className="h-[18px] w-[18px]" />
            </ButtonLink>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[13px] text-text-dark-muted">
            <span className="h-1 w-1 rounded-full bg-[#B77AFF]" aria-hidden />
            No pitch&mdash;send a voice note or a spreadsheet and we&rsquo;ll map your next step.
          </p>

          {/* Capability row */}
          <ul className="mt-12 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:max-w-lg">
            {capabilities.map((c) => (
              <li
                key={c.label}
                className="group flex items-center gap-3.5 rounded-[16px] border border-white/[0.06] bg-white/[0.015] p-2.5 pr-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.03]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border border-white/[0.07] bg-[linear-gradient(145deg,rgba(27,30,45,0.96),rgba(12,14,23,0.96))] text-violet-bright shadow-[-6px_-6px_18px_rgba(67,48,104,0.1),8px_10px_22px_rgba(0,0,0,0.5),inset_1px_1px_0_rgba(255,255,255,0.05)] transition-transform group-hover:scale-105">
                  <c.icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13.5px] font-semibold text-text-dark">{c.label}</span>
                  <span className="mt-0.5 block text-[11.5px] leading-tight text-text-dark-muted">{c.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right visual — 7 cols */}
        <div className="lg:col-span-7 lg:pl-4">
          <HeroDashboardVisual />
        </div>
      </div>

      {/* Trusted-by industry strip */}
      <div className="shell relative pb-16">
        <div className="glass flex flex-col items-center gap-5 rounded-[20px] px-8 py-5 sm:flex-row sm:justify-between sm:px-10">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-dark/70">
            Odoo work we do across
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {industries.map((n, i) => (
              <li key={n} className="flex items-center gap-x-6">
                {i > 0 && <span className="hidden h-3.5 w-px bg-white/10 sm:block" aria-hidden />}
                <span className="text-[14px] font-medium text-text-dark/60 transition-colors hover:text-text-dark/90">
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
