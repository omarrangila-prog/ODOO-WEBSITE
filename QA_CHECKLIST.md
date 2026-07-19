# QA Checklist — AHM International

Verified during build (automated) and to re-verify manually before launch.

## Navigation
- [x] Header links, dropdowns (Services, Industries) work
- [x] Mobile menu: opens, focus trapped, Escape closes, body scroll locked, WhatsApp + CTA present
- [x] Keyboard: tab order logical, skip-to-content link works, focus visible
- [x] Footer: only social links with real URLs render; dynamic copyright year

## Hero
- [x] Responsive 5/7 layout → stacks on mobile
- [x] SVG line-draw animation; reduced-motion renders solid, content immediate
- [x] CTAs link correctly (Show Us Your Workflow → /contact, See the Transformation → anchor)
- [x] Diagram has a descriptive `role="img"` label; no baked-in text in the photo

## Five-second explanation
- [x] Connect / Automate / Grow render with dividers (desktop) and stack (mobile)

## Friction calculator
- [x] Every option toggles (keyboard + click), active state clear
- [x] Score, status, hour range and recommendation update live
- [x] Screen-reader `aria-live` announces result changes
- [x] "Get My Odoo Roadmap" disabled with 0 selections; prefills /contact form via query params
- [x] Indicative-estimate disclaimer present

## Module builder
- [x] Module selection + multiple selections + related-module highlighting
- [x] Detail panel shows manages / removes / features / connects-with / CTA
- [x] Connects-with chips switch the active module
- [x] Responsive grid selector (no cramped radial on mobile)

## Industry section
- [x] Accessible tabs (arrow keys), image crossfade, industry names as real HTML
- [x] Mobile horizontal selector; content stacks; deep links to industry pages

## Implementation journey
- [x] Interactive stepper (desktop) with one active stage; accordion (mobile)
- [x] All info accessible without hover

## Integrations / case studies / testimonials / trust / founder
- [x] Integration cards show category, use, direction, standard/custom + availability note
- [x] Case studies use supplied images, before/after, neutral labels, placeholder metric badge
- [x] Testimonials use Problem/Changed/Result structure + clearly-marked placeholders
- [x] Founder photo + name/bio are marked placeholders (no fabricated person)

## Forms (contact)
- [x] Required-field validation (client + server)
- [x] Invalid email / invalid phone rejected
- [x] Missing consent blocks submission
- [x] Invalid file type / oversized file rejected with clear message; remove-file works
- [x] Server failure shows friendly error; values preserved
- [x] Successful submission shows success state
- [x] Duplicate submission prevented (guard on submitting state)
- [x] Honeypot: bot submissions silently accepted, not delivered
- [x] Rate limiting returns 429 after threshold
- [x] Error summary focuses on invalid submit (accessibility)

## SEO
- [x] Unique titles + descriptions per page (no double-branding)
- [x] Canonical URLs, Open Graph + Twitter cards
- [x] JSON-LD: Organization, WebSite, LocalBusiness (root); WebPage/Service/Industry/Breadcrumb/FAQ per page
- [x] sitemap.xml (23 URLs) + robots.txt
- [x] Semantic headings, breadcrumbs, descriptive alt text

## Responsive / global
- [x] No horizontal overflow (`overflow-x: hidden` on body; responsive grids)
- [x] iOS safe-area handling; touch targets ≥ 44px
- [x] `prefers-reduced-motion` respected across animations
- [x] Images: correct width/height, sizes, lazy below fold, priority above fold, no CLS

## Build health
- [x] `npm run build` succeeds — 29 routes generated
- [x] Strict TypeScript passes, no `any`
- [x] No hydration errors; all key routes return HTTP 200
- [x] API: valid → `{ok:true}`, invalid → `{ok:false,error}`, honeypot → `{ok:true}`

## Manual pre-launch (do on real devices)
- [ ] Test on Chrome, Firefox, Safari, Edge, iOS Safari, Android Chrome
- [ ] Verify at 320 / 360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 px
- [ ] Run Lighthouse (Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95)
- [ ] Submit a real form and confirm email delivery (after wiring Resend)
