export interface Testimonial {
  /**
   * verified === false marks a DEVELOPMENT PLACEHOLDER that must be replaced
   * with a real, verified client testimonial before launch. Placeholders are
   * clearly labelled in the UI. Never invent testimonials or company logos.
   */
  verified: boolean;
  problem: string;
  changed: string;
  result: string;
  name: string;
  role: string;
  companyLabel: string;
  industry: string;
  implementationType: string;
  media?: { type: 'video' | 'audio'; src: string };
}

// NOTE: No fabricated testimonials. `testimonials` below are placeholders with
// verified:false — the UI hides the section until real, verified quotes exist.
// Do not add a named testimonial with verified:true without written client proof.

export const testimonials: Testimonial[] = [
  {
    verified: false,
    problem:
      'Replace with verified client testimonial before launch — describe the operational problem the client faced.',
    changed:
      'Replace with verified client testimonial before launch — describe what ODOOVATIONS changed.',
    result:
      'Replace with verified client testimonial before launch — describe the measurable result.',
    name: 'Client Name',
    role: 'Role',
    companyLabel: 'Company (industry)',
    industry: 'Manufacturing',
    implementationType: 'Odoo Implementation',
  },
  {
    verified: false,
    problem:
      'Replace with verified client testimonial before launch — describe the operational problem the client faced.',
    changed:
      'Replace with verified client testimonial before launch — describe what ODOOVATIONS changed.',
    result:
      'Replace with verified client testimonial before launch — describe the measurable result.',
    name: 'Client Name',
    role: 'Role',
    companyLabel: 'Company (industry)',
    industry: 'Distribution',
    implementationType: 'Implementation + Integration',
  },
];
