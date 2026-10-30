import { validateCatalogue } from '../lib/catalogue/validate';
import { catalogueServices } from '../data/catalogue/services';
import { blueprints } from '../data/catalogue/blueprints';

const errs = validateCatalogue();
console.log(`catalogue: ${catalogueServices.length} service records, ${blueprints.length} blueprints`);
if (errs.length) {
  errs.forEach((e) => console.error('FAIL', e));
  process.exit(1);
}
console.log('All catalogue checks passed.');
