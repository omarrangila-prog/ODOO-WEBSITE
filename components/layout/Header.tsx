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
          'fixed inset-x-0 top-0 z-[var(--z-header)] transition-all duration-300 ease-premium',
          scrolled
            ? 'border-b border-line bg-midnight/[0.92] backdrop-blur-xl shadow-lift'
            : 'border-b border-white/[0.05] bg-transparent',
        )}
      >
        <div className="site-header-shell flex h-[76px] items-center justify-between gap-4">
          <Logo compact className="shrink-0" />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden h-full min-w-0 xl:block">
            <ul className="flex h-full items-center">
              {primaryNav.map((item) => {
                const active = item.href !== '/' && isActive(item.href);
                return (
                  <li
                    key={item.label}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => item.children && openMenu(item.label)}
                    onMouseLeave={() => item.children && scheduleClose()}
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={openDropdown === item.label}
                          aria-haspopup="true"
                          onClick={() => setOpenDropdown((p) => (p === item.label ? null : item.label))}
                          className={cn(
                            'flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[14px] font-medium transition-colors hd:px-3 hd:text-[15px]',
                            active ? 'text-text-dark' : 'text-text-dark-muted hover:text-text-dark',
                          )}
                        >
                          {item.label}
                          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openDropdown === item.label && 'rotate-180')} aria-hidden />
                        </button>
                        {openDropdown === item.label && (
                          <div
                            className={cn(
                              'absolute left-1/2 top-full z-[var(--z-dropdown)] -translate-x-1/2 pt-3',
                              // Long menus (Industries, Solutions) go two-up so
                              // the panel does not run off the bottom of the screen.
                              item.children.length > 6 ? 'w-[620px]' : 'w-[340px]',
                            )}
                            onMouseEnter={() => openMenu(item.label)}
                            onMouseLeave={scheduleClose}
                          >
                            <div
                              className={cn(
                                'animate-fade-up rounded-panel border border-line bg-graphite/95 p-2 shadow-float backdrop-blur-xl',
                                item.children.length > 6 && 'grid grid-cols-2 gap-x-1',
                              )}
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="block rounded-[14px] px-3.5 py-3 transition-colors hover:bg-white/[0.05]"
                                >
                                  <span className="block text-[14px] font-medium text-text-dark">{child.label}</span>
                                  {child.description && (
                                    <>
                                      {' '}
                                      <span className="mt-0.5 block text-[13px] leading-snug text-text-dark-muted">{child.description}</span>
                                    </>
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
                          'relative whitespace-nowrap px-2 py-2 text-[14px] font-medium transition-colors hd:px-3 hd:text-[15px]',
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
          <div className="hidden shrink-0 items-center gap-4 xl:flex">
            <a
              href={company.phoneHref}
              className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-[14px] font-medium text-text-dark-muted transition-colors hover:text-text-dark hd:inline-flex"
              aria-label={`Call us at ${company.phoneDisplay}`}
            >
              <Phone className="h-4 w-4 text-violet-bright" aria-hidden />
              {company.phoneDisplay}
            </a>
            <ButtonLink href="/contact" size="md" onClick={() => track('hero_cta_click')}>
              Start a Project
              <ArrowNudge className="h-4 w-4" />
            </ButtonLink>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-text-dark xl:hidden"
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
