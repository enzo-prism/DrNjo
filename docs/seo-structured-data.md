# SEO Structured Data (JSON‑LD)

This site outputs Google‑friendly JSON‑LD to clarify the main entities (Michael Njo, DDS and Dental Strategies) and to support rich results.

## Where it lives
- Static schema generators: `client/src/seo/structured-data.ts`
  - `getHomeStructuredData()` for `/`
  - `getMichaelNjoStructuredData()` for `/michael-njo-dds`
  - `getContactStructuredData()` and `getContactSuccessStructuredData()` for contact flows
- Static script renderer: `client/src/components/structured-data.tsx`
- Route-aware schema generators: `server/head.ts`
  - `buildPageStructuredData("/testimonials")` for the testimonials archive
  - `buildPageStructuredData("/testimonials/:slug")` for testimonial detail pages
- Route injection point: `server/vite.ts`
  - Injects `application/ld+json` into `<head>` with `id="route-structured-data"`

## What’s included
Base graph nodes (shared across pages):
- `WebSite` (`name: "Michael Njo, DDS"`, `alternateName: "Michael Njo DDS"`, canonical `url`)
- `Organization` for **Dental Strategies** (url/logo/contactPoint)
- `Person` for **Michael Njo, DDS** (name/alternateName/jobTitle/image/worksFor/sameAs)
- `ImageObject` for the hero image
- `Service` nodes derived from the on‑page services list
- `Book` and `EducationalOrganization` nodes for public resources
- No `Review` / `AggregateRating` / `Rating` schema (avoids “Review snippet” errors and self‑serving review risks)

Per‑page nodes:
- `/`: `WebPage` + `ProfilePage`, `FAQPage`, `BreadcrumbList`
- `/michael-njo-dds`: `WebPage` + `ProfilePage`, `BreadcrumbList`
- `/contact`: `ContactPage`, `BreadcrumbList`
- `/testimonials`: `CollectionPage`, `BreadcrumbList`, and `ItemList` of testimonial `CreativeWork` items
- `/testimonials/:slug`: `WebPage` + `Article`, `BreadcrumbList`, and a testimonial `CreativeWork` main entity

## Updating sameAs / social links
Only add `sameAs` URLs (LinkedIn, X, YouTube, etc.) if they are also linked visibly on the site. This keeps structured data aligned with on‑page content and avoids Search Console “unsupported/incorrect field” warnings.

## Validation
Build checks:
- `npm run check:structured-data`
  - Ensures core page JSON‑LD generators serialize correctly.
- `npm run check:reviews`
  - Fails if `Review`, `AggregateRating`, or `Rating` types appear in any checked graph, including testimonial route graphs.

HTTP verification (recommended):
- `curl --compressed https://michaelnjodds.com/testimonials | rg "route-structured-data|CollectionPage|ItemList"`
- `curl --compressed https://michaelnjodds.com/testimonials/<slug> | rg "route-structured-data|Article|CreativeWork"`
