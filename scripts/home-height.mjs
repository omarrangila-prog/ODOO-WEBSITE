import { chromium } from 'playwright';
const base = process.env.BASE || 'http://localhost:3700';
const b = await chromium.launch();
for (const [w,h] of [[1363,936],[390,844]]) {
  const p = await (await b.newContext({ viewport:{width:w,height:h} })).newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.evaluate(async()=>{ for (let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));} window.scrollTo(0,0);});
  await p.waitForTimeout(500);
  const r = await p.evaluate(()=>{
    const secs=[...document.querySelectorAll('main > *, main > * > section, main section')].filter(e=>e.getBoundingClientRect().height>200);
    const seen=new Set(); const out=[];
    for (const s of secs){ if(seen.has(s))continue; seen.add(s); const rect=s.getBoundingClientRect(); out.push([s.id||s.getAttribute('aria-labelledby')||s.className.toString().slice(0,40), Math.round(rect.height)]); }
    return {total: document.documentElement.scrollHeight, secs: out};
  });
  console.log(w+'x'+h, 'total', r.total, '=', (r.total/h).toFixed(1), 'viewports');
  console.log(r.secs.map(s=>s.join(':')).join('\n'));
}
await b.close();
