/**
 * Lightweight, privacy-respecting analytics dispatch.
 * No tracking runs unless an analytics id is configured via env vars.
 * Events are only meaningful conversion signals — no invasive tracking.
 */

export type AnalyticsEvent =
  | 'hero_cta_click'
  | 'hero_primary_cta_click'
  | 'hero_secondary_cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'roadmap_request'
  | 'friction_calculator_completed'
  | 'module_selected'
  | 'industry_selected'
  | 'intent_selector_used'
  | 'topic_card_click'
  | 'solution_page_view'
  | 'case_study_opened'
  | 'work_filter_used'
  | 'playground_flow_selected'
  | 'playground_played'
  | 'solution_filter_used'
  | 'workflow_file_uploaded'
  | 'consultation_form_submitted'
  | 'scheduling_link_clicked'
  | 'form_started'
  | 'service_card_click'
  | 'featured_work_click'
  | 'platform_card_click'
  | 'playground_paused'
  | 'playground_reset'
  | 'faq_opened'
  | 'email_click';

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    gtag?: (command: string, action: string, params?: Props) => void;
    dataLayer?: unknown[];
  }
}

import { sanitizeEventProps } from './leadintel/analyticsSafe';

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return;
  // PII guard: strip anything that looks like personal data before dispatch.
  const safe = sanitizeEventProps(props) as Props;
  try {
    if (typeof window.plausible === 'function') {
      window.plausible(event, { props: safe });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, safe);
    }
  } catch {
    /* analytics must never break the UI */
  }
}
