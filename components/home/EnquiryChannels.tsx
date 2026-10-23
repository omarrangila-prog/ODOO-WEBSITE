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

  const row =
    'flex min-h-[56px] items-center gap-3.5 rounded-2xl border border-line bg-white/[0.02] px-4 py-3 transition-colors hover:border-violet-bright/40 hover:bg-white/[0.04]';
  const icon = 'grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line';

  return (
    <ul className="space-y-2.5">
      <li>
        <a href={wa} target={waConfigured ? '_blank' : undefined} rel={waConfigured ? 'noopener noreferrer' : undefined} className={`${row} no-underline`} onClick={() => track('whatsapp_click', { source: 'enquiry' })}>
          <span className={`${icon} text-green`}><MessageCircle className="h-5 w-5" aria-hidden /></span>
          <span>
            <span className="block text-[15px] font-semibold text-white">Message us on WhatsApp</span>
            <span className="block text-[13px] text-text-dark-muted">Fastest way to share a voice note, file or screenshot.</span>
          </span>
        </a>
      </li>
      <li>
        <a href={callHref} target={callIsBooking || waConfigured ? '_blank' : undefined} rel="noopener noreferrer" className={`${row} no-underline`} onClick={() => track('scheduling_link_clicked', { source: 'enquiry', booking: callIsBooking })}>
          <span className={`${icon} text-amber`}><CalendarClock className="h-5 w-5" aria-hidden /></span>
          <span>
            <span className="block text-[15px] font-semibold text-white">{callIsBooking ? 'Book a discovery call' : 'Ask to arrange a call on WhatsApp'}</span>
            <span className="block text-[13px] text-text-dark-muted">{callIsBooking ? 'Pick a time that suits you.' : 'We reply with times that work. There is no online booking yet.'}</span>
          </span>
        </a>
      </li>
      <li>
        <a href={`mailto:${company.email}`} className={`${row} no-underline`} onClick={() => track('email_click', { source: 'enquiry' })}>
          <span className={`${icon} text-cyan`}><Mail className="h-5 w-5" aria-hidden /></span>
          <span>
            <span className="block text-[15px] font-semibold text-white">Email {company.email}</span>
            <span className="block text-[13px] text-text-dark-muted">For longer briefs and documents.</span>
          </span>
        </a>
      </li>
      <li>
        <a href={company.phoneHref} className={`${row} no-underline`} onClick={() => track('phone_click', { source: 'enquiry' })}>
          <span className={`${icon} text-violet-bright`}><Phone className="h-5 w-5" aria-hidden /></span>
          <span>
            <span className="block text-[15px] font-semibold text-white">Call {company.phoneInternational}</span>
            <span className="block text-[13px] text-text-dark-muted">Best reached during Pakistan business hours.</span>
          </span>
        </a>
      </li>
    </ul>
  );
}
