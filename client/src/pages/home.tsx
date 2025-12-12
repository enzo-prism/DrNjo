import { Mail, BookOpen, ExternalLink, GraduationCap, Star, Users, Quote } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import drNjoHeadshot from "@assets/Dr. Njo_1753322899280.webp";
import drNjoClients from "@assets/dr njo clients_1753323486111.webp";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { testimonialPages } from "@/data/testimonials";
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
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const founderCompanies = [
    {
      name: "Dental Strategies",
      accent: "from-blue-50 to-blue-100/70 dark:from-blue-900/40 dark:to-blue-900/10 border-blue-200 dark:border-blue-700",
    },
    {
      name: "HealthcareStrategiesMD",
      accent: "from-emerald-50 to-emerald-100/70 dark:from-emerald-900/40 dark:to-emerald-900/10 border-emerald-200 dark:border-emerald-700",
    },
    {
      name: "Business Strategies",
      accent: "from-amber-50 to-amber-100/70 dark:from-amber-900/40 dark:to-amber-900/10 border-amber-200 dark:border-amber-700",
    },
    {
      name: "Practice Transitions Institute",
      accent: "from-indigo-50 to-indigo-100/70 dark:from-indigo-900/40 dark:to-indigo-900/10 border-indigo-200 dark:border-indigo-700",
    },
  ];

  return (
    <>
      <StructuredData data={getHomeStructuredData()} id="structured-data-home" />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex items-center justify-center px-4 py-8 md:py-16">
        <div className="max-w-4xl w-full">
          <div className="dental-card overflow-hidden opacity-0 translate-y-5 fade-in-up">
          {/* Professional Photo Section */}
          <div className="relative h-80 md:h-96 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center transition-colors duration-300">
            <div className="relative">
              <img 
                src={drNjoHeadshot}
                alt="Michael Njo, DDS - Professional headshot"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-center shadow-2xl ring-4 ring-white dark:ring-gray-800 professional-headshot transition-all duration-300"
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
                className="text-4xl md:text-5xl font-light text-gray-800 dark:text-gray-100 mb-4 tracking-tight transition-colors duration-300 opacity-0 animate-[fadeInStagger_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards]"
              >
                Michael Njo, DDS
              </h1>
	              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
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
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-sm font-medium tracking-wide uppercase transition-colors duration-300"
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
	                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
	                        {name}
	                      </h3>
	                    </div>
	                  ))}
                </div>
              </div>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed transition-colors duration-300">
                  Michael Njo, DDS leads a specialized consulting collective that coaches dentists, physicians, podiatrists, osteopaths, and business owners to launch, scale, or transition their practices with confidence.
                </p>
                <div className="mt-6">
	                <Link
	                  href="/testimonials"
	                  className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
	                >
	                  <Star className="w-4 h-4 mr-1 fill-current animate-[starSparkle_2s_ease-in-out_infinite]" />
	                  <span className="hover-underline">Trusted by hundreds of healthcare professionals</span>
	                </Link>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg shadow-blue-600/30"
                >
                  Contact Dr. Njo
                </Link>
              </div>
              <div className="mt-10 scroll-fade-in">
                <div className="rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg">
                  <img
                    src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762786458/dugoni-business-club-donation-ceremony_plth4r.webp"
                    alt="Michael Njo, DDS at the Dugoni Business Club donation ceremony"
                    className="w-full h-full object-cover"
                    loading="lazy"
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
                className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-6 text-center transition-colors duration-300"
              >
                Testimonials for Dr. Michael Njo
              </h2>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                Real-world stories from the doctors, teams, and advisors mentored by Dr. Michael Njo across Dental Strategies, HealthcareStrategiesMD, Business Strategies, and Practice Transitions Institute.
              </p>
              <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 scroll-fade-in">
                <img 
                  src={drNjoClients}
                  alt="Michael Njo, DDS with dental professionals at a consulting workshop"
                  className="w-full h-auto object-cover client-success-image parallax-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
              <div className="scroll-fade-in">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  className="pb-12"
                >
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                    <div>
	                      <p className="text-sm uppercase tracking-[0.35em] text-blue-500 dark:text-blue-300 font-semibold">
	                        Testimonials · {testimonialPages.length} stories
	                      </p>
                      <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mt-2">
                        Stories from doctors, teams, and advisors
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Real experiences from clients whose practices Michael has guided.
                      </p>
                    </div>
                    <div className="hidden md:flex gap-3">
                      <CarouselPrevious className="relative static h-10 w-10 rounded-full border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30" />
                      <CarouselNext className="relative static h-10 w-10 rounded-full border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30" />
                    </div>
                  </div>
                  <CarouselContent className="-ml-3 md:-ml-4">
                    {testimonialPages.map((testimonial, index) => (
                      <CarouselItem
                        key={`${testimonial.author}-${index}`}
                        className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="h-full rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-6 shadow-sm flex flex-col relative overflow-hidden">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-1 text-amber-500">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  className={`w-4 h-4 ${starIndex < testimonial.stars ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
                                />
                              ))}
                            </div>
                            <Quote className="w-6 h-6 text-blue-600/60 dark:text-blue-300/60" />
                          </div>
                          <div className="relative flex-1 pb-10">
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-h-32 overflow-hidden">
                              {testimonial.quote}
                            </p>
                            <div className="pointer-events-none absolute inset-x-0 bottom-10 h-16 bg-gradient-to-t from-white dark:from-gray-900 via-white/70 dark:via-gray-900/70 to-transparent"></div>
                          </div>
                          <div className="mt-4 flex flex-col gap-2">
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                                {testimonial.author}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Dental Strategies Client
                              </p>
                            </div>
		                            <Button variant="outline" size="sm" className="w-fit" asChild>
		                              <a href={`/testimonials/${testimonial.slug}`}>Read full story</a>
		                            </Button>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-3 md:hidden">
                    <CarouselPrevious className="relative static h-10 w-10 rounded-full border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30" />
                    <CarouselNext className="relative static h-10 w-10 rounded-full border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30" />
                  </div>
                </Carousel>
              </div>
              
              {/* Testimonials Call to Action */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 text-center border border-blue-100 dark:border-blue-800 transition-all duration-300 scroll-fade-in">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500 opacity-0 animate-[fadeInStagger_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{animationDelay: `${1.5 + i * 0.1}s`}} />
                    ))}
                  </div>
                </div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">
                  Trusted by Healthcare Professionals for 25+ Years
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto font-light transition-colors duration-300">
                  Discover how Dr. Michael Njo has helped hundreds of dentists, physicians, and healthcare professionals achieve their practice goals.
                </p>
	                <Link
	                  href="/testimonials"
	                  className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 shadow-sm hover:shadow-md"
	                >
	                  <Users className="w-5 h-5 mr-2" />
	                  Read Client Testimonials
	                </Link>
              </div>
            </section>

            {/* Professional Background */}
            <section id="bio" className="max-w-3xl mx-auto mb-12 text-left scroll-fade-in" aria-labelledby="bio-heading">
              <h2 id="bio-heading" className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-6 text-center transition-colors duration-300">Professional Background</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
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
	                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
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
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium transition-colors"
                  >
                    Dental Practice Transitions Handbook
                  </a>, Director of the Dugoni 
                  Business Club, founded an educational company for transitions -{" "}
                  <a 
                    href="https://practicetransitionsinstitute.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline font-medium transition-colors"
                  >
                    Practice Transitions Institute
                  </a>, 
                  he is part of the admission's team for UOP, serves on the Board of Directors at the Dugoni School 
                  of Dentistry, and the CDA Leadership Council.
                </p>
              </div>
            </section>

            {/* Education & Resources */}
            <section id="resources" className="max-w-4xl mx-auto mb-12" aria-labelledby="resources-heading">
              <div className="text-center mb-8">
                <h2 id="resources-heading" className="text-2xl font-light text-gray-800 dark:text-gray-100 transition-colors duration-300">Education &amp; Resources</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Featured Publication */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 transition-all duration-300 card-hover-lift scroll-fade-in">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">Published Book</h4>
                  </div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">
                    Dental Practice Transitions Handbook
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 font-light mb-4 text-sm leading-relaxed transition-colors duration-300">
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
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700 transition-all duration-300 card-hover-lift scroll-fade-in">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">Educational Institute</h4>
                  </div>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">
                    Practice Transitions Institute
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 font-light mb-4 text-sm leading-relaxed transition-colors duration-300">
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
                  <h3 id="book-reviews-heading" className="text-xl font-light text-gray-800 dark:text-gray-100">
                    Amazon reviews for Dental Practice Transitions Handbook
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Highlights from verified readers in the United States.
                  </p>
                </div>
                <div className="grid gap-6">
                  {bookReviews.map((review, index) => (
                    <article
                      key={`${review.author}-${index}`}
                      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 p-6 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              className={`w-4 h-4 ${starIndex < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {review.context}
                        </p>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mt-4">
                        {review.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-3 whitespace-pre-line">
                        {review.body}
                      </p>
                      <div className="mt-4 text-sm font-semibold text-gray-900 dark:text-gray-50">
                        {review.author}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{review.meta}</p>
                    </article>
                  ))}
                </div>
              </div>

              {bookEditorialReview.body && (
                <div className="mt-10 scroll-fade-in" aria-labelledby="book-editorial-heading">
                  <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-blue-500 dark:text-blue-300 mb-2">
                      {bookEditorialReview.heading}
                    </p>
                    <h3 id="book-editorial-heading" className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      From the Amazon product page
                    </h3>
                    <div className="mt-4 space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {bookEditorialReview.body}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* FAQ */}
            <section id="faq" className="max-w-4xl mx-auto mb-12 scroll-fade-in" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-light text-gray-800 dark:text-gray-100 mb-6 text-center transition-colors duration-300">
                Frequently Asked Questions about Dr. Michael Njo
              </h2>
              <div className="space-y-4">
                {faqItems.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Free Consultation CTA */}
            <div className="text-center mb-8 scroll-fade-in space-y-4">
              <h3 className="text-xl font-light text-gray-800 dark:text-gray-100 transition-colors duration-300">
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
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prefer a form? <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline">Visit the contact page</Link> to share your goals.
              </p>
            </div>

            {/* Professional Touch */}
            <div className="text-center pt-6 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <p className="text-sm text-gray-400 dark:text-gray-500 font-light transition-colors duration-300">
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
