/**
 * Operational friction calculator configuration.
 * Weights are indicative internal estimates of relative time-loss impact,
 * NOT a scientifically verified financial calculation.
 */

export interface FrictionItem {
  id: string;
  label: string;
  weight: number; // relative impact 1–5
}

export const frictionItems: FrictionItem[] = [
  { id: 'whatsapp-orders', label: 'Orders arrive through WhatsApp', weight: 4 },
  { id: 'inventory-mismatch', label: 'Inventory does not match records', weight: 5 },
  { id: 'slow-reports', label: 'Reports take too long to prepare', weight: 4 },
  { id: 'different-systems', label: 'Different teams use different systems', weight: 5 },
  { id: 'approval-followups', label: 'Approvals depend on repeated follow-ups', weight: 3 },
  { id: 'sales-accounts', label: 'Sales and accounts are not aligned', weight: 4 },
  { id: 'no-visibility', label: 'Management lacks real-time visibility', weight: 5 },
  { id: 'repeated-entry', label: 'Data is entered repeatedly', weight: 4 },
  { id: 'delayed-ops', label: 'Deliveries and operations are delayed', weight: 3 },
  { id: 'inconsistent-followup', label: 'Customer follow-ups are inconsistent', weight: 3 },
];

export type FrictionStatus = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface FrictionResult {
  status: FrictionStatus;
  hoursMin: number;
  hoursMax: number | null; // null means "and up"
  recommendation: string;
  percent: number; // 0–100 for the visual meter
}

const MAX_WEIGHT = frictionItems.reduce((sum, i) => sum + i.weight, 0);

export function computeFriction(selectedIds: string[]): FrictionResult | null {
  if (selectedIds.length === 0) return null;

  const score = frictionItems
    .filter((i) => selectedIds.includes(i.id))
    .reduce((sum, i) => sum + i.weight, 0);

  const percent = Math.round((score / MAX_WEIGHT) * 100);

  if (percent <= 25) {
    return {
      status: 'Low',
      hoursMin: 6,
      hoursMax: 10,
      percent,
      recommendation:
        'A focused Odoo setup could tidy these gaps quickly. A short discovery call is the right next step.',
    };
  }
  if (percent <= 50) {
    return {
      status: 'Moderate',
      hoursMin: 10,
      hoursMax: 18,
      percent,
      recommendation:
        'Several disconnected processes are costing time. Connecting core modules would remove most of this friction.',
    };
  }
  if (percent <= 75) {
    return {
      status: 'High',
      hoursMin: 18,
      hoursMax: 25,
      percent,
      recommendation:
        'Your operations are fragmented across tools. A structured Odoo implementation would deliver clear, measurable improvement.',
    };
  }
  return {
    status: 'Critical',
    hoursMin: 25,
    hoursMax: null,
    percent,
    recommendation:
      'Manual work is likely a serious drag on your business. A prioritised roadmap should be your immediate next step.',
  };
}
