/**
 * Tells IndexNow (Bing, Yandex, Seznam, Naver) that every URL in the live sitemap has changed,
 * so they recrawl without waiting. Bing's index also feeds ChatGPT search and Copilot.
 * Run after a production deploy, once the key file is live:
 *   node scripts/indexnow.mjs https://odoovations.com
 * This sends the list of public URLs to api.indexnow.org. Nothing else is sent.
 */
import { readFileSync } from 'node:fs';
const site = (process.argv[2] || 'https://odoovations.com').replace(/\/$/, '');
const key = readFileSync(new URL('../lib/seo.ts', import.meta.url), 'utf8').match(/INDEXNOW_KEY = '([0-9a-f]+)'/)?.[1];
if (!key) throw new Error('INDEXNOW_KEY not found in lib/seo.ts');

const keyRes = await fetch(`${site}/${key}.txt`);
if (!keyRes.ok || (await keyRes.text()).trim() !== key) throw new Error(`Key file ${site}/${key}.txt is not live yet`);

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${res.status} ${res.statusText}`);
if (!res.ok && res.status !== 202) process.exit(1);
