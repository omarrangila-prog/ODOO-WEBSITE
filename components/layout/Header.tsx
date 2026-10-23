'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { primaryNav, groupChildren, type NavItem } from '@/data/navigation';
import { cn } from '@/lib/utilities';
import { track } from '@/lib/analytics';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

/**
 * Floating navigation, as in the approved design: the logo at the left and a
 * centred pill of five items. The pill carries its own translucent surface so
 * the header needs no full-width bar; a soft fade behind it appears on scroll
 * to keep the logo legible over page content.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  /** The item whose menu was opened by a click or key press, as opposed to by hover. */
  const clickOpened = useRef<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close an open dropdown on route change, on an outside click and on Escape.
  useEffect(() => setOpenDropdown(null), [pathname]);
  // Whatever closed it, the next open starts fresh.
  useEffect(() => {
    if (!openDropdown) clickOpened.current = null;
  }, [openDropdown]);
  useEffect(() => {
    if (!openDropdown) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    // Escape dismisses from anywhere: a menu opened by hover has no focus inside it,
    // and WCAG 1.4.13 asks for a way to dismiss without moving the pointer.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const inside = navRef.current?.contains(document.activeElement);
      const trigger = navRef.current?.querySelector<HTMLElement>(`[data-nav="${openDropdown}"]`);
      setOpenDropdown(null);
      clickOpened.current = null;
      if (inside) trigger?.focus();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openDropdown]);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    // Moving to a different menu releases a click-held one.
    if (clickOpened.current && clickOpened.current !== label) clickOpened.current = null;
    setOpenDropdown(label);
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => {
      // A menu the visitor opened by click stays open until dismissed.
      if (clickOpened.current) return;
      setOpenDropdown(null);
    }, 140);
  }

  const isActive = (item: NavItem) => {
    const prefixes = item.match ?? [item.href];
    return prefixes.some((p) => (p === '/' ? pathname === '/' : pathname === p || pathname.startsWith(p + '/')));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[var(--z-header)]">
        {/* Legibility fade behind the floating elements once the page scrolls. */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[132px] bg-gradient-to-b from-midnight via-midnight/70 to-transparent transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          className="relative mx-auto flex items-center justify-between"
          style={{
            paddingInline: 'calc(var(--frame-inset) + clamp(16px, 3.6vw, 66px))',
            paddingTop: 'calc(var(--frame-inset) + clamp(10px, 1.5vw, 20px))',
          }}
        >
          <Logo compact className="shrink-0" />

          {/* Desktop: centred floating pill */}
          <nav
            ref={navRef}
            aria-label="Primary"
            className="absolute left-1/2 top-[calc(var(--frame-inset)+clamp(10px,1.5vw,20px))] hidden -translate-x-1/2 lg:block"
          >
            <ul className="flex items-center gap-0.5 rounded-full border border-white/[0.13] bg-midnight/85 p-1.5 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md">
              {primaryNav.map((item) => {
                const active = isActive(item);
                const open = openDropdown === item.label;
                const itemClass = cn(
                  'relative flex min-h-[40px] items-center gap-1 whitespace-nowrap rounded-full px-4 text-[14px] font-normal transition-colors',
                  active ? 'text-white' : 'text-text-dark-muted hover:bg-white/[0.06] hover:text-white',
                  open && 'bg-white/[0.06] text-white',
                );
                const dot = active && (
                  <span
                    className="absolute -bottom-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-bright shadow-[0_0_8px_rgba(196,168,255,0.9)]"
                    aria-hidden
                  />
                );
                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => item.children && openMenu(item.label)}
                    onMouseLeave={() => item.children && scheduleClose()}
                    onBlur={(e) => {
                      if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenDropdown(null);
                    }}
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-haspopup="true"
                          data-nav={item.label}
                          onClick={() => {
                            if (open && clickOpened.current === item.label) {
                              setOpenDropdown(null);
                              clickOpened.current = null;
                            } else {
                              // Opened by hover already? Keep it open instead of toggling it shut.
                              clickOpened.current = item.label;
                              openMenu(item.label);
                            }
                          }}
                          className={itemClass}
                        >
                          {item.label}
                          <ChevronDown className={cn('h-3.5 w-3.5 opacity-70 transition-transform', open && 'rotate-180')} aria-hidden />
                          {dot}
                        </button>
                        {open && (
                          <div
                            className="absolute left-1/2 top-full z-[var(--z-dropdown)] -translate-x-1/2 pt-4"
                            onMouseEnter={() => openMenu(item.label)}
                            onMouseLeave={scheduleClose}
                          >
                            <div
                              className={cn(
                                'animate-fade-up rounded-[26px] border border-white/[0.12] bg-surface-dark p-3 shadow-float',
                                item.children.some((c) => c.group)
                                  ? cn('grid gap-x-2', groupChildren(item.children).length >= 4 ? 'w-[min(1120px,calc(100vw-96px))] grid-cols-4' : groupChildren(item.children).length === 3 ? 'w-[min(900px,calc(100vw-96px))] grid-cols-3' : 'w-[min(640px,calc(100vw-96px))] grid-cols-2')
                                  : 'w-[360px]',
                              )}
                            >
                              {groupChildren(item.children).map((g) => (
                                <div key={g.heading ?? 'all'} className="min-w-0">
                                  {g.heading && (
                                    <p className="px-3.5 pb-1.5 pt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-text-dark-muted">
                                      {g.heading}
                                    </p>
                                  )}
                                  {g.items.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setOpenDropdown(null)}
                                      className="block rounded-[14px] px-3.5 py-2.5 transition-colors hover:bg-white/[0.06]"
                                    >
                                      <span className="block text-[14px] font-medium text-text-dark">{child.label}</span>
                                      {child.description && (
                                        <>
                                          {' '}
                                          <span className="mt-0.5 block text-[12.5px] leading-snug text-text-dark-muted">{child.description}</span>
                                        </>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link href={item.href} aria-current={active ? 'page' : undefined} className={itemClass}>
                        {item.label}
                        {dot}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop: quiet action in the same fine-border language */}
          <Link
            href="/contact"
            onClick={() => track('hero_cta_click')}
            className="hidden min-h-[44px] items-center gap-2 rounded-full border border-white/[0.16] px-5 text-[14px] text-text-dark transition-colors hover:border-violet-bright/60 hover:bg-white/[0.05] lg:inline-flex"
          >
            Start a project <span aria-hidden className="text-[13px]">↗</span>
          </Link>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.16] bg-midnight/55 text-text-dark backdrop-blur-md lg:hidden"
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
