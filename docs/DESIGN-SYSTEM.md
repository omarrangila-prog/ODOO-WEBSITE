# ODOOVATIONS design system

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

## Tokens added in v4 (`app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--dur-fast` / `--dur-base` / `--dur-slow` | 160 / 260 / 520 ms | interface motion; hover and focus use fast or base, reveals use slow |
| `--ease-premium`, `--ease-out` | cubic-bezier curves | every transition and keyframe, so motion feels alike |
| `--space-1` … `--space-8` | 4, 8, 12, 16, 24, 32, 48, 72 px | gaps and padding inside components |
| `--radius-control` / `--radius-card` / `--radius-panel` | 14 / 20 / 28 px | inputs and buttons / cards / large panels |
| `--content-max`, `--page-max`, `--reading-width` | 1280 / 1320 / 720 px | container and text widths |
| `--line-dark`, `--line-dark-strong` | violet-tinted hairlines | every border |

Shadows come from Tailwind's `shadow-float`; buttons are `ButtonLink` / `Button`
(white pill primary, hairline secondary); form controls are `inputClass` in
`components/forms/Field.tsx`.

## Headings: three sizes, used for three jobs

- `.hero-title`: the homepage headline only.
- `.band-title` (30–54 px): a homepage section. `.page-h2` (28–44 px): a section
  on an inner page. `.display-1` stays for an inner page's single H1.
- Do not use `.section-title` (up to 92 px) outside the diagnostic tool; it is the
  3.0 monumental size and made every section shout.

## Bands (`.band`, `.band-alt`, `.band-inner`, `.band-tight`)

The homepage's compact sections: same canvas, hairline and gutters as the
staged sections at about a third of the height. Alternate `.band` and
`.band-alt` so adjacent sections are distinguishable. `.band-tight` trims the
vertical padding again (36 to 56px); the homepage uses it throughout because the
whole page is meant to run to about five screens.

## Small illustrations and motion on scroll

`components/home/MicroVisual.tsx` draws one line illustration per kind of
service. They are decoration (aria-hidden, no numbers, nothing that could pass
for a client's screen). Animation is CSS only, uses transform, opacity and
stroke-dashoffset, and is paused until its container is on screen:

- wrap the group in `LiveOnScreen` (or set `data-live` yourself) and give the
  element `.mv`;
- the `.mv-host` card also runs them on hover and keyboard focus;
- the pause rules sit at the END of `globals.css` on purpose. The `animation`
  shorthand resets `animation-play-state`, so a pause rule placed before an
  animation class is overridden and the animation runs regardless.
- reduced motion removes every `.mv` animation.

## Working demonstrations (`components/work/demos/`)

The election console, the tournament desk and the document-delivery flow are
real, interactive components with invented data. They stand where a screenshot
would, and they are never to be mistaken for one:

- every one sits in `DemoFrame`, which prints "Demonstration · sample data" in the
  title bar and a note that it is not a screenshot of the client's system. Do not
  build a demonstration outside the frame;
- `LazyDemo` mounts one only when it is near the screen and reserves the height it
  will take (measured at 320 to 1440px), so mounting does not move the page.
  After changing a demonstration's layout run `node scripts/demo-layout.mjs` and
  update the three heights in `LazyDemo.tsx`;
- all state is local (no network, nothing stored), every control is a native
  button, radio, checkbox or select, and a reset is always in the frame;
- on the homepage a phone opens a demonstration on request ("Open the working
  demonstration"), so the section stays short.

## Tabs and demonstrations

The service explorer and the featured-work tabs render every panel in the
HTML (inactive ones are `hidden`), use roving tab focus with arrow keys, Home and
End, and have no hover-only content. Anything that moves for more than five
seconds has a visible pause control.
