# AHM International — Odoo Solutions Website

A production-ready marketing website for **AHM International** (Odoo implementation, custom
development, integration, consulting, support and training). The creative idea — **From
Business Chaos to Complete Control** — runs through the whole experience.

Built with **Next.js 14 (App Router)**, **TypeScript (strict)**, **Tailwind CSS**,
**Framer Motion** and **Lucide** icons.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Configure environment (copy and fill in)
cp .env.example .env.local

# 3. Run the dev server
npm run dev        # http://localhost:3000

# Other scripts
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # strict TypeScript check
npm run lint       # ESLint (next/core-web-vitals)
```

> The build fetches Google Fonts (Space Grotesk, Manrope) via `next/font`. In an offline
> sandbox this logs a font-fetch warning and falls back to system fonts — it still builds and
> runs. In any networked environment the real fonts load and self-host automatically.

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, header/footer, skip link, org JSON-LD
  page.tsx                Homepage (composes all home sections)
  globals.css             Design tokens + base + helpers
  sitemap.ts / robots.ts  SEO
  not-found.tsx           404
  contact/                Contact page (form + direct contact)
  services/[slug]/        Service page template + 6 routes (SSG)
  industries/[slug]/      Industry page template + 8 routes (SSG)
  case-studies/[slug]/    Case study template + index
  privacy/ · terms/       Legal pages
  api/contact/route.ts    Server-validated form endpoint (dev adapter + Resend-ready)

components/
  layout/   Header, MobileMenu, Footer, Logo
  home/     Hero + all homepage sections
  services/ industries/   (page-specific building blocks live inline in templates)
  forms/    ContactForm, FileUploader, Field
  ui/       Buttons, SectionHeading, Tabs, Accordion, Reveal, AnimatedNumber, etc.
  seo/      Analytics loader

data/       company · navigation · services · industries · modules · integrations ·
            testimonials · caseStudies · faq · journey · calculator · formOptions
lib/        validation (zod) · seo · analytics · utilities
public/
  images/   Desktop WebP assets (from the supplied package)
  mobile/   Mobile WebP variants
```

**All editable business information lives in [`data/company.ts`](data/company.ts).**

---

## Environment variables

See [`.env.example`](.env.example) for the full list. Highlights:

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | client | Canonical URL for metadata / sitemap |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | client | WhatsApp CTA (intl format, no `+`) |
| `NEXT_PUBLIC_SCHEDULING_URL` | client | Discovery-call scheduling link (optional) |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` / `NEXT_PUBLIC_GA_ID` | client | Analytics (off unless set) |
| `RESEND_API_KEY` | **server** | Enables real email delivery of form submissions |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | **server** | Form delivery addresses |

Secrets are **never** exposed to the client (only `NEXT_PUBLIC_*` reach the browser).

---

## Contact form & file uploads

- **Validation:** shared zod schema, enforced **on both client and server**
  ([`lib/validation.ts`](lib/validation.ts)).
- **Spam protection:** hidden honeypot field + per-IP rate limiting in the API route.
- **File uploads:** PDF / XLS / XLSX / CSV / DOC / DOCX / PNG / JPG, max 10 MB, type + size
  validated client- and server-side.
- **Delivery adapter** ([`app/api/contact/route.ts`](app/api/contact/route.ts)):
  - **Dev adapter (default):** validates and logs a redacted summary, returns success. No
    email is sent and **uploaded files are not persisted**.
  - **Resend (opt-in):** set `RESEND_API_KEY` to send real email.
- **Uploaded documents are never stored or exposed publicly** unless you add a storage
  strategy (e.g. S3 with signed URLs) in the delivery adapter. This is intentional.

---

## Key interactive features (all functional)

- **Hero transformation diagram** — HTML + SVG, animated line-draw, reduced-motion safe.
- **Operational Friction Calculator** — live scoring; "Get My Odoo Roadmap" prefills the
  contact form via query params.
- **Odoo Module Builder** — multi-select modules, related-module highlighting, detail panel.
- **Industry selector** — accessible tabs, image crossfade, real HTML titles below images.
- **Implementation journey** — interactive stepper (desktop) / accordion (mobile).
- **Accessible** accordion, tabs, mobile menu (focus trap, body lock, Escape).

---

## Accessibility & performance

- Semantic landmarks, skip link, visible focus, keyboard-operable interactive components,
  ARIA live regions (calculator + form), WCAG-AA-minded contrast, 44px touch targets.
- `prefers-reduced-motion` disables decorative motion while keeping all content and function.
- Server components by default; heavy interactive sections are client components. Images use
  `next/image` with correct sizes and no layout shift. Analytics load only when configured.

---

## Deployment

Deploys cleanly to **Vercel** (recommended) or any Node host:

1. Set the environment variables from `.env.example` in your host's dashboard.
2. `npm run build` then `npm run start` (Vercel does this automatically).
3. Point your domain and set `NEXT_PUBLIC_SITE_URL` to the production URL.

Before going live, complete [`LAUNCH_CHECKLIST.md`](LAUNCH_CHECKLIST.md) and run through
[`QA_CHECKLIST.md`](QA_CHECKLIST.md).

---

## Content honesty policy

This codebase never ships fabricated data. Testimonials, case-study metrics and the founder
profile render as **clearly-marked placeholders** until you supply verified content. There are
no fake client logos, statistics, or Odoo partnership/certification claims. Update the flags in
`data/company.ts`, `data/testimonials.ts` and `data/caseStudies.ts` with real, confirmed
information.
# ODOO-WEBSITE
