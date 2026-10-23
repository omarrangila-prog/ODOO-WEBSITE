import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Zap, CalendarClock, Gauge, CircleAlert } from 'lucide-react';
import { buildMetadata, breadcrumbSchema, webPageSchema, faqSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { CtaBand } from '@/components/ui/CtaBand';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { TextGap } from '@/components/ui/TextGap';
import { PageArt } from '@/components/cinema/PageArt';

const PATH = '/rapid-delivery';
const DESCRIPTION =
  'Fast-track delivery tracks for selected websites, landing pages, prototypes, dashboards, automations, creative assets and software modules. Delivery dates are confirmed after scope review.';

export const metadata: Metadata = buildMetadata({
  title: 'Rapid Delivery Studio | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

/**
 * Delivery tracks.
 *
 * Every entry states what it covers AND what it excludes. The exclusions are
 * not a disclaimer bolted on the end — they are the reason the promise is
 * credible at all. Nothing here guarantees a date before scope is reviewed.
 */
const tracks = [
  {
    icon: Zap,
    name: 'Express',
    window: 'Hours, within an agreed working day',
    fits: [
      'Design and content changes to an existing page',
      'Landing-page copy and layout revisions',
      'A single dashboard or report',
      'A small, self-contained automation',
      'Technical fixes on a site we can access',
    ],
    excludes:
      'Anything needing new integrations, third-party approvals or access we do not already have.',
  },
  {
    icon: Clock,
    name: 'Same-day',
    window: 'Started and delivered the same working day',
    fits: [
      'A single landing page from an agreed brief',
      'A working prototype of one workflow',
      'Campaign creative from existing brand assets',
      'One automation workflow between systems with ready APIs',
      'A focused software module with a defined input and output',
    ],
    excludes:
      'Content we are still waiting on, credentials we do not have yet, and anything that needs a client approval round we cannot schedule that day.',
  },
  {
    icon: CalendarClock,
    name: '24-hour',
    window: 'Delivered within one working day of a confirmed brief',
    fits: [
      'A small website with supplied content',
      'An MVP proving a single core function',
      'An internal tool for one team and one task',
      'A campaign system: landing page, form, tracking and CRM handoff',
      'A clickable prototype for a pitch or investor meeting',
    ],
    excludes:
      'Payment gateway or courier integrations requiring merchant approval, app store submissions, and anything depending on a third party’s timeline.',
  },
  {
    icon: Gauge,
    name: 'Fast-track project',
    window: 'Priority engineering capacity on a compressed schedule',
    fits: [
      'Larger software, AI and ERP projects with a hard external deadline',
      'A phased build where one phase must land early',
      'Recovering a project that has fallen behind',
    ],
    excludes:
      'Skipping discovery, testing or data validation. We compress a schedule by assigning more capacity and working in parallel — not by removing the steps that stop a system failing in production.',
  },
];

const notRushed = [
  'Financial and accounting systems where a wrong number is expensive and invisible',
  'Data migration — bad data moved quickly is just bad data, faster',
  'Anything touching patient, payment or personal data',
  'Multi-department ERP go-live across a whole business',
  'Integrations where a third party controls the approval timeline',
  'Security-sensitive work, which needs review rather than speed',
];

const faqs = [
  {
    question: 'Are you claiming you can build anything in a day?',
    answer:
      'No. Rapid delivery applies to selected, well-defined scopes where the requirement is clear, we have the access and content we need, and the work does not depend on a third party. A full ERP implementation, a hospital system or a multi-integration platform cannot responsibly be delivered that way, and we will tell you so rather than take the booking.',
  },
  {
    question: 'What actually makes it fast?',
    answer:
      'Three things: a scope that is genuinely fixed before we start, everything we need available on day one (content, brand assets, credentials, a decision-maker who can approve), and a reusable engineering foundation we are not rebuilding each time. Where any of the three is missing, the honest answer is that it will not be fast.',
  },
  {
    question: 'Does rushing mean lower quality?',
    answer:
      'It would if we compressed the schedule by removing testing or review. We do not. We compress it by narrowing scope and assigning more people, which is why rapid tracks have firm boundaries on what they include.',
  },
  {
    question: 'What does rapid delivery cost?',
    answer:
      'Priority capacity is priced accordingly, because it means reordering other committed work. You get the figure with the scope confirmation, before anything starts.',
  },
  {
    question: 'What if you cannot meet the deadline?',
    answer:
      'We say so before you commit, not after. If a review says the deadline is not achievable for the full scope, we will tell you what can realistically be delivered by that date and what would have to follow later, so you can decide.',
  },
  {
    question: 'Do you work weekends and nights for urgent projects?',
    answer:
      'For genuine deadline situations, and by agreement. It is not our default operating mode and we do not present it as one.',
  },
];

export default function RapidDeliveryPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Rapid Delivery', path: PATH },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema('Rapid Delivery Studio', PATH, DESCRIPTION),
          faqSchema(faqs),
        ]}
      />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <PageArt variant={0} />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Rapid Delivery Studio</p>
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">When the Deadline</span>,
              <span key="2">Is <span className="signal-text">Tomorrow.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Selected digital projects can move from requirement to working output dramatically
            faster through our rapid-delivery workflow. Not everything qualifies &mdash; and the
            page below is honest about which things do not.
          </p>

          <AnswerCard
            question="What is the Rapid Delivery Studio?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            A fast-track workflow for well-defined digital scopes: landing pages, prototypes,
            dashboards, campaign assets, single automations and focused software modules.
            ODOOVATIONS reviews the requirement first and confirms a delivery commitment after
            that review. We do not guarantee a date before seeing the scope, and we do not apply
            rapid tracks to work where speed would create real risk.
          </AnswerCard>
        </div>
      </section>

      {/* Tracks */}
      <section className="theme-light bay-sm">
        <div className="shell">
          <h2 className="display-2">Four delivery tracks</h2>
          <TextGap />
          <p className="lede mt-5 max-w-[var(--reading-width)]">
            Each track lists what it covers and what it does not. Read the exclusions &mdash;
            they are what make the rest of it credible.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {tracks.map((t) => (
              <article
                key={t.name}
                className="flex flex-col rounded-editorial border border-line-light bg-white/[0.035] p-7 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-control bg-[linear-gradient(120deg,#6a3df0,#8247f5)] text-white">
                    <t.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-heading text-[22px] font-semibold tracking-[-0.02em] text-ink">
                      {t.name}
                    </h3>
                    <TextGap />
                    <p className="text-[14px] text-ink-muted">{t.window}</p>
                  </div>
                </div>

                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  Typically fits
                </p>
                <TextGap />
                <ul className="mt-3 space-y-2">
                  {t.fits.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[16px] leading-relaxed text-ink-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex items-start gap-2.5 border-t border-line-light pt-5 text-[15px] leading-relaxed text-ink-muted">
                  <CircleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0 text-magenta" aria-hidden />
                  <span>
                    <strong className="font-semibold text-ink">Does not include: </strong>
                    {t.excludes}
                  </span>
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-[var(--reading-width)] rounded-panel border border-line-light bg-white/[0.035] p-6 text-[16px] leading-relaxed text-ink-muted">
            <strong className="font-semibold text-ink">How delivery dates are set.</strong>{' '}
            Delivery times depend on scope, access, integrations, approvals and testing
            requirements. A final delivery commitment is confirmed after we review the project
            &mdash; never before. Nothing on this page is a guarantee of a date for work we have
            not yet seen.
          </p>
        </div>
      </section>

      {/* What we will not rush */}
      <section className="theme-graphite bay-sm">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="display-2">What we will not rush</h2>
            <TextGap />
            <p className="lede mt-5">
              Speed is a feature until it becomes a liability. These are the things where we will
              recommend the normal schedule, even if you would rather hear otherwise.
            </p>
          </div>
          <ul className="space-y-4 lg:pt-3">
            {notRushed.map((n) => (
              <li
                key={n}
                className="flex items-start gap-3.5 border-b border-line pb-4 text-[17px] leading-relaxed text-text-dark-muted last:border-b-0"
              >
                <CircleAlert className="mt-1 h-5 w-5 shrink-0 text-amber" aria-hidden />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qualifier */}
      <section className="theme-light bay-sm">
        <div className="shell max-w-[var(--reading-width)]">
          <h2 className="display-2">What do you need, and when do you need it?</h2>
          <TextGap />
          <p className="lede mt-5">
            Send the requirement and the deadline. We will come back with whether it fits a rapid
            track, what would have to be true for it to, and what we would deliver by when.
          </p>
          <TextGap />
          <ul className="mt-8 space-y-2.5 text-[16px] text-ink-muted">
            {[
              'What you need built',
              'The deadline you are working to',
              'Anything already written down — a brief, a screenshot, a spreadsheet, a voice note',
              'Budget range, so we can suggest a scope that fits it',
              'How to reach you: WhatsApp or email',
            ].map((i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[16px] text-ink-muted">
            The{' '}
            <Link href="/contact#form" className="text-violet underline underline-offset-4">
              contact form
            </Link>{' '}
            takes all of it, including file uploads. Set &ldquo;How soon do you need it?&rdquo; to
            your real deadline &mdash; that is what routes it to a rapid review.
          </p>
        </div>
      </section>

      <section className="theme-dark bay-sm">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="display-2">Common questions</h2>
          <TextGap />
          <Accordion items={faqs} allowMultiple />
        </div>
      </section>

      <CtaBand
        title="Check rapid delivery availability"
        body="Tell us what you need and when you need it. We will review the scope and tell you honestly whether the deadline is achievable."
        primaryLabel="Check Rapid Delivery"
      />
    </>
  );
}
