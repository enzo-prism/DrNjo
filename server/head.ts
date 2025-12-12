import { normalizePathname } from "./canonical";

export function buildPageTitle(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);

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
    case "/contact/success":
      return "Confirmation that your message was sent to Michael Njo, DDS. Dental Strategies will respond within two business days.";
    default:
      return "Dental Strategies Consulting by Dr. Michael Njo helps healthcare owners launch, grow, value, and transition practices successfully.";
  }
}
