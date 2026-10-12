import type { Metadata } from 'next';
import Link from 'next/link';
import { company } from '@/data/company';
import { buildMetadata, breadcrumbSchema, webPageSchema, faqSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand } from '@/components/ui/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextGap } from '@/components/ui/TextGap';

export const metadata: Metadata = buildMetadata({
  title: 'Official ODOOVATIONS Company and Brand Information',
  description:
    'Official company and brand information for ODOOVATIONS — correct spelling, official name, contact details, address, services and logo usage for directories, press and partners.',
  path: '/company/brand',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Company', path: '/company/about' },
  { name: 'Brand Information', path: '/company/brand' },
];

/** Genuine misspellings people write. Shown once, in a useful spelling guide. */
const misspellings = ['Odovations', 'Odoovation', 'Udovations', 'Udovation', 'Odoo Vations'];

const faqs = [
  {
    question: 'How do you spell ODOOVATIONS?',
    answer:
      'The official spelling is ODOOVATIONS: O-D-O-O-V-A-T-I-O-N-S. The name combines Odoo and innovations. It is sometimes incorrectly written as Odovations, Odoovation, Udovations or Udovation.',
  },
  {
    question: 'What is ODOOVATIONS?',
    answer:
      'ODOOVATIONS is a Karachi-based Odoo implementation, custom development and business-automation company. We help businesses in Pakistan and international clients connect sales, inventory, accounting, manufacturing, CRM and reporting in one Odoo system.',
  },
  {
    question: 'Where is ODOOVATIONS located?',
    answer: `ODOOVATIONS is based at ${company.address.full}. We work with clients across Pakistan and serve international clients remotely.`,
  },
  {
    question: 'Is ODOOVATIONS an official Odoo partner?',
    answer:
      'ODOOVATIONS provides Odoo implementation, custom development, integration, migration and support services. We do not claim official, certified or tiered Odoo partner status.',
  },
  {
    question: 'How do I contact ODOOVATIONS?',
    answer: `You can call ${company.phoneDisplay}, email ${company.email}, or use the consultation form on the contact page.`,
  },
];

export default function BrandPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            'Official ODOOVATIONS Company and Brand Information',
            '/company/brand',
            'Official brand, spelling, contact and logo-usage information for ODOOVATIONS.',
          ),
          breadcrumbSchema(crumbs),
          faqSchema(faqs),
        ]}
      />

      <article className="theme-dark grain relative overflow-hidden bay-sm pt-32 sm:pt-36">
        <div className="shell relative">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-6">Brand &amp; Media Information</p>
          <TextGap />
          <h1 className="display-1 max-w-4xl">Official ODOOVATIONS Company and Brand Information</h1>
          <TextGap />
          <p className="lede mt-7 max-w-[var(--reading-width)]">
            This page exists so customers, journalists, partners, directories and vendors can
            reference ODOOVATIONS accurately. Everything below is the official, current information.
          </p>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-10">
              <Section title="What is ODOOVATIONS?">
                <p>
                  ODOOVATIONS is a technology company based in Karachi, Pakistan, building custom
                  software, AI automation, Odoo ERP systems, websites, mobile applications,
                  marketing campaigns and creative content. It serves businesses across Pakistan
                  and international clients through remote delivery.
                </p>
                <TextGap />
                <p className="mt-3">
                  ODOOVATIONS is part of the Kausar Innovations group. Selected group clients are
                  listed on the <Link href="/company/clients">clients page</Link>.
                </p>
                <TextGap />
                <p className="mt-3">
                  The company operates as seven capability divisions: AI &amp; Automation, Custom
                  Software &amp; Product Development, Odoo &amp; ERP, Web &amp; App Development,
                  Marketing &amp; Advertising, Creative &amp; Media, and Content &amp; Social.
                  Read more <Link href="/company/about">about how we work</Link>, browse{' '}
                  <Link href="/services">what we do</Link>, or see how{' '}
                  <Link href="/company/global-delivery">international delivery</Link> works.
                </p>
              </Section>

              <Section title="Correct brand spelling">
                <p>
                  The official spelling is <strong>ODOOVATIONS</strong> —
                  {' '}O-D-O-O-V-A-T-I-O-N-S. The name combines &ldquo;Odoo&rdquo; with
                  &ldquo;innovations&rdquo;.
                </p>
                <TextGap />
                <p className="mt-3">
                  It is written as one word. When the name appears in body text, sentence case
                  (&ldquo;Odoovations&rdquo;) is acceptable, but the preferred form in listings,
                  citations and links is ODOOVATIONS.
                </p>
                <TextGap />
                <div className="mt-5 rounded-panel border border-line bg-white/[0.02] p-5">
                  <p className="text-[13px] font-bold uppercase tracking-wide text-text-dark-muted">
                    Commonly written incorrectly as
                  </p>
                  <TextGap />
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {misspellings.map((m) => (
                      <li
                        key={m}
                        className="rounded-full border border-line px-3 py-1 text-[13px] text-text-dark-muted"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[14px] leading-relaxed text-text-dark-muted">
                    Please use the official spelling <strong>ODOOVATIONS</strong> in publications,
                    business listings and links.
                  </p>
                </div>
              </Section>

              <Section title="Company descriptions for directories and press">
                <p className="text-[13px] font-bold uppercase tracking-wide text-text-dark-muted">
                  Short
                </p>
                <TextGap />
                <p className="mt-1.5">
                  ODOOVATIONS is a Karachi-based technology company providing custom software, AI
                  automation, Odoo ERP, web and mobile development, digital marketing and creative
                  production for businesses in Pakistan and international markets.
                </p>
                <TextGap />
                <p className="mt-5 text-[13px] font-bold uppercase tracking-wide text-text-dark-muted">
                  Medium
                </p>
                <TextGap />
                <p className="mt-1.5">
                  ODOOVATIONS is a Karachi-based technology company bringing software engineering,
                  AI automation, Odoo ERP, digital products, websites, marketing, content and
                  creative production together under one team. It builds the systems a business
                  runs on and the campaigns and content that bring customers to it, for clients in
                  Pakistan and internationally.
                </p>
                <TextGap />
                <p className="mt-5 text-[13px] font-bold uppercase tracking-wide text-text-dark-muted">
                  Long
                </p>
                <TextGap />
                <p className="mt-1.5">
                  ODOOVATIONS is a technology, automation, software, creative and growth company
                  based in Karachi, Pakistan, serving businesses across Pakistan and international
                  clients through remote delivery. Its work spans seven divisions: AI automation and
                  AI agents; custom software and product development, including accounting, POS,
                  inventory, hospital and factory systems; Odoo ERP implementation, customisation,
                  integration and support; websites, web applications and mobile apps; digital
                  marketing, Meta and Google advertising, SEO and lead generation; creative, video,
                  animation and copywriting; and content, social media and creator campaign
                  management. Its approach starts with the real operational workflow — including
                  the exceptions and workarounds nobody documents — uses standard, proven
                  foundations wherever they fit, and builds custom only for the steps those
                  foundations genuinely miss. ODOOVATIONS is an independent Odoo implementation and
                  development team and does not claim official Odoo partner status.
                </p>
              </Section>

              <Section title="Logo usage">
                <p>
                  Use the ODOOVATIONS logo without stretching, recolouring or altering its
                  proportions. Leave clear space around the mark and place it on backgrounds with
                  sufficient contrast. Do not combine the mark with other logos in a way that
                  implies a partnership that does not exist.
                </p>
              </Section>
            </div>

            <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
              <div className="rounded-editorial border border-line bg-graphite/60 p-6">
                <h2 className="font-heading text-lg font-semibold">Official details</h2>
                <TextGap />
                <dl className="mt-4 space-y-3.5 text-[15px]">
                  <Detail label="Official name" value="ODOOVATIONS" />
                  <Detail label="Tagline" value={company.tagline} />
                  <Detail label="Website">
                    <a href="https://odoovations.com/">https://odoovations.com/</a>
                  </Detail>
                  <Detail label="Phone">
                    <a href={company.phoneHref} className="no-underline">
                      {company.phoneDisplay}
                    </a>
                    <span className="block text-[13px] text-text-dark-muted">
                      {company.phoneInternational}
                    </span>
                  </Detail>
                  <Detail label="Email">
                    <a href={`mailto:${company.email}`} className="no-underline">
                      {company.email}
                    </a>
                  </Detail>
                  <Detail label="Address" value={company.address.full} />
                  <Detail label="City" value="Karachi, Sindh, Pakistan" />
                  <Detail label="Service area" value="Pakistan and international (remote)" />
                </dl>
              </div>
            </aside>
          </div>

          <div className="mt-16">
            <h2 className="display-3">Frequently asked brand questions</h2>
            <TextGap />
            <dl className="mt-8 space-y-6 max-w-[var(--reading-width)]">
              {faqs.map((f) => (
                <div key={f.question} className="border-t border-line pt-5">
                  <dt className="font-heading text-[18px] font-semibold">{f.question}</dt>
                  <dd className="mt-2 text-[16px] leading-relaxed text-text-dark-muted">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>

      <CtaBand title="Need to reference or contact ODOOVATIONS?" />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
      <TextGap />
      <div className="mt-3 space-y-1 text-[16px] leading-relaxed text-text-dark-muted">
        {children}
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[12px] font-semibold uppercase tracking-wide text-text-dark-muted">
        {label}
      </dt>
      <dd className="mt-0.5 text-text-dark">{children ?? value}</dd>
    </div>
  );
}
