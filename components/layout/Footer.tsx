import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { footerNav } from '@/data/navigation';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { Logo } from './Logo';
import { CookiePrefsLink } from '@/components/leadintel/CookiePrefsLink';

const socialIcons = { linkedin: Linkedin, facebook: Facebook, instagram: Instagram, youtube: Youtube };

export function Footer() {
  const year = new Date().getFullYear();
  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact';

  const socials = (Object.entries(company.social) as [keyof typeof company.social, string][]).filter(([, url]) => Boolean(url));

  return (
    <footer className="theme-graphite border-t border-line">
      <div className="shell">
        {/*
          The footer carried its own "Ready to Build a Business System"
          statement with a Start the Conversation button. Every page that
          reaches it already ends with a call to action — nineteen templates
          render a CtaBand, and the homepage ends with the roadmap assembler —
          so it was a second ask immediately below the first, on every page of
          the site. Removed rather than hidden with CSS: display:none still
          leaves the text in textContent, which scrapers and AI retrieval read.
        */}
        {/* Navigation */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Logo />{' '}
            <p className="mt-5 text-[15px] leading-relaxed text-text-dark-muted">
              {company.positioningSupport}
            </p>{' '}
            <p className="mt-3 text-[13px] leading-relaxed text-text-dark-muted/80">
              Karachi, Pakistan &mdash; serving Pakistani and international clients.
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex items-center gap-2.5">
                {socials.map(([key, url]) => {
                  const Icon = socialIcons[key];
                  return (
                    <li key={key}>
                      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${company.name} on ${key}`} className="grid h-9 w-9 place-items-center rounded-full border border-line text-text-dark-muted transition-colors hover:border-violet-bright/40 hover:text-text-dark">
                        <Icon className="h-4 w-4" aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <FooterCol title="What We Do" links={[...footerNav.capabilities, ...footerNav.odoo.slice(0, 3)]} />{' '}
          <FooterCol title="Solutions" links={footerNav.solutions} />{' '}
          <FooterCol title="Company" links={[...footerNav.company, ...footerNav.locations]} />{' '}

          <div>
            <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-dark-muted">Contact</h3>{' '}
            <ul className="flex flex-col gap-3 text-[15px]">
              <li>
                <a href={company.phoneHref} className="inline-flex min-h-[44px] items-center gap-2.5 text-text-dark-muted hover:text-text-dark sm:min-h-0">
                  <Phone className="h-4 w-4 text-violet-bright" aria-hidden />{' '}
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="inline-flex min-h-[44px] items-center gap-2.5 text-text-dark-muted hover:text-text-dark sm:min-h-0">
                  <Mail className="h-4 w-4 text-cyan" aria-hidden />{' '}
                  {company.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-text-dark-muted">
                <MapPin className="h-4 w-4 text-magenta" aria-hidden />{' '}
                {company.address.full}
              </li>
              <li>
                <a href={waHref} target={waConfigured ? '_blank' : undefined} rel={waConfigured ? 'noopener noreferrer' : undefined} className="inline-flex min-h-[44px] items-center gap-2.5 text-text-dark-muted hover:text-text-dark sm:min-h-0">
                  <MessageCircle className="h-4 w-4 text-green" aria-hidden />{' '}
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-8 sm:flex-row sm:items-center">
          <p className="text-sm text-text-dark-muted">© {year} {company.name}. Serving Pakistan and international clients.</p>{' '}
          <div className="flex items-center gap-5 text-sm">
            <Link href="/privacy" className="inline-flex min-h-[44px] items-center text-text-dark-muted hover:text-text-dark sm:min-h-0">Privacy Policy</Link>{' '}
            <Link href="/terms" className="inline-flex min-h-[44px] items-center text-text-dark-muted hover:text-text-dark sm:min-h-0">Terms</Link>{' '}
            <CookiePrefsLink />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-dark-muted">{title}</h3>{' '}
      <ul className="flex flex-col gap-0.5 text-[15px] sm:gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-text-dark-muted hover:text-text-dark sm:min-h-0"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
