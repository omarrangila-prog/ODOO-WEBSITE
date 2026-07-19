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

const intents: Intent[] = [
  { id: 'implementation', label: 'A complete Odoo implementation', recommendation: 'Odoo Implementation', explanation: 'End-to-end setup of the modules your business needs, configured around your real workflow.', href: '/services/odoo-implementation-pakistan', cta: 'See implementation' },
  { id: 'fbr', label: 'FBR digital invoicing', recommendation: 'FBR-Ready Invoicing', explanation: 'Structure your billing, POS and sales data so it can connect to digital-invoicing requirements.', href: '/solutions/fbr-digital-invoicing-pakistan', cta: 'See FBR solution' },
  { id: 'custom', label: 'Custom Odoo development', recommendation: 'Custom Development', explanation: 'Precise custom modules for the gaps standard Odoo cannot cover — only where they add value.', href: '/services/custom-odoo-development', cta: 'See custom development' },
  { id: 'integration', label: 'to connect Odoo with another system', recommendation: 'Odoo Integration', explanation: 'Connect Odoo with e-commerce, WhatsApp, payments, couriers, banking and custom APIs.', href: '/services/odoo-integration', cta: 'See integration' },
  { id: 'support', label: 'Odoo support', recommendation: 'Support & Maintenance', explanation: 'Ongoing issue resolution, safe upgrades and continuous improvement after go-live.', href: '/services/odoo-support-maintenance', cta: 'See support' },
  { id: 'migration', label: 'Data migration', recommendation: 'Odoo Migration', explanation: 'Move from Excel or a legacy ERP with prepared, mapped and validated data.', href: '/services/odoo-migration', cta: 'See migration' },
  { id: 'ai', label: 'AI dashboards and reporting', recommendation: 'AI Dashboards', explanation: 'Turn the data Odoo already holds into live dashboards and AI-assisted insight.', href: '/solutions/odoo-ai-agents', cta: 'See AI dashboards' },
  { id: 'crm', label: 'Sales and CRM automation', recommendation: 'WhatsApp & CRM Automation', explanation: 'Automate lead follow-up, pipeline stages and WhatsApp conversations inside Odoo.', href: '/solutions/odoo-whatsapp-integration', cta: 'See CRM automation' },
  { id: 'compare', label: "to compare Odoo editions", recommendation: 'Community vs Enterprise', explanation: 'Understand the trade-offs and pick the edition that fits your features and budget.', href: '/resources/odoo-community-vs-enterprise', cta: 'Compare editions' },
  { id: 'unsure', label: "help deciding what I need", recommendation: 'Free Workflow Review', explanation: 'Tell us how your business runs today and we will point you to the right next step — no pressure.', href: '/contact#form', cta: 'Book a workflow review' },
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
            What do you need <span className="signal-text">help with?</span>
          </h2>
          <p className="lede mt-5">
            Pick what matches your situation. We&rsquo;ll point you straight to the right solution.
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
                  </h3>
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
                  Select an option and we&rsquo;ll recommend the right Odoo solution and next step.
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
