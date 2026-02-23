# Frontend Update Log

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

### Deployment notes
- All adjustments were made in the React page/component layer while preserving existing routes and structured-data hooks.

## Follow-up update (Homepage QA)

- Fixed homepage FAQ section on mobile to enforce left alignment for all FAQ questions and answers.
- Corrected broken/barely visible icon sizing in the “Need a quick path forward?” card by increasing icon size, adding stable spacing, and preventing icon shrinkage in flex layout.
