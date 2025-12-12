# SEO Structured Data (JSON‑LD)

This site outputs Google‑friendly JSON‑LD to clarify the main entities (Michael Njo, DDS and Dental Strategies) and to support rich results.

## Where it lives
- Schema generators: `client/src/seo/structured-data.ts`
  - `getHomeStructuredData()` for `/`
  - `getMichaelNjoStructuredData()` for `/michael-njo-dds`
  - `getContactStructuredData()` and `getContactSuccessStructuredData()` for contact flows
- Script tag renderer: `client/src/components/structured-data.tsx`
- Attached to pages:
  - `client/src/pages/home.tsx`
  - `client/src/pages/michael-njo-dds.tsx`
  - `client/src/pages/contact.tsx`
  - `client/src/pages/contact-success.tsx` (if present)

## What’s included
Base graph nodes (shared across pages):
- `WebSite` (`name: "Michael Njo, DDS"`, `alternateName: "Michael Njo DDS"`, canonical `url`)
- `Organization` for **Dental Strategies** (url/logo/contactPoint)
- `Person` for **Michael Njo, DDS** (name/alternateName/jobTitle/image/worksFor/sameAs)
- `ImageObject` for the hero image
- `Service` nodes derived from the on‑page services list
- `Book` and `EducationalOrganization` nodes for public resources
- `Review` + `AggregateRating` only for third‑party book reviews (not for testimonials about our services)

Per‑page nodes:
- `/`: `WebPage` + `ProfilePage`, `FAQPage`, `BreadcrumbList`
- `/michael-njo-dds`: `WebPage` + `ProfilePage`, `BreadcrumbList`
- `/contact`: `ContactPage`, `BreadcrumbList`

## Updating sameAs / social links
Only add `sameAs` URLs (LinkedIn, X, YouTube, etc.) if they are also linked visibly on the site. This keeps structured data aligned with on‑page content and avoids Search Console “unsupported/incorrect field” warnings.

## Validation
Build‑time check: `npm run check:structured-data`
- Ensures JSON‑LD is rendered on `/` and `/michael-njo-dds`
- Ensures the JSON produced by the generators serializes cleanly
