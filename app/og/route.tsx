import { ImageResponse } from 'next/og';

export const runtime = 'edge';

/**
 * Share image for every page: the page's own title on the brand canvas, 1200 x 630 PNG.
 *
 * PNG rather than the old WebP: WhatsApp, LinkedIn and several chat apps show no preview
 * for a WebP og:image, and a link shared on WhatsApp is how many enquiries start. The
 * title arrives in the query string (lib/seo.ts ogImage()), is trimmed of the brand
 * suffix and capped in length, so nothing a visitor types can bloat the image.
 */
export function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const raw = (sp.get('title') || 'Software, AI automation, Odoo and digital, built around how your business works.')
    .replace(/\s*[|—–-]\s*ODOOVATIONS\s*$/i, '')
    .slice(0, 110);
  const kicker = (sp.get('kicker') || '').slice(0, 40);
  const size = raw.length > 70 ? 54 : raw.length > 40 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'radial-gradient(circle at 82% 30%, rgba(130,71,245,0.55), rgba(130,71,245,0.12) 38%, #030307 70%)',
          backgroundColor: '#030307',
          color: '#f7f6fa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, border: '9px solid #a77bff', display: 'flex' }} />
          <div style={{ fontSize: 30, letterSpacing: 8, fontWeight: 600 }}>ODOOVATIONS</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1000 }}>
          {kicker ? <div style={{ fontSize: 24, letterSpacing: 5, textTransform: 'uppercase', color: '#c4a8ff' }}>{kicker}</div> : null}
          <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{raw}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 24, color: '#a9a5b6' }}>
          <div style={{ display: 'flex' }}>Karachi, Pakistan · serving clients in Pakistan and abroad</div>
          <div style={{ display: 'flex', color: '#c4a8ff' }}>odoovations.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable' } },
  );
}
