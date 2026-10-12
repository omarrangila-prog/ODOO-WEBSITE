/**
 * A real whitespace text node for text-extraction correctness.
 *
 * A browser lays block elements on separate lines, so a heading and the
 * paragraph after it read correctly on screen with no whitespace between
 * them. But `textContent` — what many scrapers, several SEO tools and some
 * AI retrieval pipelines read — concatenates them: "…usually needsAn ERP
 * is rarely…".
 *
 * CSS cannot fix this: `::after { content }` is never part of textContent.
 * It has to be a genuine text node in the markup, which is what this is.
 * Rendering `{' '}` directly works too, but JSX and most formatters strip
 * or relocate bare string children between elements, so a named component
 * is the version that survives editing.
 *
 * Place between adjacent block siblings inside <main> where the first ends
 * in a word or sentence and the next begins with one. It is invisible,
 * occupies no layout space, and screen readers treat it as the word break
 * it is.
 */
export function TextGap() {
  return ' ';
}
