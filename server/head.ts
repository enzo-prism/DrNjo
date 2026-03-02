import { buildCanonicalUrl, CANONICAL_ORIGIN, normalizePathname } from "./canonical";
import { testimonialPages } from "../client/src/data/testimonials";

const LEGACY_TESTIMONIAL_SLUGS: Record<string, string> = {
  "dr-fat": "diana-fat-dds",
  "richard-and-kimberly-crum": "kimberly-crum",
};

const WEBSITE_NODE_ID = `${CANONICAL_ORIGIN}/#website`;
const PERSON_NODE_ID = `${CANONICAL_ORIGIN}/#person`;

function resolveTestimonialSlug(slug: string) {
  return LEGACY_TESTIMONIAL_SLUGS[slug] || slug;
}

function getTestimonialBySlug(slug: string) {
  const normalizedSlug = resolveTestimonialSlug(slug);
  return testimonialPages.find((item) => item.slug === normalizedSlug);
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

function getTestimonialContext(pathname: string) {
  const normalizedPath = normalizePathname(pathname);
  if (!normalizedPath.startsWith("/testimonials/")) return null;

  const requestedSlug = normalizedPath.replace("/testimonials/", "");
  if (!requestedSlug) return null;

  const slug = resolveTestimonialSlug(requestedSlug);
  const testimonial = getTestimonialBySlug(slug);
  if (!testimonial) return null;

  return { requestedSlug, slug, testimonial };
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
    const context = getTestimonialContext(normalizedPath);
    if (context) {
      const suffix = getTestimonialTitleSuffix(context.slug, context.testimonial.author);
      return `Testimonial from ${context.testimonial.author}${suffix} | Michael Njo DDS`;
    }
    return "Testimonials | Michael Njo DDS";
  }

  switch (normalizedPath) {
    case "/":
      return "Michael Njo DDS | Dental Strategies Consulting";
    case "/about":
    case "/michael-njo-dds":
      return "Michael Njo DDS | Practice Transitions Consultant";
    case "/phillips-event":
      return "Phillips Event | Building a Sale-Ready Dental Practice | Dental Strategies";
    case "/dr-michael-njo-interview":
      return "Dr. Michael Njo Interview | Dental Practice Transitions & Consulting";
    case "/dr-michael-neal-interview":
      return "Dr. Michael Neal Interview | Dental Strategies";
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
    const context = getTestimonialContext(normalizedPath);
    if (context) {
      const suffix = getTestimonialTitleSuffix(context.slug, context.testimonial.author);
      return buildTestimonialMetaDescription({
        quote: context.testimonial.quote,
        author: context.testimonial.author,
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
    case "/dr-michael-njo-interview":
      return "Watch Dr. Michael Njo discuss his journey from private practice to building Dental Strategies through transitions, management, and legal guidance.";
    case "/testimonials":
      return "Read testimonials from dentists and healthcare professionals who have worked with Michael Njo, DDS through Dental Strategies and Practice Transitions Institute.";
    case "/resources":
      return "Access Dental Practice Transitions Handbook, Practice Transitions Institute, and other resources curated by Michael Njo, DDS for practice owners.";
    case "/phillips-event":
      return "Attend the Phillips Event in Anaheim to learn how to make your dental practice more valuable, more durable, and ready for any transition.";
    case "/dentalflix":
      return "DentalFlix event offer: get $500 off any service with Dr. Michael Njo. When you book or reach out, mention you heard about Michael from the DentalFlix event.";
    case "/dr-michael-neal-interview":
      return "Watch the Dr. Michael Neal interview, then read how these lessons connect to Dr. Michael Njo's practice transition work.";
    case "/contact/success":
      return "Confirmation that your message was sent to Michael Njo, DDS. Dental Strategies will respond within two business days.";
    default:
      return "Dental Strategies Consulting by Dr. Michael Njo helps healthcare owners launch, grow, value, and transition practices successfully.";
  }
}

export function buildOpenGraphType(pathname: string): "website" | "article" {
  const normalizedPath = normalizePathname(pathname);
  if (normalizedPath.startsWith("/testimonials/")) {
    return "article";
  }
  return "website";
}

type SchemaNode = Record<string, unknown>;

function buildBreadcrumb(items: Array<{ name: string; item: string }>, id: string): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function buildTestimonialCreativeWork(
  testimonial: (typeof testimonialPages)[number],
  detailPath: string,
  useExcerpt: boolean,
): SchemaNode {
  const canonicalUrl = buildCanonicalUrl(detailPath);
  const node: SchemaNode = {
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#testimonial`,
    url: canonicalUrl,
    name: `Testimonial from ${testimonial.author}`,
    author: {
      "@type": "Person",
      name: testimonial.author,
    },
    text: useExcerpt ? testimonial.excerpt : testimonial.quote,
    inLanguage: "en",
    about: {
      "@id": PERSON_NODE_ID,
    },
    publisher: {
      "@type": "Organization",
      name: "Dental Strategies",
      url: CANONICAL_ORIGIN,
    },
  };

  if (testimonial.publishedAt) {
    node.datePublished = testimonial.publishedAt;
    node.dateModified = testimonial.publishedAt;
  }

  return node;
}

function buildTestimonialsCollectionStructuredData(): SchemaNode {
  const pathname = "/testimonials";
  const collectionUrl = buildCanonicalUrl(pathname);
  const breadcrumbId = `${collectionUrl}#breadcrumb`;
  const itemListId = `${collectionUrl}#item-list`;

  const breadcrumb = buildBreadcrumb(
    [
      { name: "Home", item: buildCanonicalUrl("/") },
      { name: "Testimonials", item: collectionUrl },
    ],
    breadcrumbId,
  );

  const itemListElements = testimonialPages.map((testimonial, index) => {
    const detailPath = `/testimonials/${testimonial.slug}`;
    return {
      "@type": "ListItem",
      position: index + 1,
      url: buildCanonicalUrl(detailPath),
      item: buildTestimonialCreativeWork(testimonial, detailPath, true),
    };
  });

  const itemList: SchemaNode = {
    "@type": "ItemList",
    "@id": itemListId,
    name: "Client testimonials for Michael Njo, DDS",
    numberOfItems: testimonialPages.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: itemListElements,
  };

  const page: SchemaNode = {
    "@type": ["CollectionPage", "WebPage"],
    "@id": `${collectionUrl}#webpage`,
    url: collectionUrl,
    name: buildPageTitle(pathname),
    description: buildPageDescription(pathname),
    inLanguage: "en",
    isPartOf: {
      "@id": WEBSITE_NODE_ID,
    },
    about: {
      "@id": PERSON_NODE_ID,
    },
    breadcrumb: {
      "@id": breadcrumbId,
    },
    mainEntity: {
      "@id": itemListId,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [page, breadcrumb, itemList],
  };
}

function buildTestimonialDetailStructuredData(pathname: string): SchemaNode | null {
  const context = getTestimonialContext(pathname);
  if (!context) return null;

  const detailPath = `/testimonials/${context.slug}`;
  const detailUrl = buildCanonicalUrl(detailPath);
  const testimonialsUrl = buildCanonicalUrl("/testimonials");
  const suffix = getTestimonialTitleSuffix(context.slug, context.testimonial.author);
  const breadcrumbId = `${detailUrl}#breadcrumb`;
  const testimonialNode = buildTestimonialCreativeWork(context.testimonial, detailPath, false);

  const breadcrumb = buildBreadcrumb(
    [
      { name: "Home", item: buildCanonicalUrl("/") },
      { name: "Testimonials", item: testimonialsUrl },
      { name: `${context.testimonial.author}${suffix}`, item: detailUrl },
    ],
    breadcrumbId,
  );

  const page: SchemaNode = {
    "@type": ["WebPage", "Article"],
    "@id": `${detailUrl}#webpage`,
    url: detailUrl,
    name: buildPageTitle(detailPath),
    description: buildPageDescription(detailPath),
    inLanguage: "en",
    isPartOf: {
      "@id": `${testimonialsUrl}#webpage`,
    },
    breadcrumb: {
      "@id": breadcrumbId,
    },
    about: {
      "@id": PERSON_NODE_ID,
    },
    mainEntity: {
      "@id": testimonialNode["@id"] as string,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [page, breadcrumb, testimonialNode],
  };
}

export function buildPageStructuredData(pathname: string): SchemaNode | null {
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath === "/testimonials") {
    return buildTestimonialsCollectionStructuredData();
  }

  if (normalizedPath.startsWith("/testimonials/")) {
    return buildTestimonialDetailStructuredData(normalizedPath);
  }

  return null;
}
