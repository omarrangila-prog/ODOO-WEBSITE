'use client';

import { MessageCircle } from 'lucide-react';
import { company, PLACEHOLDER } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { track } from '@/lib/analytics';
import { ButtonLink } from './Button';

interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
}

export function WhatsAppButton({
  label = 'Talk on WhatsApp',
  variant = 'secondary',
  size = 'lg',
  className,
  fullWidth,
}: Props) {
  const configured = company.whatsapp !== PLACEHOLDER.whatsapp;
  const href = configured ? whatsappLink(company.whatsapp, company.whatsappMessage) : '/contact';

  return (
    <ButtonLink
      href={href}
      external={configured}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      onClick={() => track('whatsapp_click')}
    >
      <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
      {label}
    </ButtonLink>
  );
}
