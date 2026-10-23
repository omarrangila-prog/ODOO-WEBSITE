'use client';

import { MessageCircle, Mail, Phone, CalendarClock } from 'lucide-react';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { track } from '@/lib/analytics';

/**
 * The ways to reach us other than the form, labelled for what they really do.
 *
 * There is no booking system. Unless a scheduling URL is configured
 * (NEXT_PUBLIC_SCHEDULING_URL), "arrange a call" opens a WhatsApp message asking
 * for one, and is labelled that way. It is never called "Schedule" or "Book".
 */
export function EnquiryChannels() {
  const waConfigured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const wa = waConfigured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact#form';
  const callMsg = 'Hello ODOOVATIONS, I would like to arrange a call about a project.';
  const callHref = company.schedulingUrl || (waConfigured ? whatsappLink(company.whatsapp, callMsg) : '/contact#form');
  const callIsBooking = Boolean(company.schedulingUrl);

  const tile =
    'flex min-h-[64px] items-center gap-3 rounded-2xl border border-line bg-white/[0.02] px-3.5 py-2.5 no-underline transition-colors hover:border-violet-bright/40 hover:bg-white/[0.04]';
  const icon = 'grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line';

  return (
    <ul className="grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2">
      <li>
        <a href={wa} target={waConfigured ? '_blank' : undefined} rel={waConfigured ? 'noopener noreferrer' : undefined} className={tile} onClick={() => track('whatsapp_click', { source: 'enquiry' })}>
          <span className={`${icon} text-green`}><MessageCircle className="h-[18px] w-[18px]" aria-hidden /></span>
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold text-white">WhatsApp</span>
            <span className="block text-[12.5px] leading-snug text-text-dark-muted">Voice notes, files, screenshots</span>
          </span>
        </a>
      </li>
      <li>
        <a href={callHref} target={callIsBooking || waConfigured ? '_blank' : undefined} rel="noopener noreferrer" className={tile} onClick={() => track('scheduling_link_clicked', { source: 'enquiry', booking: callIsBooking })}>
          <span className={`${icon} text-amber`}><CalendarClock className="h-[18px] w-[18px]" aria-hidden /></span>
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold text-white">{callIsBooking ? 'Book a call' : 'Arrange a call'}</span>
            <span className="block text-[12.5px] leading-snug text-text-dark-muted">{callIsBooking ? 'Pick a time that suits you' : 'Asked on WhatsApp, no online booking'}</span>
          </span>
        </a>
      </li>
      <li>
        <a href={`mailto:${company.email}`} className={tile} onClick={() => track('email_click', { source: 'enquiry' })}>
          <span className={`${icon} text-cyan`}><Mail className="h-[18px] w-[18px]" aria-hidden /></span>
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold text-white">Email</span>
            <span className="block break-words text-[12.5px] leading-snug text-text-dark-muted">{company.email}</span>
          </span>
        </a>
      </li>
      <li>
        <a href={company.phoneHref} className={tile} onClick={() => track('phone_click', { source: 'enquiry' })}>
          <span className={`${icon} text-violet-bright`}><Phone className="h-[18px] w-[18px]" aria-hidden /></span>
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold text-white">Call</span>
            <span className="block text-[12.5px] leading-snug text-text-dark-muted">{company.phoneInternational}</span>
          </span>
        </a>
      </li>
    </ul>
  );
}
