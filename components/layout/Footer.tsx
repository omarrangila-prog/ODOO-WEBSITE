import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { footerNav } from '@/data/navigation';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { Logo } from './Logo';
import { CookiePrefsLink } from '@/components/leadintel/CookiePrefsLink';
import { FooterColumns } from './FooterColumns';

const socialIcons = { linkedin: Linkedin, facebook: Facebook, instagram: Instagram, youtube: Youtube };

export function Footer() {
  const year = new Date().getFullYear();
  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact';

  const socials = (Object.entries(company.social) as [keyof typeof company.social, string][]).filter(([, url]) => Boolean(url));

  return (
    <footer className="theme-graphite relative overflow-hidden border-t border-line">
      <div className="shell" style={{ paddingInline: 'calc(var(--frame-inset) + clamp(20px, 4.6vw, 88px))' }}>
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
        <div className="grid gap-x-8 gap-y-6 py-10 md:grid-cols-2 md:gap-y-10 md:py-12 lg:grid-cols-3 xl:grid-cols-[minmax(240px,1.2fr)_repeat(4,minmax(0,1fr))_minmax(190px,1fr)]">
          <div className="order-1 max-w-sm md:order-none">
            <Logo />{' '}
            <p className="mt-6 font-heading text-[clamp(16px,1.25vw,19px)] font-medium leading-snug tracking-[-0.015em] text-text-dark">
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

          <FooterColumns>
            <FooterCol n="01" title="What We Do" links={[...footerNav.capabilities, ...footerNav.odoo.slice(0, 3)]} />{' '}
            <FooterCol n="02" title="Solutions" links={footerNav.solutions} />{' '}
            <FooterCol n="03" title="Platforms" links={footerNav.platforms} />{' '}
            <FooterCol n="04" title="Company" links={[...footerNav.company, ...footerNav.locations]} />{' '}
          </FooterColumns>

          <div className="order-2 md:order-none">
            <h2 className="hero-eyebrow mb-5 flex items-center gap-3 !text-[11px]">
              <span aria-hidden className="text-violet/80">05</span>
              <span aria-hidden className="h-px w-5 bg-violet/50" />
              Contact
            </h2>{' '}
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[15px] md:flex-col md:gap-3">
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
          <p className="text-sm text-text-dark-muted">© {year} {company.name}. All rights reserved.</p>{' '}
          <div className="flex items-center gap-5 text-sm">
            <Link href="/privacy" className="inline-flex min-h-[44px] items-center text-text-dark-muted hover:text-text-dark sm:min-h-0">Privacy Policy</Link>{' '}
            <Link href="/terms" className="inline-flex min-h-[44px] items-center text-text-dark-muted hover:text-text-dark sm:min-h-0">Terms</Link>{' '}
            <CookiePrefsLink />
          </div>
        </div>
      </div>

      {/* The closing wordmark: decorative, soft violet, fading into the wall. */}
      <div
        aria-hidden="true"
        className="footer-wordmark pointer-events-none select-none"
        style={{ paddingBottom: 'calc(var(--frame-inset) + 4px)' }}
      >
        ODOOVATIONS
      </div>
    </footer>
  );
}

function FooterCol({ n, title, links }: { n: string; title: string; links: { label: string; href: string }[] }) {
  return (
    <details open className="group order-3 border-b border-line md:order-none md:border-0">
      {/*
        The heading is an h2 inside the summary. These label footer navigation groups, so they
        sit directly under the page h1, and on pages whose main content has no h2 of its own,
        such as /contact, an h3 here skipped a level and failed heading-order. FooterColumns
        folds the group on a phone and keeps it open (and inert) on a desktop.
      */}
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 md:pointer-events-none md:min-h-0 md:cursor-default [&::-webkit-details-marker]:hidden">
        <h2 className="hero-eyebrow flex items-center gap-3 !text-[11px] md:mb-5">
          <span aria-hidden className="text-violet/80">{n}</span>
          <span aria-hidden className="h-px w-5 bg-violet/50" />
          {title}
        </h2>
        <span aria-hidden className="text-text-dark-muted transition-transform group-open:rotate-180 md:hidden">&#9662;</span>
      </summary>
      <ul className="flex flex-col gap-0.5 pb-3 text-[15px] md:gap-1.5 md:pb-0 xl:text-[14.5px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-text-dark-muted transition-all duration-300 hover:translate-x-1 hover:text-white md:min-h-0"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
