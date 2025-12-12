import type { RouteComponentProps } from "wouter";
import { Link } from "wouter";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonialPages, type TestimonialPage } from "@/data/testimonials";

type TestimonialDetailProps = RouteComponentProps<{ slug?: string }>;

export default function TestimonialDetailPage({ params }: TestimonialDetailProps) {
  const slug = params.slug || "";
  const testimonialIndex = testimonialPages.findIndex((item) => item.slug === slug);
  const testimonial = testimonialIndex >= 0 ? testimonialPages[testimonialIndex] : null;
  const previousTestimonial = testimonialIndex > 0 ? testimonialPages[testimonialIndex - 1] : null;
  const nextTestimonial =
    testimonialIndex >= 0 && testimonialIndex < testimonialPages.length - 1 ? testimonialPages[testimonialIndex + 1] : null;
  const relatedTestimonials = (() => {
    const related: TestimonialPage[] = [];
    const maxRelated = 6;

    if (testimonialIndex < 0) return related;

    for (let offset = 1; offset < testimonialPages.length && related.length < maxRelated; offset++) {
      const candidate = testimonialPages[(testimonialIndex + offset) % testimonialPages.length];
      if (candidate.slug === slug) continue;
      if (candidate.slug === previousTestimonial?.slug) continue;
      if (candidate.slug === nextTestimonial?.slug) continue;
      related.push(candidate);
    }

    return related;
  })();

  if (!testimonial) {
    return (
      <main className="min-h-screen bg-white transition-colors duration-300 px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Testimonial not found</h2>
          <p className="text-gray-600">
            The testimonial you&apos;re looking for isn&apos;t available. Browse all testimonials below.
          </p>
          <Button asChild>
            <Link href="/testimonials">View all testimonials</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white transition-colors duration-300 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex flex-wrap gap-2 justify-center">
            <li>
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/testimonials" className="hover:text-blue-600">
                Testimonials
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium">{testimonial.author}</li>
          </ol>
        </nav>

        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Testimonial from {testimonial.author}
          </h1>
          <div className="flex items-center justify-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star
                key={starIndex}
                className={`w-5 h-5 ${starIndex < testimonial.stars ? "fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
        </header>

        <article className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {testimonial.quote}
          </p>
          <p className="mt-6 text-base font-semibold text-gray-900">
            {testimonial.author}
          </p>
        </article>

        <section aria-labelledby="more-testimonials-heading" className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="text-center space-y-2">
            <h2 id="more-testimonials-heading" className="text-2xl font-semibold text-gray-900">
              More testimonials
            </h2>
            <p className="text-sm text-gray-600">
              Explore additional stories from doctors, teams, and advisors.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {previousTestimonial && (
              <a
                href={`/testimonials/${previousTestimonial.slug}`}
                rel="prev"
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Previous</p>
                <p className="mt-2 text-base font-semibold text-gray-900 group-hover:text-blue-700">
                  Testimonial from {previousTestimonial.author}
                </p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3 whitespace-pre-line">
                  {previousTestimonial.excerpt}
                </p>
              </a>
            )}
            {nextTestimonial && (
              <a
                href={`/testimonials/${nextTestimonial.slug}`}
                rel="next"
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Next</p>
                <p className="mt-2 text-base font-semibold text-gray-900 group-hover:text-blue-700">
                  Testimonial from {nextTestimonial.author}
                </p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3 whitespace-pre-line">
                  {nextTestimonial.excerpt}
                </p>
              </a>
            )}
          </div>

          {relatedTestimonials.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                More stories
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {relatedTestimonials.map((item) => (
                  <a
                    key={item.slug}
                    href={`/testimonials/${item.slug}`}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition"
                  >
                    <p className="text-base font-semibold text-gray-900 group-hover:text-blue-700">
                      Testimonial from {item.author}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3 whitespace-pre-line">
                      {item.excerpt}
                    </p>
                    <p className="mt-3 text-sm text-blue-600 underline font-medium">
                      Read full story
                    </p>
                  </a>
                ))}
              </div>

              <div className="mt-6 text-center">
                <a
                  href="/testimonials"
                  className="inline-flex text-sm text-blue-600 underline font-medium"
                >
                  View all testimonials
                </a>
              </div>
            </div>
          )}
        </section>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild>
            <Link href="/contact">Work with Michael Njo, DDS</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/testimonials">Back to testimonials</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
