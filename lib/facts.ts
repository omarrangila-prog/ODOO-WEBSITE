/**
 * THE COMPANY FACT SHEET
 *
 * One list of plain, checkable statements about ODOOVATIONS, built from the data
 * files that the rest of the site already reads. The brand page renders it for
 * people, /llms.txt and /llms-full.txt render it for language models, and the
 * Organization schema draws on the same sources, so the three can never disagree.
 *
 * Every line here is either taken from a data file or is a statement of what the
 * company does NOT claim. Nothing is added for the benefit of a crawler.
 */
import { company } from '@/data/company';
import { services } from '@/data/services';
import { platformPages } from '@/data/platforms';
import { teamTotals } from '@/data/team';
import { publishableProjects } from '@/data/projects';
import { publishedCaseStudies } from '@/data/case-study-model';
import { SITE_URL } from './seo';

export interface Fact {
  label: string;
  value: string;
  href?: string;
}

export function companyFacts(): Fact[] {
  const t = teamTotals();
  const clientProjects = publishableProjects().filter((p) => p.status === 'CLIENT_PROJECT');
  const pages = new Set(publishedCaseStudies().map((r) => r.slug));
  return [
    { label: 'Official name', value: 'ODOOVATIONS (one word; also written Odoovations)' },
    { label: 'What it is', value: company.description },
    { label: 'Based in', value: `${company.address.street}, ${company.address.city}, ${company.address.region}, ${company.address.country}` },
    { label: 'Serves', value: 'Businesses in Pakistan, and international clients through remote delivery. One office; no offices in other cities or countries.' },
    { label: 'Group', value: 'Part of the Kausar Innovations group.', href: '/company/clients' },
    {
      label: 'Team',
      value: t.confirmedUnique
        ? `${t.total} team members across ${t.roleTypes} role titles.`
        : `${t.positions} team positions reported by management (including ${t.interns} intern positions) across ${t.roleTypes} role titles and ${t.departments} counted departments. Positions, not a verified headcount.`,
      href: '/company/team',
    },
    { label: 'Divisions', value: 'AI & automation; custom software and product development; Odoo & ERP; websites, web and mobile apps; marketing and advertising; creative and media; content and social.' },
    { label: 'Odoo status', value: 'Independent Odoo implementation and development team. Does not claim official, certified or tiered Odoo partner status.' },
    { label: 'Platforms', value: `Builds on and integrates ${platformPages.map((p) => p.name).join(', ')}, Odoo and the WhatsApp Business Platform. No official partnership with any of them is claimed.`, href: '/platforms' },
    { label: 'QuickBooks', value: 'Integration and software work only. No bookkeeping, accounting services or tax advice.', href: '/platforms/quickbooks' },
    {
      label: 'Client projects',
      value: clientProjects.map((p) => p.name).join('; ') + '. Confirmed by management; outcomes are published only with evidence.',
      href: '/case-studies',
    },
    ...clientProjects.filter((p) => pages.has(p.id)).map((p) => ({ label: `Project: ${p.name}`, value: p.purpose ?? p.summary ?? '', href: `/projects/${p.id}` })),
    { label: 'Languages', value: 'English and Urdu.' },
    { label: 'Pricing', value: 'Quoted against a written scope after discovery; no public category price list.', href: '/company/pricing' },
    { label: 'Support hours', value: 'People reply during Pakistan business hours. Enquiries are received at any time; no round-the-clock human support is offered.' },
    { label: 'Contact', value: `${company.email} · ${company.phoneInternational} · WhatsApp ${company.phoneInternational}`, href: '/contact' },
    { label: 'Website', value: `${SITE_URL}/` },
  ];
}

/** What ODOOVATIONS does not do or claim. Stated so no one has to guess. */
export const notClaimed = [
  'Official, certified or tiered Odoo partner status.',
  'Official partnership with Shopify, WooCommerce, WordPress or QuickBooks.',
  'Bookkeeping, accounting services, tax advice or tax filing.',
  'Round-the-clock human support.',
  'Guaranteed search rankings, return on investment or FBR approval.',
  'Awards, ratings or testimonials it cannot name and evidence.',
];

/** Service summaries for machine readers: the answer-first paragraph of every service page. */
export function serviceSummaries() {
  return services.map((s) => ({ title: s.title, href: s.href, summary: s.answer ?? s.intro }));
}
