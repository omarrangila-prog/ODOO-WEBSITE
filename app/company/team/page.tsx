import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, webPageSchema } from '@/lib/seo';
import { ctas } from '@/data/ctas';
import {
  departmentGroups,
  departments,
  getDepartment,
  groupCountLabel,
  internPositions,
  seniorSupervisorExperience,
  verifiedUniqueEmployees,
  approvedProfiles,
} from '@/data/team';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { MaskedReveal } from '@/components/ui/motion/MaskedReveal';
import { DepartmentExplorer } from '@/components/team/DepartmentExplorer';
import { TeamStructure } from '@/components/team/TeamStructure';
import { TeamWorkflow } from '@/components/team/TeamWorkflow';

// Kept under the audit's 65-character limit, which it measures on the HTML-encoded
// title (each "&" counts as "&amp;"). The brief's "Our Team | …" version measured 66.
const TITLE = 'Our Team: Software, Odoo, AI & Creative Experts — ODOOVATIONS';
const DESCRIPTION =
  'Meet the multidisciplinary team behind ODOOVATIONS, spanning software development, Odoo ERP, AI automation, creative production, quality assurance and business operations.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: '/company/team' });

const differentiators = [
  { t: 'Software and Odoo expertise', b: 'Software engineering and a dedicated Odoo engineering department work on the same projects, so ERP work and custom software are planned together rather than handed between vendors.' },
  { t: 'Dedicated AI and creative capability', b: 'AI automation and LLM specialists, a data science role, video editors, motion specialists and designers sit in the same company as the engineers.' },
  { t: 'Quality and operational validation', b: 'QA testers check behaviour, and reviewers who understand accounting, inventory and process exceptions check that the logic matches how the business actually runs.' },
  { t: 'Coordinated infrastructure and delivery', b: 'Server and deployment operations are part of the project from the start, not a step discovered at the end.' },
];

