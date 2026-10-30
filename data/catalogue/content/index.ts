import type { LeafContent } from './types';
import { f01 } from './f01-search';
import { f06 } from './f06-automation';
import { f09 } from './f09-crm';
import { f07 } from './f07-erp';
import { f05 } from './f05-ai';
import { f12 } from './f12-web';
import { f02 } from './f02-ads';
import { f03f04 } from './f03-f04-content-lifecycle';
import { f08f10 } from './f08-f10-enterprise-software';
import { f11f13f14 } from './f11-f13-f14-qa-market-mobile';
import { f15f16 } from './f15-f16-design-media';
import { f17f18 } from './f17-f18-data-cloud';
import { f19f22 } from './f19-f22-security-ops-interactive';
import { f23 } from './f23-industries';

/** All written leaf content. Add a family's file here as it is completed. */
export const leafContent: LeafContent[] = [...f01, ...f06, ...f09, ...f07, ...f05, ...f12, ...f02, ...f03f04, ...f08f10, ...f11f13f14, ...f15f16, ...f17f18, ...f19f22, ...f23];
