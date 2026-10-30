/** The Odoo client and CRM setup against a stubbed Odoo: checks the exact JSON-RPC payloads. */
process.env.ODOO_URL = 'https://odoo.example.invalid';
process.env.ODOO_DB = 'db';
process.env.ODOO_USER = 'admin@example.invalid';
process.env.ODOO_API_KEY = 'key';

import { setupOdooCrm, CUSTOM_FIELDS, STAGES } from '../lib/leadintel/crm-setup';
import { createOrUpdateLead } from '../lib/leadintel/crm';

let failed = 0;
const check = (c: unknown, m: string) => { if (!c) failed++; console.log((c ? 'ok    ' : 'FAIL  ') + m); };
const calls: { service: string; method: string; args: unknown[] }[] = [];
let existingLead: number[] = [];
const existingFields = new Set(['x_lead_score']);

globalThis.fetch = (async (_url: string, init: { body: string }) => {
  const { params } = JSON.parse(init.body);
  calls.push(params);
  let result: unknown = null;
  if (params.service === 'common') result = 7;
  else {
    const [, , , model, method, args] = params.args;
    if (model === 'ir.model' && method === 'search') result = [42];
    else if (model === 'ir.model.fields' && method === 'search') result = existingFields.has(args[0][1][2]) ? [1] : [];
    else if (model === 'crm.stage' && method === 'search') result = args[0][0][2] === 'New' ? [1] : [];
    else if (model === 'crm.lead' && method === 'search') result = existingLead;
    else if (method === 'create') result = 99;
    else result = true;
  }
  return new Response(JSON.stringify({ jsonrpc: '2.0', result }), { status: 200 });
}) as unknown as typeof fetch;

async function main() {
  const dry = await setupOdooCrm(true);
  check(calls[0]?.service === 'common' && calls[0]?.method === 'authenticate', 'authenticates to get the user id');
  check(!calls.some((c) => c.args?.[4] === 'create'), 'dry run writes nothing');
  check(dry.filter((s) => s.action === 'exists').length === 2, 'existing field and stage are detected');
  check(dry.length === CUSTOM_FIELDS.length + STAGES.length, 'every field and stage is planned');

  calls.length = 0;
  await setupOdooCrm(false);
  const creates = calls.filter((c) => c.args?.[4] === 'create');
  check(creates.length === CUSTOM_FIELDS.length - 1 + STAGES.length - 1, 'apply creates only what is missing');
  const field = creates.find((c) => c.args[3] === 'ir.model.fields');
  const vals = (field?.args[5] as Record<string, unknown>[])[0]!;
  check(vals.model_id === 42 && vals.state === 'manual' && String(vals.name).startsWith('x_'), 'custom field is created on crm.lead as a manual x_ field');
  check(creates.some((c) => c.args[3] === 'crm.stage' && (c.args[5] as Record<string, unknown>[])[0]!.is_won === true), 'the Won stage is marked as won');

  calls.length = 0;
  existingLead = [55];
  const r = await createOrUpdateLead({ email_from: 'a@b.c', name: 'x' });
  const write = calls.find((c) => c.args?.[4] === 'write');
  check(r.action === 'updated' && JSON.stringify(write?.args[5]) === JSON.stringify([[55], { email_from: 'a@b.c', name: 'x' }]), 'an existing lead is updated with [ids, values] as positional arguments');

  calls.length = 0;
  existingLead = [];
  const c = await createOrUpdateLead({ email_from: 'new@b.c' });
  check(c.action === 'created' && c.leadId === 99, 'a new lead is created');

  console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
  process.exit(failed ? 1 : 0);
}
main();
