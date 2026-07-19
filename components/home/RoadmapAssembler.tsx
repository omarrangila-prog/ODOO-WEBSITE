'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mic, Upload, CalendarClock, X, Sparkles } from 'lucide-react';
import { frictionItems, computeFriction } from '@/data/calculator';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { track } from '@/lib/analytics';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/motion/Magnetic';
import { useRoadmap } from './RoadmapContext';

/**
 * Final section: assembles the visitor's selected workflow problems (chosen in
 * the diagnostic above) into a personalised roadmap request. The selections
 * are carried into the contact form via the URL so nothing is re-typed.
 */
export function RoadmapAssembler() {
  const { problems, toggle } = useRoadmap();
  const reduce = useReducedMotion();
  const selected = frictionItems.filter((f) => problems.has(f.id));
  const result = computeFriction([...problems]);

  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact#form';
  const scheduleHref = company.schedulingUrl || waHref;

  const params = new URLSearchParams();
  params.set('issues', [...problems].join(','));
  if (result) params.set('friction', result.status);
  const roadmapHref = `/contact?${params.toString()}#form`;

  return (
    <section id="roadmap" className="theme-dark grain relative scroll-mt-24 overflow-hidden bay">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 arch-grid opacity-25" />
        <svg className="absolute inset-0 h-full w-full opacity-50" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="raSig" x1="0" x2="1">
              <stop offset="0%" stopColor="#7C4DFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#7C4DFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E947C6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[32, 50, 68].map((y) => (
            <path key={y} d={`M0 ${y} C 35 ${y - 8} 65 ${y + 8} 100 ${y}`} fill="none" stroke="url(#raSig)" strokeWidth="0.2" />
          ))}
        </svg>
      </div>

      <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Left: message */}
        <div>
          <p className="eyebrow mb-6">Your Personalised Roadmap</p>
          <h2 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
            Bring Us the Mess.
            <br />
            <span className="signal-text">We&rsquo;ll Assemble the System.</span>
          </h2>
          <p className="lede mt-6 max-w-md">
            Send a voice note, spreadsheet, screenshot or a plain description of where your business
            is struggling. We&rsquo;ll turn it into a clear next step.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink href={roadmapHref} onClick={() => track('roadmap_request', { source: 'assembler', count: problems.size })}>
                Request My Odoo Roadmap
                <ArrowNudge />
              </ButtonLink>
            </Magnetic>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            <Pathway icon={Mic} label="WhatsApp voice note" href={waHref} external={waConfigured} onClick={() => track('whatsapp_click')} />
            <Pathway icon={Upload} label="Upload your workflow" href="/contact#form" />
            <Pathway icon={CalendarClock} label="Schedule a call" href={scheduleHref} external={Boolean(company.schedulingUrl)} onClick={() => track('scheduling_link_clicked')} />
          </ul>

          <p className="mt-8 inline-flex items-center gap-2 text-[13px] text-text-dark-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse-soft" aria-hidden />
            No sales pressure. Start with a practical discussion.
          </p>
        </div>

        {/* Right: the assembled brief */}
        <div className="rounded-editorial border border-line bg-graphite/60 p-7 shadow-float sm:p-8">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-violet-bright">
            <Sparkles className="h-4 w-4" aria-hidden />
            Your workflow brief
          </div>

          {selected.length === 0 ? (
            <div className="mt-6 rounded-control border border-dashed border-line p-6 text-center">
              <p className="text-[14.5px] leading-relaxed text-text-dark-muted">
                No friction points selected yet. Choose the challenges in the{' '}
                <Link href="#friction" className="text-violet-bright underline-offset-4 hover:underline">
                  diagnostic above
                </Link>{' '}
                and they&rsquo;ll assemble here into a roadmap request.
              </p>
            </div>
          ) : (
            <div className="mt-6" aria-live="polite">
              <p className="text-[14px] text-text-dark-muted">
                You&rsquo;ve flagged <span className="font-semibold text-text-dark">{selected.length}</span>{' '}
                friction point{selected.length === 1 ? '' : 's'}
                {result && (
                  <>
                    {' '}&mdash; a control reading of{' '}
                    <span className="font-semibold text-text-dark">{result.status}</span>.
                  </>
                )}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {selected.map((item) => (
                    <motion.li
                      key={item.id}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                    >
                      <button
                        onClick={() => toggle(item.id)}
                        className="group inline-flex items-center gap-2 rounded-full border border-violet-bright/40 bg-violet/[0.1] py-1.5 pl-3.5 pr-2.5 text-[13px] font-medium text-text-dark transition-colors hover:border-violet-bright/70"
                        aria-label={`Remove ${item.label}`}
                      >
                        {item.label}
                        <X className="h-3.5 w-3.5 text-text-dark-muted transition-colors group-hover:text-text-dark" aria-hidden />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <div className="mt-6 rounded-control border border-line bg-white/[0.02] p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-text-dark-muted">Recommended start</p>
                <p className="mt-1 font-heading text-[15px] font-medium text-violet-bright">Operations &amp; Workflow Discovery</p>
              </div>

              <p className="mt-4 text-[12px] leading-relaxed text-text-dark-muted">
                These selections travel into the contact form&mdash;nothing to re-type.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Pathway({
  icon: Icon,
  label,
  href,
  external,
  onClick,
}: {
  icon: typeof Mic;
  label: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const cls = 'inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-4 py-2 text-[13px] font-medium text-text-dark-muted transition-colors hover:border-violet-bright/40 hover:text-text-dark';
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>
          <Icon className="h-4 w-4 text-violet-bright" aria-hidden />
          {label}
        </a>
      ) : (
        <Link href={href} onClick={onClick} className={cls}>
          <Icon className="h-4 w-4 text-violet-bright" aria-hidden />
          {label}
        </Link>
      )}
    </li>
  );
}
