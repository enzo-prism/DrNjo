import { normalizePathname } from "./canonical";
import { testimonialPages } from "../client/src/data/testimonials";

function getTestimonialBySlug(slug: string) {
  return testimonialPages.find((item) => item.slug === slug);
}

const testimonialAuthorCounts = (() => {
  const counts = new Map<string, number>();
  for (const testimonial of testimonialPages) {
    counts.set(testimonial.author, (counts.get(testimonial.author) || 0) + 1);
  }
  return counts;
})();

function getTestimonialTitleSuffix(slug: string, author: string): string {
  const count = testimonialAuthorCounts.get(author) || 0;
  if (count <= 1) return "";
  const match = slug.match(/-(\d+)$/);
  if (!match) return "";
  return ` (${match[1]})`;
}

function buildTestimonialMetaExcerpt(quote: string, maxLength = 155): string {
  const cleaned = quote.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trimEnd()}…`;
}

function buildTestimonialMetaDescription({
  quote,
  author,
  suffix,
  maxLength = 155,
}: {
  quote: string;
  author: string;
  suffix: string;
  maxLength?: number;
}) {
  const authorLabel = `${author}${suffix}`;
  const prefix = `Testimonial from ${authorLabel} for Michael Njo DDS. `;

  if (prefix.length >= maxLength) {
    return `${prefix.slice(0, maxLength - 1).trimEnd()}…`;
  }

  const excerpt = buildTestimonialMetaExcerpt(quote, maxLength - prefix.length);
  return `${prefix}${excerpt}`;
}

export function buildPageTitle(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath.startsWith("/testimonials/")) {
    const slug = normalizedPath.replace("/testimonials/", "");
    const testimonial = getTestimonialBySlug(slug);
    if (testimonial) {
      const suffix = getTestimonialTitleSuffix(slug, testimonial.author);
      return `Testimonial from ${testimonial.author}${suffix} | Michael Njo DDS`;
    }
    return "Testimonials | Michael Njo DDS";
  }

  switch (normalizedPath) {
    case "/":
      return "Michael Njo DDS | Dental Strategies Consulting";
    case "/about":
    case "/michael-njo-dds":
      return "Michael Njo DDS | Practice Transitions Consultant";
    case "/testimonials":
      return "Testimonials for Michael Njo, DDS | Dental Strategies";
    case "/resources":
      return "Resources | Michael Njo, DDS";
    case "/dentalflix":
      return "DentalFlix Event Offer | Michael Njo, DDS";
    case "/contact":
      return "Contact Michael Njo, DDS | Dental Strategies";
    case "/contact/success":
      return "Message Sent | Michael Njo, DDS";
    default:
      return "Michael Njo, DDS | Dental Strategies";
  }
}

export function buildPageDescription(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath.startsWith("/testimonials/")) {
    const slug = normalizedPath.replace("/testimonials/", "");
    const testimonial = getTestimonialBySlug(slug);
    if (testimonial) {
      const suffix = getTestimonialTitleSuffix(slug, testimonial.author);
      return buildTestimonialMetaDescription({
        quote: testimonial.quote,
        author: testimonial.author,
        suffix,
      });
    }
    return "Read client testimonials for Michael Njo DDS and Dental Strategies Consulting.";
  }

  switch (normalizedPath) {
    case "/":
      return "Michael Njo DDS leads Dental Strategies Consulting, guiding dentists and healthcare owners through practice launches, growth, valuations, and transitions.";
    case "/contact":
      return "Contact Michael Njo, DDS for consulting, coaching, or speaking inquiries. Send a message to Dental Strategies and receive a personal response.";
    case "/about":
    case "/michael-njo-dds":
      return "Learn about Michael Njo DDS, founder of Dental Strategies Consulting and Practice Transitions Institute, specializing in dental practice transitions and growth strategy.";
    case "/testimonials":
      return "Read testimonials from dentists and healthcare professionals who have worked with Michael Njo, DDS through Dental Strategies and Practice Transitions Institute.";
    case "/resources":
      return "Access Dental Practice Transitions Handbook, Practice Transitions Institute, and other resources curated by Michael Njo, DDS for practice owners.";
    case "/dentalflix":
      return "DentalFlix event offer: get $500 off any service with Dr. Michael Njo. When you book or reach out, mention you heard about Michael from the DentalFlix event.";
    case "/contact/success":
      return "Confirmation that your message was sent to Michael Njo, DDS. Dental Strategies will respond within two business days.";
    default:
      return "Dental Strategies Consulting by Dr. Michael Njo helps healthcare owners launch, grow, value, and transition practices successfully.";
  }
}
