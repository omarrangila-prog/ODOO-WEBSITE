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
  { id: 'software', label: 'software', recommendation: 'Custom Software', explanation: 'Software built around how your business actually works, instead of forcing your process into a generic product.', href: '/services/custom-software-development', cta: 'See custom software' },
  { id: 'ai', label: 'AI automation', recommendation: 'AI & Automation', explanation: 'AI agents and automated workflows that take the repetitive work off your team — connected to your real business data.', href: '/services/ai-automation', cta: 'See AI automation' },
  { id: 'odoo', label: 'Odoo or an ERP', recommendation: 'Odoo & ERP', explanation: 'Put sales, purchases, stock, accounts and reporting into one connected system your whole team works from.', href: '/services/odoo-implementation-pakistan', cta: 'See Odoo & ERP' },
  { id: 'web', label: 'a website or app', recommendation: 'Websites & Apps', explanation: 'Corporate sites, landing pages, e-commerce, portals and mobile apps — built around one clear business goal.', href: '/services/web-development', cta: 'See web & apps' },
  { id: 'marketing', label: 'marketing', recommendation: 'Marketing & Growth', explanation: 'Strategy, ads, campaigns, content and the lead-generation system behind them — measured on qualified enquiries.', href: '/services/digital-marketing', cta: 'See marketing' },
  { id: 'creative', label: 'ads and creative', recommendation: 'Creative Studio', explanation: 'Design, ad creative and campaign assets that make a complicated offer easy to understand quickly.', href: '/services/creative-media', cta: 'See creative' },
  { id: 'video', label: 'video', recommendation: 'Video & Animation', explanation: 'Product, corporate and explainer video, motion graphics and animation — scripted, shot and edited in house.', href: '/services/creative-media', cta: 'See video work' },
  { id: 'whatsapp', label: 'WhatsApp automation', recommendation: 'WhatsApp Automation', explanation: 'Instant replies, lead qualification, order updates and payment reminders — with leads written into your CRM.', href: '/services/whatsapp-automation', cta: 'See WhatsApp automation' },
  { id: 'system', label: 'a business system', recommendation: 'Business Systems', explanation: 'Accounting, POS, inventory, hospital, factory or another operational system — see exactly what each one covers.', href: '/solutions', cta: 'Browse solutions' },
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
            What can we help you <span className="signal-text">build?</span>
          </h2>
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
