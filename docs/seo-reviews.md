# Review Schema Policy

Google treats star ratings and Review/AggregateRating structured data as **self‑serving** when a site marks up testimonials or ratings about its own business, services, or people. To stay compliant and avoid rich‑result penalties, this site follows a strict policy:

## Policy
- We **do not** emit `Review`, `Rating`, or `AggregateRating` JSON‑LD anywhere on this site.
- Testimonials may be represented as neutral `CreativeWork` content in JSON‑LD (for crawlability and entity understanding), but never as rating/review rich snippet types.

## Enforcement
Build check: `npm run check:reviews`
- Traverses all JSON‑LD graphs.
- Fails if any `Review`, `AggregateRating`, or `Rating` type is present.
