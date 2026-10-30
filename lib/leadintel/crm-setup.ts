import { odooExecute } from './odoo-rpc';

/**
 * What the website's lead pipeline needs in Odoo CRM: the custom fields the adapter writes (crm.ts) and the
 * sales stages from audit/sales/SALES-KIT.md. "Lost" is not a stage in Odoo: a lost lead is archived with a
 * lost reason, so it is not created here.
 */
export const CUSTOM_FIELDS: { name: string; label: string; ttype: 'integer' | 'char' | 'boolean' }[] = [
  { name: 'x_lead_score', label: 'Website routing score', ttype: 'integer' },
  { name: 'x_lead_band', label: 'Website routing band', ttype: 'char' },
  { name: 'x_sales_queue', label: 'Sales queue', ttype: 'char' },
  { name: 'x_utm_source', label: 'UTM source', ttype: 'char' },
  { name: 'x_utm_campaign', label: 'UTM campaign', ttype: 'char' },
  { name: 'x_marketing_consent', label: 'Marketing consent', ttype: 'boolean' },
  { name: 'x_contact_permission', label: 'Permission to contact', ttype: 'boolean' },
  { name: 'x_anon_id', label: 'Anonymous visitor id', ttype: 'char' },
];

export const STAGES: { name: string; sequence: number; is_won?: boolean }[] = [
  { name: 'New', sequence: 1 },
  { name: 'Discovery needed', sequence: 2 },
  { name: 'Qualified', sequence: 3 },
  { name: 'Call scheduled', sequence: 4 },
  { name: 'Proposal sent', sequence: 5 },
  { name: 'Won', sequence: 6, is_won: true },
];

export interface SetupStep {
  kind: 'field' | 'stage';
  name: string;
  action: 'exists' | 'created' | 'would-create';
}

/** Idempotent: existing fields and stages are left alone. With dryRun, nothing is written. */
export async function setupOdooCrm(dryRun: boolean): Promise<SetupStep[]> {
  const out: SetupStep[] = [];
  const modelIds = (await odooExecute('ir.model', 'search', [[['model', '=', 'crm.lead']]], { limit: 1 })) as number[];
  if (!modelIds.length) throw new Error('crm.lead not found: is the CRM app installed?');

  for (const f of CUSTOM_FIELDS) {
    const found = (await odooExecute('ir.model.fields', 'search', [[['model', '=', 'crm.lead'], ['name', '=', f.name]]], { limit: 1 })) as number[];
    if (found.length) { out.push({ kind: 'field', name: f.name, action: 'exists' }); continue; }
    if (!dryRun) await odooExecute('ir.model.fields', 'create', [{ model_id: modelIds[0], name: f.name, field_description: f.label, ttype: f.ttype, state: 'manual' }]);
    out.push({ kind: 'field', name: f.name, action: dryRun ? 'would-create' : 'created' });
  }

  for (const st of STAGES) {
    const found = (await odooExecute('crm.stage', 'search', [[['name', '=ilike', st.name]]], { limit: 1 })) as number[];
    if (found.length) { out.push({ kind: 'stage', name: st.name, action: 'exists' }); continue; }
    if (!dryRun) await odooExecute('crm.stage', 'create', [{ name: st.name, sequence: st.sequence, ...(st.is_won ? { is_won: true } : {}) }]);
    out.push({ kind: 'stage', name: st.name, action: dryRun ? 'would-create' : 'created' });
  }
  return out;
}
