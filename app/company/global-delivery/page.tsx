import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Video, FileText, Clock3, ShieldCheck, Languages } from 'lucide-react';
import { company } from '@/data/company';
import { countries, priorityCountryCodes, flagEmoji } from '@/data/countries';
import { verifiedCountries } from '@/data/global-projects';
import { buildMetadata, breadcrumbSchema, webPageSchema, faqSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnswerCard } from '@/components/ui/AnswerCard';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { CtaBand } from '@/components/ui/CtaBand';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';

const PATH = '/company/global-delivery';
const DESCRIPTION =
  'How ODOOVATIONS delivers software, automation and creative projects to international clients from Karachi — remote discovery, async communication, shared documentation, testing, deployment and support.';

export const metadata: Metadata = buildMetadata({
  title: 'Built in Pakistan, Delivered Worldwide | ODOOVATIONS',
  description: DESCRIPTION,
  path: PATH,
});

const practices = [
  {
    icon: Video,
    title: 'Remote discovery that is actually thorough',
    body: 'Structured discovery sessions over video, with screen sharing and recordings so anyone who missed a call can catch up without a second meeting. We walk through your existing systems on screen rather than asking you to describe them.',
  },
  {
    icon: FileText,
    title: 'Written documentation as the source of truth',
    body: 'Scope, decisions and open questions live in a shared document you can read at any hour, not in someone’s memory of a call. When there is a time-zone gap, the document is what closes it.',
  },
  {
    icon: Clock3,
    title: 'Deliberate time-zone overlap',
    body: 'Pakistan Standard Time is UTC+5. We agree a fixed overlap window with your team up front — for Gulf clients that is most of the working day, for UK and Europe a solid afternoon, for North America an early-morning or late-evening slot that we commit to rather than improvise.',
  },
  {
    icon: ShieldCheck,
    title: 'Access handled properly',
    body: 'Credentials shared through a password manager, named accounts rather than shared logins, access scoped to what the work needs and revoked at handover. Data-handling terms agreed in writing before the project starts.',
  },
  {
    icon: Languages,
    title: 'English and Urdu',
    body: 'Project communication, documentation and training run in professional English. Where your Pakistani team is more comfortable in Urdu, training and support can run in Urdu without the documentation changing language.',
  },
  {
    icon: MapPin,
    title: 'One team, not a subcontracting chain',
    body: 'The people you meet in discovery are the people who build it. We do not pass work down a chain of subcontractors you never meet and cannot ask questions of.',
  },
];

const faqs = [
  {
    question: 'Do you have offices outside Pakistan?',
    answer:
      'No. ODOOVATIONS operates from one office in Karachi and serves international clients remotely. We would rather say that plainly than list addresses in cities where we have no staff — which is a common practice and worth checking with any agency you are considering.',
  },
  {
    question: 'How do time zones actually work in practice?',
    answer:
      'Pakistan is UTC+5. That gives near-complete overlap with the Gulf, a good working overlap with the UK and Europe, and a narrower but workable window with North America. We fix the overlap window at kickoff and hold it, and structure the rest of the work asynchronously so progress does not depend on both sides being awake.',
  },
  {
    question: 'How do we know work is progressing?',
    answer:
      'Through a shared project document, an agreed update cadence, and access to a working environment where you can see the build as it happens rather than waiting for a demo at the end.',
  },
  {
    question: 'What about contracts and payments for international clients?',
    answer:
      'We work to a written agreement covering scope, milestones, payment terms, confidentiality, data handling and intellectual property ownership. International payment arrangements are confirmed before the project starts.',
  },
  {
    question: 'Is our data safe with an offshore team?',
    answer:
      'It depends on the arrangements, which is why we make them explicit. We agree what data we access, where it is stored, who on our side has access, and what happens at handover. Where data sensitivity requires it, we work in your environment rather than taking copies into ours.',
  },
  {
    question: 'Do you offer 24/7 support?',
    answer:
      'We accept enquiries around the clock and respond during Pakistan business hours, plus the overlap window agreed with your team. We do not staff a human support desk 24 hours a day and will not claim otherwise. For projects that genuinely need overnight cover, that is a specific arrangement we scope and price separately.',
  },
];