export default function TeamPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Company', path: '/company/about' },
    { name: 'Our Team', path: '/company/team' },
  ];

  const leadership = getDepartment('executive-leadership');
  const people = approvedProfiles();
  const swInterns = getDepartment('software-engineering').roles.find((r) => r.intern);
  const aiInterns = getDepartment('ai-data').roles.find((r) => r.intern);
  const extended = getDepartment('extended-collaboration');

  return (
    <>
      <JsonLd data={[webPageSchema('Our Team', '/company/team', DESCRIPTION), breadcrumbSchema(crumbs)]} />

      {/* 1 — Hero */}
      <section className="theme-dark grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 arch-grid opacity-30" aria-hidden />
        <div className="pointer-events-none absolute right-[8%] top-1/4 h-[440px] w-[440px] radial-core opacity-70" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">The people behind ODOOVATIONS</p>{' '}
          <MaskedReveal
            as="h1"
            className="display-1 max-w-4xl"
            lines={[
              <span key="1">Great Technology Takes</span>,
              <span key="2">More Than <span className="signal-text">Great Developers.</span></span>,
            ]}
          />{' '}
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            Behind ODOOVATIONS is a multidisciplinary team spanning software engineering, Odoo ERP, artificial
            intelligence, creative production, quality assurance, infrastructure, sales and real-world business
            operations.
          </p>{' '}
          <p className="lede mt-4 max-w-[var(--reading-width)]">
            Different expertise. One shared goal: building systems that work in practice.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#departments">
              Explore Our Expertise
              <ArrowNudge />
            </ButtonLink>{' '}
            <ButtonLink href={ctas.general.href} variant="secondary">
              Discuss Your Project
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 2 — At a glance */}
      <section className="theme-light bay" aria-labelledby="glance-h">
        <div className="shell">
          <p className="eyebrow mb-5">Our team at a glance</p>{' '}
          <h2 id="glance-h" className="display-2 max-w-3xl">
            Eight areas of expertise, <span className="signal-text">one connected team.</span>
          </h2>{' '}
          <p className="lede mt-5 max-w-[var(--reading-width)]">
            Counts below are role positions reported by management. They are not a verified headcount: one person may
            hold more than one role, and the roster is still being confirmed.
          </p>

          {verifiedUniqueEmployees !== null && (
            <p className="mt-6 font-heading text-[clamp(28px,4vw,44px)] font-semibold text-ink">
              {verifiedUniqueEmployees} <span className="text-[18px] font-medium text-ink-muted">confirmed team members</span>
            </p>
          )}

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departmentGroups.map((g) => (
              <li key={g.id} className="rounded-editorial border border-line-light bg-ivory-soft p-5">
                <h3 className="font-heading text-[18px] font-semibold leading-snug text-ink">{g.label}</h3>{' '}
                <p className="mt-1 text-[14px] font-semibold text-violet">{groupCountLabel(g.id)}</p>{' '}
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{g.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — Leadership */}
      <section className="theme-graphite bay" aria-labelledby="leadership-h">
        <div className="shell">
          <p className="eyebrow mb-5">Leadership</p>{' '}
          <h2 id="leadership-h" className="display-2 max-w-3xl">{leadership.headline}</h2>{' '}
          <p className="lede mt-5 max-w-[var(--reading-width)]">{leadership.description}</p>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {leadership.roles.map((r) => (
              <li key={r.id} className="rounded-editorial border border-line p-6">
                <h3 className="font-heading text-[20px] font-semibold leading-snug">{r.title}</h3>{' '}
                <p className="mt-3 text-[15px] leading-relaxed text-text-dark-muted">{r.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[var(--reading-width)] text-[14px] leading-relaxed text-text-dark-muted">
            {people.length === 0
              ? 'Individual leadership profiles will appear here once names, photographs and permission to publish are confirmed.'
              : 'Individual profiles shown here have been approved for publication.'}
          </p>
        </div>
      </section>

      {/* 4 — Department explorer */}
      <section id="departments" className="theme-light bay scroll-mt-24" aria-labelledby="departments-h">
        <div className="shell">
          <p className="eyebrow mb-5">Department explorer</p>{' '}
          <h2 id="departments-h" className="display-2 max-w-3xl">
            Every department, <span className="signal-text">and what it does.</span>
          </h2>{' '}
          <p className="lede mt-5 mb-10 max-w-[var(--reading-width)]">
            Roles and counts come from one source of truth, so the numbers here match every other page that mentions
            them.
          </p>
          <DepartmentExplorer />
        </div>
      </section>

      {/* 5 — Structure */}
      <section className="theme-graphite bay" aria-labelledby="structure-h">
        <div className="shell">
          <p className="eyebrow mb-5">How the departments fit</p>{' '}
          <h2 id="structure-h" className="display-2 max-w-3xl">
            One company, <span className="signal-text">twelve departments.</span>
          </h2>
          <div className="mt-10 theme-light rounded-editorial p-5 sm:p-8">
            <TeamStructure />
          </div>
        </div>
      </section>

      {/* 6 — Workflow */}
      <section className="theme-light bay" aria-labelledby="workflow-h">
        <div className="shell">
          <p className="eyebrow mb-5">How our team works together</p>{' '}
          <h2 id="workflow-h" className="display-2 max-w-3xl">
            Developers are one part of <span className="signal-text">delivering a system that fits.</span>
          </h2>{' '}
          <p className="lede mt-5 mb-10 max-w-[var(--reading-width)]">
            Many software projects fail not for a missing feature but because the built workflow does not match how the
            business really operates. We pair developers with people who understand accounting, inventory and process.
          </p>
          <TeamWorkflow />
        </div>
      </section>

      {/* 7 — Experience */}
      <section className="theme-graphite bay" aria-labelledby="experience-h">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5">Experience &amp; mentorship</p>{' '}
            <h2 id="experience-h" className="display-2">
              Technology guided by <span className="signal-text">practical experience.</span>
            </h2>{' '}
            <p className="lede mt-5 max-w-[var(--reading-width)]">
              Our senior supervisory expertise brings decades of practical operational understanding into a development
              process that combines technology with business knowledge.
            </p>
          </div>
          <div className="rounded-editorial border border-line p-7 sm:p-9">
            <p className="font-heading text-[clamp(44px,7vw,72px)] font-semibold leading-none tracking-[-0.04em]">
              {seniorSupervisorExperience.reportedYears}
              <span className="ml-2 text-[clamp(18px,2.4vw,24px)] font-medium text-text-dark-muted">years</span>
            </p>{' '}
            <p className="mt-4 text-[15px] leading-relaxed text-text-dark-muted">
              of professional experience, reported for one senior supervisor on the team.
            </p>{' '}
            <p className="mt-3 text-[14px] leading-relaxed text-text-dark-muted">
              This is one individual’s experience. It is not the age of the company or the experience of the whole
              team. A name, history and photograph will be shown only once they have been confirmed and approved.
            </p>
          </div>
        </div>
      </section>

      {/* 8 — Interns */}
      <section className="theme-light bay" aria-labelledby="interns-h">
        <div className="shell">
          <p className="eyebrow mb-5">Internship &amp; professional development</p>{' '}
          <h2 id="interns-h" className="display-2 max-w-3xl">
            Learning alongside <span className="signal-text">experienced teams.</span>
          </h2>{' '}
          <p className="lede mt-5 max-w-[var(--reading-width)]">
            Interns take part in supervised development and learning activities inside their departments. They are not
            presented as senior engineers or as independently responsible for critical systems.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            <li className="rounded-editorial border border-line-light bg-ivory-soft p-6">
              <p className="font-heading text-[clamp(36px,5vw,52px)] font-semibold leading-none text-ink">{swInterns?.count}</p>{' '}
              <h3 className="mt-3 font-heading text-[18px] font-semibold text-ink">Software development interns</h3>{' '}
              <p className="mt-1 text-[15px] text-ink-muted">Within Software Engineering &amp; Development.</p>
            </li>
            <li className="rounded-editorial border border-line-light bg-ivory-soft p-6">
              <p className="font-heading text-[clamp(36px,5vw,52px)] font-semibold leading-none text-ink">{aiInterns?.count}</p>{' '}
              <h3 className="mt-3 font-heading text-[18px] font-semibold text-ink">AI automation interns</h3>{' '}
              <p className="mt-1 text-[15px] text-ink-muted">Within AI, LLMs, Automation &amp; Data Science.</p>
            </li>
          </ul>
          <p className="mt-5 text-[14px] text-ink-muted">
            {internPositions()} reported intern positions in total. No formal academy, accreditation or job-placement
            outcome is claimed.
          </p>
        </div>
      </section>

      {/* 9 — Extended collaborators */}
      <section className="theme-graphite bay" aria-labelledby="extended-h">
        <div className="shell">
          <p className="eyebrow mb-5">Extended collaboration network</p>{' '}
          <h2 id="extended-h" className="display-2 max-w-3xl">{extended.headline}</h2>{' '}
          <p className="lede mt-5 max-w-[var(--reading-width)]">{extended.description}</p>{' '}
          <p className="mt-4 max-w-[var(--reading-width)] text-[14px] leading-relaxed text-text-dark-muted">
            {extended.roles[0]?.note} {extended.caveat}
          </p>
        </div>
      </section>

      {/* 10 — Why this matters */}
      <section className="theme-light bay" aria-labelledby="why-h">
        <div className="shell">
          <p className="eyebrow mb-5">Why this team matters</p>{' '}
          <h2 id="why-h" className="display-2 max-w-3xl">
            Technical engineering. Real business understanding.{' '}
            <span className="signal-text">One connected team.</span>
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {differentiators.map((d) => (
              <li key={d.t} className="rounded-editorial border border-line-light bg-ivory-soft p-6">
                <h3 className="font-heading text-[19px] font-semibold text-ink">{d.t}</h3>{' '}
                <p className="mt-2 text-[16px] leading-relaxed text-ink-muted">{d.b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-ink-muted">
            See what the team has built on <Link href="/case-studies" className="font-medium text-violet underline underline-offset-4">our work page</Link>, or
            read about <Link href="/company/about" className="font-medium text-violet underline underline-offset-4">the company</Link>.
          </p>
        </div>
      </section>

      <CtaBand
        title="Let’s Put the Right Expertise Behind Your Project."
        body="Tell us what you’re trying to build, automate or improve. We’ll help you identify the right starting point."
        primaryLabel="Discuss Your Project"
        primaryHref={ctas.general.href}
        secondaryLabel="Explore Our Work"
        secondaryHref="/case-studies"
      />
    </>
  );
}
