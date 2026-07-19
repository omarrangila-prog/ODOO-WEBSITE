'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Phone } from 'lucide-react';
import { primaryNav } from '@/data/navigation';
import { company } from '@/data/company';
import { cn } from '@/lib/utilities';
import { track } from '@/lib/analytics';
import { ButtonLink, ArrowNudge } from '@/components/ui/Button';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0] || href);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium',
          scrolled
            ? 'border-b border-line bg-midnight/[0.92] backdrop-blur-xl shadow-lift'
            : 'border-b border-white/[0.05] bg-transparent',
        )}
      >
        <div className={cn('shell flex items-center justify-between transition-all duration-300', scrolled ? 'h-[70px]' : 'h-[84px]')}>
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = item.href !== '/' && isActive(item.href);
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && openMenu(item.label)}
                    onMouseLeave={() => item.children && scheduleClose()}
                  >
                    {item.children ? (
                      <>
                        <button
                          aria-expanded={openDropdown === item.label}
                          aria-haspopup="true"
                          onClick={() => setOpenDropdown((p) => (p === item.label ? null : item.label))}
                          className={cn(
                            'flex items-center gap-1 px-3.5 py-2 text-[14.5px] font-medium transition-colors',
                            active ? 'text-text-dark' : 'text-text-dark-muted hover:text-text-dark',
                          )}
                        >
                          {item.label}
                          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openDropdown === item.label && 'rotate-180')} aria-hidden />
                        </button>
                        {openDropdown === item.label && (
                          <div
                            className="absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3"
                            onMouseEnter={() => openMenu(item.label)}
                            onMouseLeave={scheduleClose}
                          >
                            <div className="animate-fade-up rounded-panel border border-line bg-graphite/95 p-2 shadow-float backdrop-blur-xl">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="block rounded-[14px] px-3.5 py-3 transition-colors hover:bg-white/[0.05]"
                                >
                                  <span className="block text-[14px] font-medium text-text-dark">{child.label}</span>
                                  {child.description && (
                                    <span className="mt-0.5 block text-[12.5px] leading-snug text-text-dark-muted">{child.description}</span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'relative px-3.5 py-2 text-[14.5px] font-medium transition-colors',
                          active ? 'text-text-dark' : 'text-text-dark-muted hover:text-text-dark',
                        )}
                      >
                        {item.label}
                        {active && (
                          <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-[linear-gradient(90deg,#9868FF,#E947C6)]" aria-hidden />
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions — quiet phone + refined CTA */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-text-dark-muted transition-colors hover:text-text-dark"
              aria-label={`Call us at ${company.phoneDisplay}`}
            >
              <Phone className="h-4 w-4 text-violet-bright" aria-hidden />
              {company.phoneDisplay}
            </a>
            <ButtonLink href="/contact" size="md" onClick={() => track('hero_cta_click')}>
              Get a Free Consultation
              <ArrowNudge className="h-4 w-4" />
            </ButtonLink>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-text-dark lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
