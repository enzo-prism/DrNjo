# SEO Checklist (Regression QA)

Use this checklist before every deploy and whenever adding new routes/content.

## 1) Indexability
- **No noindex anywhere**
  - `client/index.html` must keep `<meta name="robots" content="index,follow">`.
  - No page/component should add `noindex`, `nofollow`, or `noarchive`.
  - Server must not send `X‑Robots‑Tag: noindex` headers.
  - Run: `npm run seo:qa` and confirm `noindex` is `false` for all indexable pages.
- **All key pages reachable**
  - Homepage links to `/michael-njo-dds`, `/testimonials`, `/resources`, `/contact`.
  - Internal navigation uses `<a href="...">` (no JS‑only buttons for primary routes).
  - Run: `npm run check:crawl`.

## 2) Robots.txt + Sitemap
- **robots.txt**
  - Served at `https://michaelnjodds.com/robots.txt` with HTTP 200 + `text/plain`.
  - Allows all public pages, disallows only private/admin paths.
  - Includes `Sitemap: https://michaelnjodds.com/sitemap.xml`.
  - Run: `npm run check:robots`.
- **sitemap.xml**
  - Served at `https://michaelnjodds.com/sitemap.xml` with HTTP 200.
  - Contains canonical, indexable URLs only (no drafts/admin/errors).
  - Includes all testimonial slugs under `/testimonials/<slug>`.
  - Includes `<lastmod>` for testimonial URLs when `publishedAt` is available in `client/src/data/testimonials.ts`.
  - Run: `npm run generate:sitemap` then `npm run check:sitemap`.

## 3) Canonical Rules
- **Preferred origin**
  - Canonical host: `https://michaelnjodds.com` (non‑www).
  - Trailing slash: only `/` uses a trailing slash; all other canonicals do not.
- **Redirects**
  - `www` → non‑www 301.
  - `http` → `https` 301.
  - Trailing slash normalization 301.
  - Run: `npm run audit:canonical http://localhost:<port>`.

## 4) Titles + Meta Descriptions
- **Titles**
  - Every indexable page needs a unique, descriptive `<title>`.
  - Homepage title begins with “Michael Njo DDS”.
  - Testimonial detail pages use dynamic titles: `Testimonial from <Author> | Michael Njo DDS`.
  - Keep titles under ~60 characters when possible.
- **Meta descriptions**
  - Every indexable page needs a unique `<meta name="description" …>`.
  - Avoid duplication, boilerplate, or keyword stuffing.
  - Testimonial detail descriptions are generated from quote excerpts and must remain HTML-escaped.
  - Run: `npm run check:meta` and `npm run seo:qa`.

## 5) Open Graph + Twitter Metadata
- **Dynamic social metadata**
  - `og:title`, `og:description`, `og:url`, `twitter:title`, `twitter:description`, and `twitter:url` must match route-specific title/description/canonical.
  - `og:type` must be:
    - `website` for normal pages (including `/testimonials`)
    - `article` for `/testimonials/<slug>`
- **Validation**
  - Spot-check with curl:
    - `curl --compressed https://michaelnjodds.com/testimonials`
    - `curl --compressed https://michaelnjodds.com/testimonials/<slug>`

## 6) Structured Data
- **What we ship**
  - Core JSON‑LD is generated in `client/src/seo/structured-data.ts`.
  - Testimonial route JSON‑LD is generated server-side via `server/head.ts` and injected by `server/vite.ts`.
  - Home and `/michael-njo-dds` include `WebSite`, `Organization`, `Person`, and `ProfilePage`.
  - `/testimonials` includes `CollectionPage` + `ItemList`.
  - `/testimonials/<slug>` includes `Article` + `CreativeWork`.
  - We do **not** include `Review` / `AggregateRating` / `Rating` schema anywhere.
- **Validation**
  - Run build checks:
    - `npm run check:structured-data`
    - `npm run check:reviews`
  - Manual Rich Results Test:
    1. Open Google Rich Results Test.
    2. Test `https://michaelnjodds.com/`, `https://michaelnjodds.com/testimonials`, and at least one `https://michaelnjodds.com/testimonials/<slug>`.
    3. Confirm no errors/warnings and entities match visible content.

## 7) Search Console (manual setup)
1. Add property for `https://michaelnjodds.com/` (Domain or URL‑prefix).
2. Verify ownership (DNS preferred; HTML tag is acceptable).
3. Submit sitemap:
   - In **Sitemaps**, add `https://michaelnjodds.com/sitemap.xml`.
4. Check **Pages** report for coverage:
   - No important pages under “Excluded by ‘noindex’”.
   - Watch for “Duplicate without user‑selected canonical”.
5. Check **Enhancements**:
   - Fix any structured data errors.
6. Re‑crawl after major changes via **URL Inspection → Request indexing**.