export default function GlobalDeliveryPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company/about' },
    { name: 'Global Delivery', path: PATH },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          webPageSchema('Global Delivery', PATH, DESCRIPTION),
          faqSchema(faqs),
        ]}
      />

      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[6%] top-1/4 h-[460px] w-[460px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Global delivery</p>
          <MaskedReveal
            as="h1"
            className="font-heading font-[650] leading-[1.0] tracking-[-0.045em] text-[clamp(40px,5vw,72px)] max-w-4xl"
            lines={[
              <span key="1">Built in Pakistan.</span>,
              <span key="2">Delivered <span className="signal-text">Worldwide.</span></span>,
            ]}
          />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            One team, one office, and a way of working built for clients who are not in the room.
          </p>

          <AnswerCard
            question="Where is ODOOVATIONS based and who does it serve?"
            className="mt-12 max-w-[var(--reading-width)] border-line text-text-dark-muted"
          >
            ODOOVATIONS is based at {company.address.full}, and serves clients across Pakistan and
            internationally through remote delivery. We have one office and no overseas branches.
            International projects run on remote discovery, shared written documentation, an
            agreed time-zone overlap, cloud collaboration, remote testing, deployment, training
            and ongoing support.
          </AnswerCard>
        </div>
      </section>

      <section className="theme-light bay-sm">
        <div className="shell">
          <h2 className="display-2">How a remote project runs</h2>
          <p className="lede mt-5 max-w-[var(--reading-width)]">
            The same methodology we use locally, with the communication designed around distance
            rather than fighting it.
          </p>
          <FlowDiagram
            label="Discovery to support, remotely"
            steps={[
              'Remote discovery',
              'Written scope',
              'Shared environment',
              'Build in sprints',
              'Remote demo & testing',
              'Deployment',
              'Training',
              'Support',
            ]}
            note="You see a working environment throughout, so progress is something you can check rather than something you are told about."
            className="mt-12 text-ink"
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {practices.map((p) => (
              <article
                key={p.title}
                className="rounded-editorial border border-line-light bg-white/60 p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-control bg-[linear-gradient(120deg,#7C4DFF,#E947C6)] text-white">
                  <p.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-[20px] font-semibold leading-snug tracking-[-0.02em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service area. This is where we ACCEPT work from — deliberately
          separate from where we can evidence delivered work, which is the
          verified list in data/global-projects.ts. */}
      <section className="theme-light bay-sm">
        <div className="shell">
          <p className="eyebrow mb-5">Where we deliver</p>
          <h2 className="display-2 max-w-3xl">Remote delivery is available to clients in any country.</h2>
          <p className="lede mt-5 max-w-[var(--reading-width)]">
            The list below is where we accept projects from &mdash; it is not a claim of work
            already delivered. Verified project locations are shown separately, and today that
            list is{' '}
            {verifiedCountries.map((c) => c.countryName).join(', ')}.
          </p>

          <div className="mt-10">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Markets we work with most
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {priorityCountryCodes.map((code) => {
                const c = countries.find((x) => x.code === code);
                return c ? (
                  <li
                    key={c.code}
                    className="inline-flex items-center gap-2 rounded-full border border-line-light bg-white/60 px-3.5 py-1.5 text-[14px] text-ink"
                  >
                    <span aria-hidden>{flagEmoji(c.code)}</span>
                    {c.name}
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          {/* Native disclosure: no JavaScript, keyboard-accessible, and the
              full list stays in the HTML for anyone who wants to search it. */}
          <details className="group mt-8 rounded-editorial border border-line-light bg-white/60 p-6">
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
              All {countries.length} countries we accept projects from
              <span className="text-[13px] font-medium text-ink-muted transition-transform group-open:rotate-180" aria-hidden>
                &#9662;
              </span>
            </summary>
            <ul className="mt-5 columns-2 gap-x-8 text-[14.5px] leading-[1.9] text-ink-muted sm:columns-3 lg:columns-4">
              {countries.map((c) => (
                <li key={c.code} className="break-inside-avoid">
                  <span className="mr-2" aria-hidden>{flagEmoji(c.code)}</span>
                  {c.name}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <section className="theme-graphite bay-sm">
        <div className="shell max-w-[var(--reading-width)]">
          <h2 className="display-2">What we will not claim</h2>
          <p className="lede mt-6">
            We have one office, in Karachi. We do not list addresses in Dubai, London or New York
            to look larger than we are, we do not present automated enquiry intake as a staffed
            24-hour support desk, and we do not have offshore partners we describe as our own
            team. If a capability matters to your project and we do not have it, we will say so
            and help you find who does.
          </p>
          <p className="mt-6 text-[16px] leading-relaxed text-text-dark-muted">
            Read more about{' '}
            <Link href="/company/methodology" className="text-violet-bright underline underline-offset-4">
              how we run projects
            </Link>{' '}
            or{' '}
            <Link href="/company/about" className="text-violet-bright underline underline-offset-4">
              who we are
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="theme-dark bay-sm">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="display-2">Common questions</h2>
          <Accordion items={faqs} allowMultiple />
        </div>
      </section>

      <CtaBand
        title="Working from another time zone?"
        body="Tell us where you are and what you need built. We will propose an overlap window and a way of working before we talk about scope."
        primaryLabel="Start a Remote Project"
      />
    </>
  );
}
