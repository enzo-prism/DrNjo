# Frontend Update Log

## 2026-03-02

### Server-side structured data parity
- Expanded `server/head.ts` route-level JSON-LD coverage beyond testimonials to include:
  - `/` (home graph)
  - `/michael-njo-dds` (profile graph + upcoming event entities)
  - `/dr-michael-njo-interview` (video/interview graph)
  - `/contact` and `/contact/success` (contact flow graphs)
- This ensures bots that do not execute client JavaScript still receive core schema directly in HTML via `route-structured-data`.
- Enhanced `scripts/check-structured-data.ts` to validate server-routed schema presence/types for the paths above, including `EducationEvent`/`Event` assertions on `/michael-njo-dds`.

### Upcoming events area for Dr. Njo
- Reworked `/michael-njo-dds` **News** tab into an events-focused experience with an **Upcoming Events** header and clear event cards.
- Added two live event programs:
  - **Mastering Your Dental Transition Into and Out of Practice** (`seminar`, registration open, 5 dates with 3 upcoming dates/locations rendered and a “View 2 completed events” marker)
  - **Leadership Retreat** (`conference`, registration open, June 4-6, 2026 in Savannah, GA)
- Added direct registration CTAs for the seminar event (`tel:` and `mailto:` links) while preserving the existing card style and responsive behavior.
- Moved event copy into a dedicated data source (`client/src/data/events.ts`) for easier future updates.

### Event structured data updates
- Added event JSON-LD nodes to `getMichaelNjoStructuredData()` so bots can interpret upcoming seminar/retreat details as machine-readable `EducationEvent` / `Event` entities.
- Event schema now includes: title, description, schedule status, attendance mode, location, organizer, performer, and event URL.

### Testimonial metadata and crawler updates
- Updated testimonial publication dates (`publishedAt`) so testimonial ordering reflects the intended recency sequence.
- Added route-level structured data for testimonial pages:
  - `/testimonials` now emits `CollectionPage` + `ItemList` + `CreativeWork` entries.
  - `/testimonials/:slug` now emits `WebPage` + `Article` + `CreativeWork` with `datePublished` when available.
- Added legacy testimonial URL redirects:
  - `/testimonials/dr-fat` → `/testimonials/diana-fat-dds`
  - `/testimonials/richard-and-kimberly-crum` → `/testimonials/kimberly-crum`

### Head metadata hardening
- Made server-side head injection route-aware for:
  - canonical URL
  - title
  - meta description
  - Open Graph (`og:type`, `og:title`, `og:description`, `og:url`)
  - Twitter (`twitter:title`, `twitter:description`, `twitter:url`)
- Added HTML escaping for injected head values to prevent malformed meta tags when testimonial text includes punctuation/quotes.

### Sitemap improvements
- Sitemap generation now includes `<lastmod>` for testimonial URLs when `publishedAt` is present.
- Regenerated `client/public/sitemap.xml` to publish updated last-modified signals.

## 2026-02-23

### Branding and navigation changes
- Updated navbar brand text to **Dr. Michael Njo** and changed subtitle to **Dental Strategies**.
- Replaced navbar avatar text badge with the repo logo image (`/favicon.svg`).
- Removed the **DentalFlix** nav item from header and footer navigation.
- Updated footer copy to show **Michael Njo, DDS** in brand text and changed footer copyright owner to **Dental Strategies**.

### Page copy and layout refinements
- Changed homepage, profile, and contact page heading usage to the requested `Dr. Michael Njo` naming style.
- Updated `/testimonials` and `/resources` page headings/cta to match requested copy.
- Removed the dentalflix CTA from the homepage “Need a quick path forward?” card.

### Card and media updates
- Simplified `/resources` cards so the handbook/institute cards focus on title + description + action button.
- Adjusted `/michael-njo-dds` news card images to `object-contain` so full poster images are visible and not cropped.
- Swapped the profile About card image to use the existing University collaboration photo.
- Rebuilt **Life & Leadership in Media** in `/michael-njo-dds` as an image-first gallery: no captions rendered inside cards, same photo set preserved.
- Updated gallery interaction to use a subtle corner “Open” pill that appears only on hover/focus (no center block overlay).
- Removed the button from the **About Dr. Michael Njo** card to keep that section text-and-photo only.

### Deployment notes
- All adjustments were made in the React page/component layer while preserving existing routes and structured-data hooks.

## Follow-up update (Homepage QA)

- Fixed homepage FAQ section on mobile to enforce left alignment for all FAQ questions and answers.
- Corrected broken/barely visible icon sizing in the “Need a quick path forward?” card by increasing icon size, adding stable spacing, and preventing icon shrinkage in flex layout.

## Follow-up update (Testimonial detail UX)

- Fixed the `/testimonials/:slug` page rating display to use star icons instead of dot markers, matching the testimonial list card style.
