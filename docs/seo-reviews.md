# Review Schema Policy

Google treats star ratings and Review/AggregateRating structured data as **self‑serving** when a site marks up testimonials or ratings about its own business, services, or people. To stay compliant and avoid rich‑result penalties, this site follows a strict policy:

## Policy
- We **do not** emit `Review`, `Rating`, or `AggregateRating` JSON‑LD for testimonials about **Michael Njo, DDS**, **Dental Strategies**, or any of our consulting/services pages.
- Testimonials are displayed as normal on‑page content only.

## Allowed exceptions
We may include Review schema only for entities that are clearly **third‑party‑reviewed** and not our own services, such as:
- A `Book` node with Amazon/third‑party reviews shown verbatim on the site.

If adding a new exception:
1. Ensure the reviewed entity is not our business/person/service.
2. Ensure reviews/ratings are visible on the page.
3. Update this doc and the build check allow‑list.

## Enforcement
Build check: `npm run check:reviews`
- Traverses all JSON‑LD graphs.
- Fails if `Review` or `AggregateRating` appears outside an allowed ancestor type (currently only `Book`).

