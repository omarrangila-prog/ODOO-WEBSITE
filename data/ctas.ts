/**
 * Central CTA configuration.
 *
 * One place for primary call-to-action wording per context, so the Odoo
 * roadmap language stays on the Odoo pages where it belongs and a visitor
 * reading about AI automation is not asked to request an ERP roadmap.
 *
 * `service` is the value preselected in the contact form's "What do you
 * need?" field, and must match an entry in data/formOptions.ts serviceOptions
 * exactly — the form validates against that list, so a mismatch would
 * silently fail to preselect.
 */
export interface CtaConfig {
  label: string;
  href: string;
  /** Preselected service in the enquiry form. */
  service?: string;
}

/** Build a contact URL that preselects a service and records the origin. */
export function contactHref(service?: string, from?: string): string {
  const sp = new URLSearchParams();
  if (service) sp.set('service', service);
  if (from) sp.set('from', from);
  const qs = sp.toString();
  return `/contact${qs ? `?${qs}` : ''}#form`;
}

export const ctas = {
  /** Corporate pages: no discipline assumed. */
  general: { label: 'Discuss Your Project', href: contactHref() },

  aiAutomation: {
    label: 'Plan My Automation',
    href: contactHref('AI / Automation', 'ai-automation'),
    service: 'AI / Automation',
  },
  whatsappAutomation: {
    label: 'Plan My Automation',
    href: contactHref('WhatsApp Automation', 'whatsapp-automation'),
    service: 'WhatsApp Automation',
  },
  customSoftware: {
    label: 'Discuss Custom Software',
    href: contactHref('Custom Software', 'custom-software'),
    service: 'Custom Software',
  },
  odoo: {
    label: 'Request an Odoo Roadmap',
    href: contactHref('Odoo / ERP', 'odoo'),
    service: 'Odoo / ERP',
  },
  web: {
    label: 'Start a Website Project',
    href: contactHref('Website', 'web'),
    service: 'Website',
  },
  marketing: {
    label: 'Discuss My Growth Goals',
    href: contactHref('Marketing', 'marketing'),
    service: 'Marketing',
  },
  creative: {
    label: 'Start a Creative Project',
    href: contactHref('Graphic Design', 'creative'),
    service: 'Graphic Design',
  },
  portfolio: { label: 'Build Something Similar', href: contactHref() },
  contact: { label: 'Send My Enquiry', href: '#form' },
} as const satisfies Record<string, CtaConfig>;

/** Map a capability division id (data/divisions.ts) to its CTA. */
export const ctaForDivision: Record<string, CtaConfig> = {
  'ai-automation': ctas.aiAutomation,
  'custom-software': ctas.customSoftware,
  'odoo-erp': ctas.odoo,
  'web-apps': ctas.web,
  marketing: ctas.marketing,
  creative: ctas.creative,
  'content-social': ctas.marketing,
};

/*
 * A few services are more specific than their division. WhatsApp automation
 * sits in the ai-automation division, but the contact form has a dedicated
 * "WhatsApp Automation" option, so prefilling the broader "AI / Automation"
 * loses information the visitor already gave us by clicking. Per-slug entries
 * win over the division default.
 */
export const ctaForService: Record<string, CtaConfig> = {
  'whatsapp-automation': ctas.whatsappAutomation,
};
