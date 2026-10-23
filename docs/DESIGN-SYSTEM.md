# ODOOVATIONS 3.0 design system

One deep-black canvas, violet as a controlled signature, and typography doing
most of the visual work. The approved reference is the "BUSINESS, REIMAGINED.
by design." mockup.

## Tokens (`app/globals.css`, `tailwind.config.ts`)

Every colour exists twice: a hex variable for plain CSS and an `-rgb` channel
variable that Tailwind wraps as `rgb(var(--x-rgb) / <alpha-value>)`. That is what
makes opacity modifiers (`border-violet/40`, `bg-ink/10`) work. With plain hex
variables Tailwind cannot apply an opacity and silently emits no CSS, which hid
hundreds of classes on the old site. If you add a colour, add both forms.

| Token | Use |
|---|---|
| `midnight` `#030307` | the canvas |
| `graphite`, `ivory`, `ivory-soft` | slightly lifted section grounds |
| `ink`, `text-dark` | primary text, off-white |
| `ink-muted`, `text-dark-muted` | secondary text |
| `violet` `#a77bff` | text and links on the canvas (6.8:1) |
| `violet-bright` `#c4a8ff` | highlights, active states |
| `ultraviolet` `#8247f5` | fills and large display accents only |

`.theme-dark`, `.theme-graphite` and `.theme-light` are three near-black rungs.
There is no light mode: the old `prefers-color-scheme: light` remap made "dark"
sections light on purpose, and was the source of several contrast failures.

## Type

Inter Tight for headlines, Inter for running text, Instrument Serif Italic for
the single expressive phrase in a view. `.signal-text` and `<Accent>` are that
phrase. Use at most one per heading.

## The frame (`.cinema-frame`, `.cinema-flare`)

A fixed rounded border. Its enormous spread shadow paints the indigo "wall"
outside the stage, and `.cinema-flare` (which must come after it in the DOM)
adds the corner hot spots. Adjust `--frame-inset` to change the stage margin.
Full-page screenshots stretch the shadow over the whole page; hide the two
layers when capturing (see `scripts/page-shots.mjs`).

## The ribbon

`lib/cinema/ribbon.ts` draws the artwork: a few "sheets" between two guide
curves, strands crowded toward one edge, plus tapered fill bands for the glow.
The same function paints the live canvas and the static fallback images.

- Live: `components/cinema/VioletRibbonScene.tsx`.
- Static fallbacks: `public/art/ribbon-wide.webp`, `ribbon-mobile.webp`.
- **After changing anything in `ribbon.ts`, run `npm run art:render`** or the
  fallback images (shown first, and permanently for reduced motion) will no
  longer match the live canvas.
- Tune the shape by editing `SHEETS` (guide points, crowd exponent, gain).
- To test a quality tier in a browser: `localStorage.odv_ribbon_tier = 'high'`
  (or `medium` / `low`). Forcing a tier also disables the slow-frame step-down.
- Every moving term completes whole cycles per loop (`LOOP_SECONDS`), so it
  repeats without a seam.

## Buttons and links

Primary buttons are white pills; secondary are hairline-outlined; there is no
gradient or glow. Prefer `.link-editorial` (set type, fine underline, arrow)
for calls to action inside sections, as the hero does.

## Verifying a change

```
npm run build && npx next start -p 3700
node scripts/hero-shot.mjs out.png          # hero at reference proportions
node scripts/section-shots.mjs out/         # every homepage section as scrolled
node scripts/contrast-check.mjs http://localhost:3700
node scripts/a11y.mjs http://localhost:3700
```
