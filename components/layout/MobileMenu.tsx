'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, MessageCircle } from 'lucide-react';
import { primaryNav } from '@/data/navigation';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink, cn } from '@/lib/utilities';
import { ButtonLink } from '@/components/ui/Button';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previousActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])');
    focusables?.[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previousActive?.focus();
    };
  }, [open, onClose]);

  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact';

  return (
    <div className={cn('fixed inset-0 z-[100] lg:hidden', open ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!open}>
      <div
        className={cn('absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={cn(
          'absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-line bg-graphite shadow-2xl transition-transform duration-300 ease-premium safe-b',
          open ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <span className="eyebrow">Menu</span>
          <button onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-line text-text-dark hover:bg-white/5">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="px-4 pb-4">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.label} className="border-b border-line/60">
                {item.children ? (
                  <>
                    <button
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded((p) => (p === item.label ? null : item.label))}
                      className="flex w-full items-center justify-between px-2 py-4 text-left"
                    >
                      <span className="font-heading text-lg font-medium">{item.label}</span>
                      <ChevronDown className={cn('h-5 w-5 text-violet-bright transition-transform', expanded === item.label && 'rotate-180')} aria-hidden />
                    </button>
                    {expanded === item.label && (
                      <ul className="pb-3 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} onClick={onClose} className="block rounded-lg px-2 py-3 text-[15px] text-text-dark-muted hover:bg-white/5 hover:text-text-dark">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.href} onClick={onClose} className="block px-2 py-4 font-heading text-lg font-medium hover:text-violet-bright">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 px-2">
            <ButtonLink href="/contact" onClick={onClose} fullWidth>
              Build My Odoo Roadmap
            </ButtonLink>
            <ButtonLink href={waHref} external={waConfigured} variant="secondary" fullWidth>
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
              Talk on WhatsApp
            </ButtonLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
