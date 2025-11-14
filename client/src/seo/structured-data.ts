import { testimonials } from "@/data/testimonials";

export type FAQItem = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  name: string;
  description: string;
  audience: string;
};

export type ResourceHighlight = {
  name: string;
  description: string;
  url: string;
  type: "Book" | "EducationalOrganization";
};

export const siteMetadata = {
  siteUrl: "https://www.drnjo.com",
  name: "Michael Njo, DDS | Dental Strategies",
  description:
    "Dr. Michael Njo mentors dentists, physicians, and entrepreneurs through Dental Strategies, HealthcareStrategiesMD, Business Strategies, and Practice Transitions Institute.",
  sameAs: [
    "https://practicetransitionsinstitute.com/",
    "https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718",
  ],
  logo: "https://www.drnjo.com/og-image.webp",
};

export const contactDetails = {
  phone: "+1 (650) 436-2939",
  phoneInternational: "+16504362939",
  email: "dentalstrategies@gmail.com",
};

export const personProfile = {
  id: "https://www.drnjo.com/#person",
  name: "Dr. Michael Njo",
  alternateName: "Michael Njo, DDS",
  jobTitle: "Founder & Strategy Consultant",
  description:
    "Dr. Michael Njo leads Dental Strategies, HealthcareStrategiesMD, Business Strategies, and Practice Transitions Institute to mentor healthcare owners through practice launches, growth, and transitions.",
};

export const organizationProfile = {
  id: "https://www.drnjo.com/#organization",
  name: "Dental Strategies",
  legalName: "Dental Strategies Consulting",
  url: siteMetadata.siteUrl,
  logo: siteMetadata.logo,
};

export const faqItems: FAQItem[] = [
  {
    question: "Who is Dr. Michael Njo?",
    answer:
      "Dr. Michael Njo, also known as Michael Njo, DDS, is a University of the Pacific alum and the founder of Dental Strategies, HealthcareStrategiesMD, Business Strategies, and Practice Transitions Institute. He mentors dentists, physicians, and entrepreneurs through every phase of practice ownership.",
  },
  {
    question: "What services does Michael Njo, DDS provide?",
    answer:
      "Michael Njo, DDS delivers bespoke consulting across practice startups, acquisitions, valuations, transitions, leadership development, and team training. His playbooks combine clinical experience with business strategy to elevate growth while protecting patient care standards.",
  },
  {
    question: "How can I work with Dr. Michael Njo?",
    answer:
      "You can call +1 (650) 436-2939 or email dentalstrategies@gmail.com to schedule a complimentary consultation with Dr. Michael Njo. He begins with an assessment of your goals, timeline, and financial targets before crafting a road map tailored to your practice.",
  },
];

export const services: ServiceDetail[] = [
  {
    name: "Practice launches and acquisitions",
    description:
      "Coaching for dentists planning a start-up or purchase, including diligence, deal structure, and operational onboarding.",
    audience: "Dentists planning a new practice or expanding to a second location",
  },
  {
    name: "Growth planning and leadership",
    description:
      "Strategic planning, technology integration, and team development frameworks to scale patient experience and profitability.",
    audience: "Owners focused on scaling multi-doctor or multi-location practices",
  },
  {
    name: "Practice valuations and transitions",
    description:
      "Comprehensive valuations, partnership design, retirement roadmaps, and seller/buyer alignment to protect legacy and staff.",
    audience: "Doctors preparing for retirement, partnership changes, or chart sales",
  },
  {
    name: "Conflict resolution and compliance",
    description:
      "Support navigating malpractice, regulatory issues, and sensitive team alignment to keep practices stable during change.",
    audience: "Healthcare owners facing complex legal, regulatory, or personnel challenges",
  },
];

export const resources: ResourceHighlight[] = [
  {
    type: "Book",
    name: "Dental Practice Transitions Handbook",
    description: "Comprehensive guide for navigating practice transitions, partnerships, and strategic planning.",
    url: "https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718",
  },
  {
    type: "EducationalOrganization",
    name: "Practice Transitions Institute",
    description:
      "Specialized education and training for dental professionals on practice transitions and growth strategies.",
    url: "https://practicetransitionsinstitute.com/",
  },
];

