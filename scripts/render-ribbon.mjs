/**
 * Renders the violet ribbon artwork to an image using the SAME generator the
 * browser uses (lib/cinema/ribbon.ts), so the static fallback always matches
 * the live canvas.
 *
 *   node scripts/render-ribbon.mjs <out.png|webp> <width> <height> [phase] [quality]
 *
 * Output is the artwork on the canvas colour (#030307). The page blends it with
 * `mix-blend-mode: screen`, which treats that black as transparent. Opaque
 * output compresses to a fraction of the size of a transparent image with
 * thousands of hairlines, and it is a decorative fallback, so weight matters.
 */
import { build } from 'esbuild';
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const [out, w = '1672', h = '941', phase = '0.0', quality = 'high'] = process.argv.slice(2);
if (!out) { console.error('usage: render-ribbon.mjs <out> <w> <h> [phase] [quality]'); process.exit(1); }

const bundle = await build({
  entryPoints: ['lib/cinema/ribbon.ts'],
  bundle: true, format: 'iife', globalName: 'Ribbon', write: false, target: 'es2019',
});
const code = bundle.outputFiles[0].text;

const W = Number(w), H = Number(h);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent"><canvas id=c width=${W} height=${H}></canvas></body></html>`);
await page.addScriptTag({ content: code });
await page.evaluate(({ phase, quality, W, H }) => {
  const c = document.getElementById('c');
  const ctx = c.getContext('2d');
  Ribbon.drawRibbons(ctx, W, H, { phase, quality: Ribbon.QUALITY[quality], dpr: 1 });
}, { phase: Number(phase), quality, W, H });
const buf = await page.locator('#c').screenshot({ omitBackground: true, type: 'png' });
if (out.endsWith('.webp')) {
  // Pillow does the WebP encode so no extra node dependency is needed.
  const tmp = out.replace(/\.webp$/, '.tmp.png');
  writeFileSync(tmp, buf);
  const { execFileSync } = await import('node:child_process');
  execFileSync('python3', ['-I', '-c', `from PIL import Image;im=Image.open(r'${tmp}').convert('RGBA');bg=Image.new('RGBA',im.size,(3,3,7,255));bg.alpha_composite(im);bg.convert('RGB').save(r'${out}','WEBP',quality=${process.env.RIBBON_Q || 68},method=6)`]);
  (await import('node:fs')).unlinkSync(tmp);
} else {
  writeFileSync(out, buf);
}
await browser.close();
console.log('wrote', out);
