# Product catalogue

`data/products.ts` is built to hold 60–80 products or more over time. The number
is not a goal: a product is added when it exists.

## Statuses

`live`, `demo`, `beta`, `custom-solution` are public. `in-development` is never
public. A concept is never shown as a product.

## The gate

`isPublishable()` refuses a record that:

- has a status other than the four public ones;
- has evidence not marked `verified`, or no source for it;
- has a description under 80 characters, or no target customer or problem;
- lists fewer than three features;
- has no deployment model, pricing approach or support arrangement;
- (live / demo / beta) has neither a demo link nor an approved screenshot with
  alt text.

Until at least one record passes, `/products` returns 404, no `/products/<slug>`
page is generated, and nothing appears in the sitemap.

## Adding a product

1. Add a record to `products` in `data/products.ts`. Use `evidence.source` to say
   where each fact came from.
2. Put approved screenshots in `public/products/<slug>/` and list them with alt
   text and `approved: true`.
3. Run `npm run products:check`. It lists any blockers and also re-tests the
   gate against fixtures.
4. Set `evidence.verified: true` only after someone has checked each statement
   against the product.

Categories are in `productCategories`. Slugs must be unique and URL-safe.
