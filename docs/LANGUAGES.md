# Languages

The site is English-only today and is built so that adding a language does not
mean touching every component.

## What is already in place

- `lib/i18n.ts` lists the languages. English is published; Urdu (`ur`, right to
  left, `/ur` prefix) is described but **not published**.
- `<html lang>` and `dir` come from that list (`app/layout.tsx`).
- `buildMetadata()` adds `hreflang` alternates only when two or more languages
  are published. With one, it adds none: a page with no alternative should not
  announce one.
- Tailwind's `rtl:` variant and logical utilities (`ms-*`, `me-*`, `ps-*`,
  `pe-*`, `text-start`) follow `dir`, so a right-to-left language flips the
  layout without per-component work. New components should prefer logical
  utilities over `ml-*` / `pl-*` / `text-left`.

## What adding a language involves

1. **Content first.** Translate and *review* the pages by a person fluent in the
   language. Machine translation alone is not a reason to publish. Start with
   the homepage, contact, the main service pages and the legal pages.
2. **Routes.** Add the language's pages under its prefix (for example `/ur/...`)
   either with an `app/[locale]` segment or with rewrites in `next.config.mjs`.
   English URLs must not change.
3. **Switch it on.** Set `published: true` in `lib/i18n.ts` only when every page
   that would be listed has reviewed content. That turns on `hreflang` for the
   published set and `x-default`.
4. **Fonts.** Urdu needs a Nastaliq or Naskh face (for example Noto Nastaliq
   Urdu). Load it only on that language's pages.
5. **Check RTL.** Walk every template with `dir="rtl"`: the navigation, the
   dropdowns, the form, the stage frame, and any component that uses `left` /
   `right` or fixed `translate-x` values.
6. **Sitemap.** Add the language's URLs, each with its alternates.

## What not to do

- Do not redirect visitors by country or browser language. Offer a switcher;
  never move people between languages automatically.
- Do not expose a half-translated page, or a language whose coverage is partial.
- Do not add Arabic, French or other languages without a real market need and a
  reviewer.