const totalStars = testimonials.reduce((sum, testimonial) => sum + testimonial.stars, 0);

export const reviewStats = {
  reviewCount: testimonials.length,
  ratingValue: testimonials.length ? Number((totalStars / testimonials.length).toFixed(2)) : undefined,
  bestRating: 5,
  worstRating: 1,
};

export const heroImage = {
  url: "https://www.drnjo.com/og-image.webp",
  width: 1024,
  height: 768,
  type: "image/webp",
};

type SchemaNode = Record<string, unknown>;

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const getServiceNodes = (): SchemaNode[] =>
  services.map((service) => ({
    "@type": "Service",
    "@id": `${siteMetadata.siteUrl}#service-${slugify(service.name)}`,
    name: service.name,
    description: service.description,
    serviceType: service.name,
    provider: {
      "@id": organizationProfile.id,
    },
    audience: {
      "@type": "Audience",
      audienceType: service.audience,
    },
  }));

const getReviewList = (): SchemaNode[] =>
  testimonials.map((testimonial, index) => ({
    "@type": "Review",
    "@id": `${siteMetadata.siteUrl}#review-${index + 1}`,
    name: `Client testimonial ${index + 1}`,
    reviewBody: testimonial.quote,
    author: {
      "@type": "Person",
      name: testimonial.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.stars,
      bestRating: 5,
      worstRating: 1,
    },
  }));

