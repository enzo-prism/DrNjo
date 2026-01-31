import { Mail, BookOpen, ExternalLink, GraduationCap, Star, Users } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { testimonialPages } from "@/data/testimonials";
import { dugoniCollaborationImage } from "@/data/media";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/structured-data";
import { bookEditorialReview, bookReviews, faqItems, getHomeStructuredData } from "@/seo/structured-data";

export default function Home() {
  const handleEmail = () => {
    window.location.href = "mailto:dentalstrategies@gmail.com";
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let elements: Element[] = [];

    const setupObserver = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      elements = Array.from(document.querySelectorAll(".scroll-fade-in"));
      elements.forEach((el) => observer?.observe(el));
    };

    const idleCallback = (window as any).requestIdleCallback as ((cb: () => void) => number) | undefined;
    const cancelIdle = (window as any).cancelIdleCallback as ((id: number) => void) | undefined;
    let cancel = () => {};

    if (typeof idleCallback === "function") {
      const id = idleCallback(setupObserver);
      cancel = () => cancelIdle?.(id);
    } else {
      const id = window.setTimeout(setupObserver, 0);
      cancel = () => window.clearTimeout(id);
    }

    return () => {
      cancel();
      if (observer) {
        elements.forEach((el) => observer?.unobserve(el));
        observer.disconnect();
      }
    };
  }, []);

  const founderCompanies = [
    {
      name: "Dental Strategies",
      accent: "from-blue-50 to-blue-100/70 border-blue-200",
    },
    {
      name: "HealthcareStrategiesMD",
      accent: "from-emerald-50 to-emerald-100/70 border-emerald-200",
    },
    {
      name: "Business Strategies",
      accent: "from-amber-50 to-amber-100/70 border-amber-200",
    },
    {
      name: "Practice Transitions Institute",
      accent: "from-indigo-50 to-indigo-100/70 border-indigo-200",
    },
  ];

  return (
    <>
      <StructuredData data={getHomeStructuredData()} id="structured-data-home" />
      <main className="min-h-screen bg-white">
      <div className="flex items-center justify-center px-4 py-8 md:py-16">
        <div className="max-w-4xl w-full">
          <div className="dental-card overflow-hidden opacity-0 translate-y-5 fade-in-up">
          {/* Professional Photo Section */}
          <div className="relative h-80 md:h-96 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="relative">
		              <img 
		                src="/dr-njo-headshot.webp"
		                alt="Michael Njo, DDS - Professional headshot"
		                width={383}
		                height={460}
		                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-center shadow-2xl ring-4 ring-white professional-headshot transition-all duration-300"
		              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Company Name & Introduction */}
            <div className="text-center mb-12" aria-labelledby="hero-heading">
	              <h1
	                id="hero-heading"
	                className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-tight opacity-0 animate-[fadeInStagger_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards]"
	              >
	                Michael Njo, DDS
	              </h1>
              <div className="mb-6 flex flex-col items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg shadow-blue-600/30"
                >
                  Contact Dr. Njo
                </Link>
                <div className="flex flex-col items-center gap-2 text-sm text-gray-600">
                  <a
                    href="mailto:dentalstrategies@gmail.com"
                    className="hover:text-blue-600 transition-colors"
                  >
                    dentalstrategies@gmail.com
                  </a>
                  <a
                    href="tel:+16504362939"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Cell: 650-436-2939
                  </a>
                </div>
              </div>
	              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
	                Dr. Michael Njo—widely known as Michael Njo, DDS—is a consultant, educator, and entrepreneur who has spent 25+ years guiding healthcare owners through practice launches, growth, and transitions while protecting clinical excellence.
	              </p>
	              <div className="flex justify-center mb-8">
	                <Button variant="outline" asChild>
	                  <Link href="/michael-njo-dds">Read Michael Njo DDS profile</Link>
	                </Button>
	              </div>
	              <div className="mb-10" aria-labelledby="founder-label">
                <h2
                  id="founder-label"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium tracking-wide uppercase"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Founder of
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {founderCompanies.map(({ name, accent }) => (
                    <div
                      key={name}
                      className={`rounded-2xl border ${accent} px-5 py-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg scroll-fade-in`}
                    >
	                      <h3 className="text-xl font-semibold text-gray-900">
	                        {name}
	                      </h3>
	                    </div>
	                  ))}
                </div>
              </div>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-600 font-light leading-relaxed transition-colors duration-300">
                  Michael Njo, DDS leads a specialized consulting collective that coaches dentists, physicians, podiatrists, osteopaths, and business owners to launch, scale, or transition their practices with confidence.
                </p>
                <div className="mt-6">
	                <Link
	                  href="/testimonials"
	                  className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-all duration-300 group"
	                >
	                  <Star className="w-4 h-4 mr-1 fill-current animate-[starSparkle_2s_ease-in-out_infinite]" />
	                  <span className="hover-underline">Trusted by hundreds of healthcare professionals</span>
	                </Link>
                </div>
              </div>
              <div className="mt-10 scroll-fade-in">
                <div className="rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
	                  <img
	                    src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762786458/dugoni-business-club-donation-ceremony_plth4r.webp"
	                    srcSet={[
	                      "https://res.cloudinary.com/dhqpqfw6w/image/upload/c_limit,w_640,f_auto,q_auto/v1762786458/dugoni-business-club-donation-ceremony_plth4r.webp 640w",
	                      "https://res.cloudinary.com/dhqpqfw6w/image/upload/c_limit,w_960,f_auto,q_auto/v1762786458/dugoni-business-club-donation-ceremony_plth4r.webp 960w",
	                      "https://res.cloudinary.com/dhqpqfw6w/image/upload/c_limit,w_1280,f_auto,q_auto/v1762786458/dugoni-business-club-donation-ceremony_plth4r.webp 1280w",
	                      "https://res.cloudinary.com/dhqpqfw6w/image/upload/c_limit,w_1600,f_auto,q_auto/v1762786458/dugoni-business-club-donation-ceremony_plth4r.webp 1600w",
	                    ].join(", ")}
	                    sizes="(max-width: 768px) 100vw, 768px"
	                    width={1645}
	                    height={1095}
	                    alt="Michael Njo, DDS at the Dugoni Business Club donation ceremony"
	                    className="w-full h-full object-cover"
	                    loading="lazy"
	                    decoding="async"
	                  />
                </div>
              </div>
            </div>

            {/* Testimonials / Social Proof */}
            <section
              id="testimonials"
              className="max-w-4xl mx-auto mb-12"
              aria-labelledby="testimonials-heading"
            >
              <h2
                id="testimonials-heading"
                className="text-2xl font-light text-gray-800 mb-6 text-center transition-colors duration-300"
              >
                Testimonials for Dr. Michael Njo
              </h2>
              <p className="text-center text-sm text-gray-500 mb-6">
                Real-world stories from the doctors, teams, and advisors mentored by Dr. Michael Njo across Dental Strategies, HealthcareStrategiesMD, Business Strategies, and Practice Transitions Institute.
              </p>
	              <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 scroll-fade-in">
	                <img 
	                  src="/dr-njo-clients-1280.webp"
	                  srcSet={[
	                    "/dr-njo-clients-640.webp 640w",
	                    "/dr-njo-clients-960.webp 960w",
	                    "/dr-njo-clients-1280.webp 1280w",
	                    "/dr-njo-clients-1600.webp 1600w",
	                    "/dr-njo-clients-1920.webp 1920w",
	                  ].join(", ")}
	                  sizes="(max-width: 768px) 100vw, 1024px"
	                  width={1920}
	                  height={1279}
	                  alt="Michael Njo, DDS with dental professionals at a consulting workshop"
	                  className="w-full h-auto object-cover client-success-image parallax-slow"
	                  loading="lazy"
	                  decoding="async"
	                />
	                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
	              </div>
              <div className="scroll-fade-in space-y-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-blue-500 font-semibold">
                      Testimonials · {testimonialPages.length} stories
                    </p>
                    <h4 className="text-2xl font-semibold text-gray-900 mt-2">
                      Stories from doctors, teams, and advisors
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Real experiences from clients whose practices Michael has guided.
                    </p>
                  </div>
                  <a
                    href="/testimonials"
                    className="text-sm font-medium text-blue-600 underline underline-offset-4"
                  >
                    View all testimonials
                  </a>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {testimonialPages.slice(0, 6).map((testimonial, index) => (
                    <article
                      key={`${testimonial.author}-${testimonial.slug}-${index}`}
                      className="h-full rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm flex flex-col"
                    >
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-4 h-4 ${starIndex < testimonial.stars ? "fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                        {testimonial.excerpt}
                      </p>
                      <div className="mt-4 flex flex-col gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {testimonial.author}
                          </p>
                          <p className="text-xs text-gray-500">
                            Dental Strategies Client
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="w-fit" asChild>
                          <a href={`/testimonials/${testimonial.slug}`}>Read full story</a>
                        </Button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              
              {/* Testimonials Call to Action */}
	              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100 transition-all duration-300 scroll-fade-in">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500 opacity-0 animate-[fadeInStagger_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{animationDelay: `${1.5 + i * 0.1}s`}} />
                    ))}
                  </div>
                </div>
	                <h4 className="text-lg font-medium text-gray-900 mb-3 transition-colors duration-300">
                  Trusted by Healthcare Professionals for 25+ Years
                </h4>
	                <p className="text-gray-600 mb-6 max-w-2xl mx-auto font-light transition-colors duration-300">
                  Discover how Dr. Michael Njo has helped hundreds of dentists, physicians, and healthcare professionals achieve their practice goals.
                </p>
	                <Link
	                  href="/testimonials"
		                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
	                >
	                  <Users className="w-5 h-5 mr-2" />
	                  Read Client Testimonials
	                </Link>
              </div>
            </section>

            {/* Professional Background */}
            <section id="bio" className="max-w-3xl mx-auto mb-12 text-left scroll-fade-in" aria-labelledby="bio-heading">
	              <h2 id="bio-heading" className="text-2xl font-light text-gray-800 mb-6 text-center transition-colors duration-300">Professional Background</h2>

	              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-start">
	                <div className="space-y-4 text-gray-600 leading-relaxed transition-colors duration-300">
	                  <p>
	                    Michael Njo, DDS is a proud graduate of UOP, School of Dentistry. After herniating his disc, 
	                    Dr. Michael Njo founded Dental Strategies. Dental Strategies is a specialized consulting company which 
	                    coaches Dentist to achieving and understanding their goals.
	                  </p>

	                  <p>
	                    Just a few goals to mention range from, starting a practice whether a start-up or purchase, 
	                    forming partnerships, expansions, retirement strategies, selling practices, valuations, 
	                    malpractice, and conflict issues, introducing technology, team building, and implementing 
	                    operating systems to achieve the maximum efficiency and profitability for their offices.
	                  </p>

	                  <p>
	                    Michael Njo, DDS has been consulting for 25 years and has built his consulting company all by 
	                    direct referral. Dental Strategies customizes his program for the specific needs of the doctor 
	                    and practice. He will develop a program to implement and facilitate the goals you desire.{" "}
		                    <Link
		                      href="/testimonials"
		                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
		                    >
		                      <span className="underline">Read what clients are saying</span>
		                    </Link>
	                  </p>

	                  <p>
	                    Michael Njo, DDS is an Author of{" "}
	                    <a 
	                      href="https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718"
	                      target="_blank"
	                      rel="noopener noreferrer"
	                      className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
	                    >
	                      Dental Practice Transitions Handbook
	                    </a>, Director of the Dugoni 
	                    Business Club, founded an educational company for transitions -{" "}
	                    <a 
	                      href="https://practicetransitionsinstitute.com/"
	                      target="_blank"
	                      rel="noopener noreferrer"
	                      className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
	                    >
	                      Practice Transitions Institute
	                    </a>, 
	                    he is part of the admission's team for UOP, serves on the Board of Directors at the Dugoni School 
	                    of Dentistry, and the CDA Leadership Council.
	                  </p>
	                </div>

	                <figure className="rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">
	                  <img
	                    src={dugoniCollaborationImage.src}
	                    srcSet={dugoniCollaborationImage.srcSet}
	                    sizes={dugoniCollaborationImage.sizes}
	                    width={dugoniCollaborationImage.width}
	                    height={dugoniCollaborationImage.height}
	                    alt={dugoniCollaborationImage.alt}
	                    className="w-full h-auto object-cover"
	                    loading="lazy"
	                    decoding="async"
	                  />
	                  <figcaption className="px-4 py-3 text-xs text-gray-500">
	                    {dugoniCollaborationImage.caption}
	                  </figcaption>
	                </figure>
	              </div>
            </section>

            {/* Education & Resources */}
            <section id="resources" className="max-w-4xl mx-auto mb-12" aria-labelledby="resources-heading">
              <div className="text-center mb-8">
	                <h2 id="resources-heading" className="text-2xl font-light text-gray-800 transition-colors duration-300">Education &amp; Resources</h2>
                  <p className="mt-3 text-sm text-gray-600">
                    Prefer a single overview page?{" "}
                    <a href="/resources" className="text-blue-600 underline font-medium">
                      Visit Resources
                    </a>
                    .
                  </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Featured Publication */}
	                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 transition-all duration-300 card-hover-lift scroll-fade-in">
                  <div className="flex items-center mb-4">
	                    <BookOpen className="w-5 h-5 text-blue-600 mr-3 transition-colors duration-300" />
	                    <h4 className="text-lg font-medium text-gray-900 transition-colors duration-300">Published Book</h4>
                  </div>
	                  <h5 className="text-lg font-medium text-gray-900 mb-3 transition-colors duration-300">
                    Dental Practice Transitions Handbook
                  </h5>
	                  <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed transition-colors duration-300">
                    Dental Practice Transitions Handbook answers the core questions around associate roles, partnerships, and purchase paths while highlighting the mindsets of sellers and buyers so you can plan a smooth transition.
                  </p>
                  <a 
                    href="https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Amazon
                  </a>
                </div>

                {/* Educational Institute */}
	                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 transition-all duration-300 card-hover-lift scroll-fade-in">
                  <div className="flex items-center mb-4">
	                    <GraduationCap className="w-5 h-5 text-blue-600 mr-3 transition-colors duration-300" />
	                    <h4 className="text-lg font-medium text-gray-900 transition-colors duration-300">Educational Institute</h4>
                  </div>
	                  <h5 className="text-lg font-medium text-gray-900 mb-3 transition-colors duration-300">
                    Practice Transitions Institute
                  </h5>
	                  <p className="text-gray-600 font-light mb-4 text-sm leading-relaxed transition-colors duration-300">
                    Specialized education and training for dental professionals on practice transitions and growth strategies.
                  </p>
                  <a 
                    href="https://practicetransitionsinstitute.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Institute
                  </a>
                </div>
              </div>

              <div className="mt-10 scroll-fade-in" aria-labelledby="book-reviews-heading">
                <div className="text-center mb-6">
	                  <h3 id="book-reviews-heading" className="text-xl font-light text-gray-800">
                    Amazon reviews for Dental Practice Transitions Handbook
                  </h3>
	                  <p className="text-sm text-gray-500">
                    Highlights from verified readers in the United States.
                  </p>
                </div>
                <div className="grid gap-6">
                  {bookReviews.map((review, index) => (
                    <article
                      key={`${review.author}-${index}`}
	                      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
	                              className={`w-4 h-4 ${starIndex < review.rating ? "fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
	                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          {review.context}
                        </p>
                      </div>
	                      <h4 className="text-lg font-semibold text-gray-900 mt-4">
                        {review.title}
                      </h4>
	                      <p className="text-sm text-gray-600 leading-relaxed mt-3 whitespace-pre-line">
                        {review.body}
                      </p>
	                      <div className="mt-4 text-sm font-semibold text-gray-900">
                        {review.author}
                      </div>
	                      <p className="text-xs text-gray-500">{review.meta}</p>
                    </article>
                  ))}
                </div>
              </div>

              {bookEditorialReview.body && (
                <div className="mt-10 scroll-fade-in" aria-labelledby="book-editorial-heading">
	                  <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
	                    <p className="text-xs uppercase tracking-[0.3em] text-blue-500 mb-2">
                      {bookEditorialReview.heading}
                    </p>
	                    <h3 id="book-editorial-heading" className="text-lg font-semibold text-gray-900">
                      From the Amazon product page
                    </h3>
	                    <div className="mt-4 space-y-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {bookEditorialReview.body}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* FAQ */}
            <section id="faq" className="max-w-4xl mx-auto mb-12 scroll-fade-in" aria-labelledby="faq-heading">
	              <h2 id="faq-heading" className="text-2xl font-light text-gray-800 mb-6 text-center transition-colors duration-300">
                Frequently Asked Questions about Dr. Michael Njo
              </h2>
              <div className="space-y-4">
                {faqItems.map((faq) => (
	                  <div key={faq.question} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
	                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
	                    <p className="mt-2 text-sm text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Free Consultation CTA */}
            <div className="text-center mb-8 scroll-fade-in space-y-4">
	              <h3 className="text-xl font-light text-gray-800 transition-colors duration-300">
                Talk directly with Dr. Michael Njo
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={handleEmail}
                  className="dental-button-primary inline-flex items-center justify-center magnetic-button"
                >
                  <Mail className="w-5 h-5 mr-3 transition-transform group-hover:translate-x-1" />
                  Email for Free Consultation
                </button>
              </div>
	              <p className="text-sm text-gray-600">
	                Prefer a form? <Link href="/contact" className="text-blue-600 underline">Visit the contact page</Link> to share your goals.
              </p>
            </div>

            {/* Professional Touch */}
	            <div className="text-center pt-6 border-t border-gray-100 transition-colors duration-300">
	              <p className="text-sm text-gray-400 font-light transition-colors duration-300">
	                25 years of consulting excellence • Direct referral based
	              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </main>
    </>
  );
}
