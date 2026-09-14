'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';

interface Intent {
  id: string;
  label: string;
  recommendation: string;
  explanation: string;
  href: string;
  cta: string;
}

/**
 * Problem-first entry points spanning every division.
 *
 * Phrased as "I need ..." in the language a business owner would use, not in
 * ours — somebody who wants a shop till should not have to know the words
 * "point of sale system" to find it.
 */
const intents: Intent[] = [
  { id: 'sales', label: 'to manage my sales', recommendation: 'Sales & Purchase Software', explanation: 'Quotations, orders, deliveries, invoices and receipts in one flow — with customer balances you can trust.', href: '/solutions/sales-purchase-software', cta: 'See sales software' },
  { id: 'purchases', label: 'to manage purchases', recommendation: 'Sales & Purchase Software', explanation: 'Purchase orders, supplier bills, payments and stock receipts recorded once and connected to accounts.', href: '/solutions/sales-purchase-software', cta: 'See purchase software' },
  { id: 'stock', label: 'to control my stock', recommendation: 'Inventory Management', explanation: 'Stock that matches the shelf — barcode receiving and picking, multi-warehouse, batch and expiry, reorder rules.', href: '/solutions/inventory-management', cta: 'See inventory software' },
  { id: 'accounts', label: 'to manage accounts', recommendation: 'Accounting Software', explanation: 'What you sold, what you bought, who owes you, what you owe and what is in stock — in one connected system.', href: '/solutions/accounting-software', cta: 'See accounting software' },
  { id: 'whatsapp', label: 'to automate WhatsApp', recommendation: 'WhatsApp Automation', explanation: 'Instant replies, lead qualification, order updates and payment reminders — with every lead saved to your CRM.', href: '/services/whatsapp-automation', cta: 'See WhatsApp automation' },
  { id: 'software', label: 'custom software', recommendation: 'Custom Software', explanation: 'Software built around how your business actually works, instead of forcing your process into a generic product.', href: '/services/custom-software-development', cta: 'See custom software' },
  { id: 'automate', label: 'to automate repetitive work', recommendation: 'AI & Automation', explanation: 'AI agents and automated workflows that take the repetitive work off your team — connected to real business data.', href: '/services/ai-automation', cta: 'See AI automation' },
  { id: 'factory', label: 'to manage my factory', recommendation: 'Factory Operations Automation', explanation: 'Production orders, job cards, material tracking, quality checks and live shop-floor reporting.', href: '/solutions/factory-automation', cta: 'See factory automation' },
  { id: 'trade', label: 'to manage imports / exports', recommendation: 'Trading Software', explanation: 'Orders, shipments, containers, documents, landed cost, currencies and reconciliation — from order to payment.', href: '/solutions/trading-software', cta: 'See trading software' },
  { id: 'pos', label: 'to build a POS', recommendation: 'POS Software', explanation: 'Make the sale, print the bill and update stock at the same time — single shop or multi-branch.', href: '/solutions/pos-software', cta: 'See POS software' },
  { id: 'hospital', label: 'to manage a hospital / clinic', recommendation: 'Hospital Management', explanation: 'Registration, appointments, OPD and IPD, billing, pharmacy and laboratory on one patient record.', href: '/solutions/hospital-management-system', cta: 'See hospital software' },
  { id: 'custom', label: 'something custom', recommendation: 'Tell Us the Problem', explanation: 'Some requirements do not have a product name yet. Describe what is going wrong and we will work out what to build.', href: '/contact#form', cta: 'Describe my requirement' },
];

export function IntentSelector() {
  const [active, setActive] = useState<Intent | null>(null);
  const reduce = useReducedMotion();

  function select(intent: Intent) {
    setActive(intent);
    track('intent_selector_used', { intent: intent.id });
  }

  return (
    <section id="intent" className="theme-graphite grain relative overflow-hidden bay-sm">
      <div className="pointer-events-none absolute left-[8%] top-1/4 h-[420px] w-[460px] radial-core opacity-50" aria-hidden />
      <div className="shell relative">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Start Here</p>
          <h2 className="display-2">
            What do you want to <span className="signal-text">improve?</span>
          </h2>{' '}
          <p className="lede mt-5">
            Pick whichever is closest. We&rsquo;ll point you at the right part of the team &mdash;
            and if none of them fit, the last option is the one to use.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Options */}
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {intents.map((intent) => (
              <li key={intent.id}>
                <button
                  type="button"
                  onClick={() => select(intent)}
                  aria-pressed={active?.id === intent.id}
                  data-active={active?.id === intent.id}
                  className={cn(
                    'neu flex w-full items-center gap-3 rounded-control px-4 py-3.5 text-left text-[14.5px] font-medium transition-colors min-h-[52px]',
                    active?.id === intent.id ? 'text-text-dark' : 'text-text-dark-muted hover:text-text-dark',
                  )}
                >
                  <span
                    className={cn(
                      'grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold',
                      active?.id === intent.id ? 'border-violet-bright bg-violet/20 text-violet-bright' : 'border-line-strong text-text-dark-muted',
                    )}
                    aria-hidden
                  >
                    {active?.id === intent.id ? '✓' : ''}
                  </span>
                  I need {intent.label.charAt(0).toLowerCase() + intent.label.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          {/* Recommendation panel */}
          <div className="glass sticky top-24 h-fit rounded-editorial p-7" aria-live="polite">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-dark-muted">
              Recommended for you
            </p>
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mt-3 font-heading text-[clamp(1.5rem,2.4vw,2rem)] font-semibold signal-text">
                    {active.recommendation}
                  </h3>{' '}
                  <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">{active.explanation}</p>
                  <Link
                    href={active.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-control bg-[linear-gradient(100deg,#7C4DFF,#9868FF_45%,#E947C6)] px-5 py-3 text-[15px] font-semibold text-white shadow-cta transition-transform hover:-translate-y-0.5"
                  >
                    {active.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </motion.div>
              ) : (
                <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">
                  Select an option and we&rsquo;ll recommend where to start.
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
