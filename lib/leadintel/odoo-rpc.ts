/**
 * Minimal Odoo external-API client over JSON-RPC (Odoo's /jsonrpc endpoint).
 * Credentials come from ODOO_URL, ODOO_DB, ODOO_USER and ODOO_API_KEY. The user id is obtained by
 * authenticating once, not assumed.
 */
let cachedUid: number | null = null;

async function rpc(service: 'common' | 'object', method: string, args: unknown[]): Promise<unknown> {
  const res = await fetch(`${process.env.ODOO_URL}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params: { service, method, args } }),
  });
  if (!res.ok) throw new Error(`Odoo HTTP ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: { message?: string; data?: { message?: string } } };
  if (json.error) throw new Error(json.error.data?.message ?? json.error.message ?? 'Odoo RPC error');
  return json.result;
}

export function hasOdooCreds(): boolean {
  return Boolean(process.env.ODOO_URL && process.env.ODOO_DB && process.env.ODOO_USER && process.env.ODOO_API_KEY);
}

export async function odooUid(): Promise<number> {
  if (cachedUid) return cachedUid;
  const uid = await rpc('common', 'authenticate', [process.env.ODOO_DB, process.env.ODOO_USER, process.env.ODOO_API_KEY, {}]);
  if (typeof uid !== 'number' || !uid) throw new Error('Odoo authentication failed');
  cachedUid = uid;
  return uid;
}

/** execute_kw(model, method, positional args, keyword args). */
export async function odooExecute(model: string, method: string, args: unknown[], kwargs: Record<string, unknown> = {}): Promise<unknown> {
  const uid = await odooUid();
  return rpc('object', 'execute_kw', [process.env.ODOO_DB, uid, process.env.ODOO_API_KEY, model, method, args, kwargs]);
}

/** For tests only. */
export function _resetOdooUid() {
  cachedUid = null;
}
