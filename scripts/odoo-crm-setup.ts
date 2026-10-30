/**
 * Creates the website's custom fields and sales stages in Odoo CRM.
 *   npx tsx scripts/odoo-crm-setup.ts            # dry run: lists what would be created
 *   npx tsx scripts/odoo-crm-setup.ts --apply    # writes to Odoo
 * Needs ODOO_URL, ODOO_DB, ODOO_USER and ODOO_API_KEY (an administrator's API key, because custom fields
 * are created in ir.model.fields). Safe to rerun: anything that already exists is left alone.
 */
import { hasOdooCreds } from '../lib/leadintel/odoo-rpc';
import { setupOdooCrm, CUSTOM_FIELDS, STAGES } from '../lib/leadintel/crm-setup';

async function main() {
  const apply = process.argv.includes('--apply');
  if (!hasOdooCreds()) {
    console.log('No Odoo credentials set (ODOO_URL, ODOO_DB, ODOO_USER, ODOO_API_KEY). Nothing was contacted.');
    console.log(`It would ensure ${CUSTOM_FIELDS.length} custom fields on crm.lead: ${CUSTOM_FIELDS.map((f) => f.name).join(', ')}`);
    console.log(`and ${STAGES.length} stages: ${STAGES.map((s) => s.name).join(', ')}. (Lost leads are archived with a reason in Odoo.)`);
    process.exit(0);
  }
  const steps = await setupOdooCrm(!apply);
  for (const s of steps) console.log(`${s.action.padEnd(12)} ${s.kind} ${s.name}`);
  if (!apply) console.log('\nDry run. Rerun with --apply to write these to Odoo.');
}
main().catch((e) => {
  console.error('FAILED:', e instanceof Error ? e.message : e);
  process.exit(1);
});
