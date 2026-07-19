import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { footerNav } from '@/data/navigation';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
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
        {/* Top conversion statement */}
        <div className="grid gap-8 border-b border-line py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <h2 className="font-heading text-[clamp(34px,4vw,58px)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Ready to Build a Business System That{' '}
            <span className="signal-text">Actually Fits?</span>
          </h2>
          <div className="lg:justify-self-end">
            <ButtonLink href="/contact#form">
              Start the Conversation
              <ArrowNudge />
            </ButtonLink>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr_1.1fr_1.3fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-[14.5px] leading-relaxed text-text-dark-muted">
              A Pakistan-based Odoo implementation and development team helping businesses automate,
              integrate and grow with confidence.
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

          <FooterCol title="Company" links={[...footerNav.company, ...footerNav.locations]} />
          <FooterCol title="Services" links={[...footerNav.services, ...footerNav.solutions]} />

          <div>
            <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-dark-muted">Contact</h3>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              <li>
                <a href={company.phoneHref} className="inline-flex items-center gap-2.5 text-text-dark-muted hover:text-text-dark">
                  <Phone className="h-4 w-4 text-violet-bright" aria-hidden />
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 text-text-dark-muted hover:text-text-dark">
                  <Mail className="h-4 w-4 text-cyan" aria-hidden />
                  {company.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-text-dark-muted">
                <MapPin className="h-4 w-4 text-magenta" aria-hidden />
                {company.address.full}
              </li>
              <li>
                <a href={waHref} target={waConfigured ? '_blank' : undefined} rel={waConfigured ? 'noopener noreferrer' : undefined} className="inline-flex items-center gap-2.5 text-text-dark-muted hover:text-text-dark">
                  <MessageCircle className="h-4 w-4 text-green" aria-hidden />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-8 sm:flex-row sm:items-center">
          <p className="text-sm text-text-dark-muted">© {year} {company.name}. Serving Pakistan and international clients.</p>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/privacy" className="text-text-dark-muted hover:text-text-dark">Privacy Policy</Link>
            <Link href="/terms" className="text-text-dark-muted hover:text-text-dark">Terms</Link>
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
      <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-dark-muted">{title}</h3>
      <ul className="flex flex-col gap-2.5 text-[14.5px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-text-dark-muted hover:text-text-dark">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
