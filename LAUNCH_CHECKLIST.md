# Launch Checklist — AHM International

Replace every placeholder below with real, verified information before going live.
Search the codebase for `REPLACE_WITH_` to find machine-marked placeholders.

## 1. Business details — `data/company.ts`
- [ ] `phoneDisplay` / `phoneHref` — real phone number
- [ ] `email` — confirm the correct inbox
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` (env) — real WhatsApp number, intl format, no `+`
- [ ] `NEXT_PUBLIC_SCHEDULING_URL` (env) — real discovery-call link (or leave blank)
- [ ] `address` — confirm city / region / country
- [ ] `serviceRegions` — confirm the regions you actually serve
- [ ] `social.*` — add only URLs that exist; leave blank to hide the icon
- [ ] `odooOfficialPartner` — keep `false` unless the partnership is genuinely verified
- [ ] `certifications` — add only verified certifications
- [ ] `logo.src` — add a real logo asset if replacing the text wordmark

## 2. Environment — `.env.local`
- [ ] `NEXT_PUBLIC_SITE_URL` — production domain (no trailing slash)
- [ ] `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL` — to send real email
      (leave `RESEND_API_KEY` empty to keep the dev adapter)
- [ ] `NEXT_PUBLIC_ANALYTICS_DOMAIN` / `NEXT_PUBLIC_GA_ID` — only if using analytics
- [ ] `TURNSTILE_*` — optional extra spam protection

## 3. Testimonials — `data/testimonials.ts`
- [ ] Replace both placeholder testimonials with **verified** client quotes
- [ ] Set `verified: true` only for confirmed testimonials (removes the placeholder badge)
- [ ] Never invent testimonials, names or company logos

## 4. Case studies — `data/caseStudies.ts`
- [ ] Replace `REPLACE_WITH_REAL_METRIC` values with confirmed numbers
- [ ] Set `verified: true` on metrics only when the client confirms them
- [ ] Optionally replace neutral labels ("Textile Manufacturer") with real names **if permitted**

## 5. Founder / expert — `components/home/Founder.tsx`
- [ ] Add a real founder/consultant photo (replace the placeholder block)
- [ ] Add real name, role and short bio
- [ ] Add LinkedIn URL in `data/company.ts` (`social.linkedin`) to show the LinkedIn link

## 6. Legal — `app/privacy/page.tsx`, `app/terms/page.tsx`
- [ ] Review Privacy Policy with a qualified professional; confirm it matches real data practices
- [ ] Review Terms of Use
- [ ] Confirm the file-upload / document-retention wording matches your actual storage strategy

## 7. File-upload storage (if you want to retain uploads)
- [ ] By default uploaded files are **not stored**. To retain them, implement secure storage
      (e.g. S3 + signed URLs) in `app/api/contact/route.ts` and update the Privacy Policy.

## 8. SEO / social
- [ ] Verify homepage title & description
- [ ] Confirm the Open Graph image (`public/images/ahm-odoo-services-og.webp`)
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Add a favicon / app icons (`app/icon.png`, `app/apple-icon.png`) if desired

## 9. Final gates
- [ ] `npm run build` passes with no errors
- [ ] `npm run typecheck` and `npm run lint` pass
- [ ] Complete `QA_CHECKLIST.md`
- [ ] Test a real form submission end-to-end after wiring email