const getFAQEntity = (): SchemaNode => ({
  "@type": "FAQPage",
  "@id": `${siteMetadata.siteUrl}#faq`,
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

const getResourceNodes = (): SchemaNode[] =>
  resources.map((resource) => {
    if (resource.type === "Book") {
      return {
        "@type": "Book",
        "@id": `${siteMetadata.siteUrl}#book`,
        name: resource.name,
        description: resource.description,
        isbn: "1627878718",
        url: resource.url,
        author: {
          "@id": personProfile.id,
        },
        publisher: {
          "@id": organizationProfile.id,
        },
      };
    }

    return {
      "@type": "EducationalOrganization",
      "@id": `${siteMetadata.siteUrl}#pti`,
      name: resource.name,
      description: resource.description,
      url: resource.url,
      founder: {
        "@id": personProfile.id,
      },
    };
  });

const getBaseGraphNodes = (): SchemaNode[] => {
  const contactPoint = {
    "@type": "ContactPoint",
    contactType: "Consultation",
    telephone: contactDetails.phoneInternational,
    email: contactDetails.email,
    availableLanguage: ["English"],
  };

  const organization = {
    "@type": "Organization",
    "@id": organizationProfile.id,
    name: organizationProfile.name,
    legalName: organizationProfile.legalName,
    url: organizationProfile.url,
    logo: organizationProfile.logo,
    sameAs: siteMetadata.sameAs,
    contactPoint,
    founder: {
      "@id": personProfile.id,
    },
  };

  const person = {
    "@type": "Person",
    "@id": personProfile.id,
    name: personProfile.name,
    alternateName: personProfile.alternateName,
    jobTitle: personProfile.jobTitle,
    description: personProfile.description,
    url: siteMetadata.siteUrl,
    image: heroImage.url,
    sameAs: siteMetadata.sameAs,
    worksFor: {
      "@id": organizationProfile.id,
    },
    knowsAbout: [
      "Dental practice transitions",
      "Healthcare consulting",
      "Business strategy",
      "Practice valuations",
      "Leadership development",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewStats.ratingValue,
      bestRating: reviewStats.bestRating,
      worstRating: reviewStats.worstRating,
      reviewCount: reviewStats.reviewCount,
    },
    review: getReviewList(),
  };

  const webSite = {
    "@type": "WebSite",
    "@id": `${siteMetadata.siteUrl}#website`,
    url: siteMetadata.siteUrl,
    name: siteMetadata.name,
    description: siteMetadata.description,
    publisher: {
      "@id": organizationProfile.id,
    },
  };

  const professionalService = {
    "@type": "ProfessionalService",
    "@id": `${siteMetadata.siteUrl}#professional-service`,
    name: "Dental Strategies Consulting",
    description:
      "Specialized consulting collective serving dentists, physicians, podiatrists, osteopaths, and healthcare entrepreneurs across practice launches, growth, and transitions.",
    url: siteMetadata.siteUrl,
    provider: {
      "@id": organizationProfile.id,
    },
    serviceType: services.map((service) => service.name),
    audience: {
      "@type": "Audience",
      audienceType: "Dentists, physicians, podiatrists, osteopaths, and business owners",
    },
  };

  const heroImageNode = {
    "@type": "ImageObject",
    "@id": `${siteMetadata.siteUrl}#hero-image`,
    url: heroImage.url,
    width: heroImage.width,
    height: heroImage.height,
    encodingFormat: heroImage.type,
  };

  return [webSite, organization, person, professionalService, heroImageNode, ...getServiceNodes(), ...getResourceNodes()];
};

const buildBreadcrumb = (items: { name: string; item: string }[]): SchemaNode => ({
  "@type": "BreadcrumbList",
  "@id": `${siteMetadata.siteUrl}#breadcrumb-${slugify(items[items.length - 1]?.name || "home")}`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
});

const buildWebPage = ({
  id,
  name,
  description,
  url,
  breadcrumbId,
}: {
  id: string;
  name: string;
  description: string;
  url: string;
  breadcrumbId: string;
}): SchemaNode => ({
  "@type": "WebPage",
  "@id": id,
  name,
  url,
  description,
  inLanguage: "en",
  isPartOf: {
    "@id": `${siteMetadata.siteUrl}#website`,
  },
  breadcrumb: {
    "@id": breadcrumbId,
  },
  about: {
    "@id": personProfile.id,
  },
  primaryImageOfPage: {
    "@id": `${siteMetadata.siteUrl}#hero-image`,
  },
});

export const getHomeStructuredData = () => {
  const breadcrumb = buildBreadcrumb([
    { name: "Home", item: siteMetadata.siteUrl },
  ]);

  const homePage = buildWebPage({
    id: `${siteMetadata.siteUrl}#home`,
    name: siteMetadata.name,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    breadcrumbId: breadcrumb["@id"] as string,
  });

  const faqEntity = getFAQEntity();

  const graph = [...getBaseGraphNodes(), homePage, faqEntity, breadcrumb];
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const getContactStructuredData = () => {
  const contactUrl = `${siteMetadata.siteUrl}/contact`;
  const breadcrumb = buildBreadcrumb([
    { name: "Home", item: siteMetadata.siteUrl },
    { name: "Contact", item: contactUrl },
  ]);

  const contactPage: SchemaNode = {
    ...buildWebPage({
      id: `${contactUrl}#webpage`,
      name: "Contact Dr. Michael Njo",
      description: "Send a direct message to Dr. Michael Njo for consulting inquiries or speaking engagements.",
      url: contactUrl,
      breadcrumbId: breadcrumb["@id"] as string,
    }),
    "@type": ["WebPage", "ContactPage"],
    potentialAction: {
      "@type": "ContactAction",
      name: "Submit consultation inquiry",
      target: contactUrl,
      result: {
        "@type": "Thing",
        name: "Confirmation message",
      },
    },
  };

  const graph = [...getBaseGraphNodes(), contactPage, breadcrumb];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const getContactSuccessStructuredData = () => {
  const successUrl = `${siteMetadata.siteUrl}/contact/success`;
  const breadcrumb = buildBreadcrumb([
    { name: "Home", item: siteMetadata.siteUrl },
    { name: "Contact", item: `${siteMetadata.siteUrl}/contact` },
    { name: "Thank you", item: successUrl },
  ]);

  const webPage = buildWebPage({
    id: `${successUrl}#webpage`,
    name: "Message received by Dr. Michael Njo",
    description: "Confirmation that your message has been sent to Dr. Michael Njo at Dental Strategies.",
    url: successUrl,
    breadcrumbId: breadcrumb["@id"] as string,
  });

  const graph = [...getBaseGraphNodes(), webPage, breadcrumb];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};
