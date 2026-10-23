'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { track } from '@/lib/analytics';

/** `inert` is not yet in React 18's attribute typings. */
function inertWhenHidden(visible: boolean): Record<string, string> {
  return visible ? {} : { inert: '' };
}

/**
 * Mobile-only sticky conversion bar: WhatsApp | Call | Enquire.
 * Appears after the user scrolls past the hero and hides near the footer so it
 * never covers legal content or the contact form's submit area.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 220;
      setVisible(y > 640 && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const waHref = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact#form';

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[var(--z-sticky)] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-300 lg:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      aria-hidden={!visible}
      {...inertWhenHidden(visible)}
    >
      <div className="glass mx-auto grid max-w-md grid-cols-3 gap-1.5 rounded-[22px] p-1.5">
        <a
          href={waHref}
          target={waConfigured ? '_blank' : undefined}
          rel={waConfigured ? 'noopener noreferrer' : undefined}
          onClick={() => track('whatsapp_click', { source: 'mobile_bar' })}
          className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl text-green transition-colors hover:bg-white/5"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-semibold text-text-dark">WhatsApp</span>
        </a>
        <a
          href={company.phoneHref}
          onClick={() => track('phone_click', { source: 'mobile_bar' })}
          className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl text-violet-bright transition-colors hover:bg-white/5"
        >
          <Phone className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-semibold text-text-dark">Call</span>
        </a>
        <Link
          href="/contact#form"
          onClick={() => track('hero_primary_cta_click', { source: 'mobile_bar' })}
          className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl bg-white text-[#050509]"
        >
          <CalendarCheck className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-semibold">Enquire</span>
        </Link>
      </div>
    </div>
  );
}
