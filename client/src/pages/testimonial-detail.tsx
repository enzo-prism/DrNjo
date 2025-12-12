import type { RouteComponentProps } from "wouter";
import { Link } from "wouter";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonialPages } from "@/data/testimonials";

type TestimonialDetailProps = RouteComponentProps<{ slug?: string }>;

export default function TestimonialDetailPage({ params }: TestimonialDetailProps) {
  const slug = params.slug || "";
  const testimonial = testimonialPages.find((item) => item.slug === slug);

  if (!testimonial) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">Testimonial not found</h1>
          <p className="text-gray-600 dark:text-gray-300">
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
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex flex-wrap gap-2 justify-center">
            <li>
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/testimonials" className="hover:text-blue-600 dark:hover:text-blue-400">
                Testimonials
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 dark:text-gray-50 font-medium">{testimonial.author}</li>
          </ol>
        </nav>

        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-50">
            Testimonial from {testimonial.author}
          </h1>
          <div className="flex items-center justify-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star
                key={starIndex}
                className={`w-5 h-5 ${starIndex < testimonial.stars ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
              />
            ))}
          </div>
        </header>

        <article className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 p-8 shadow-sm">
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
            {testimonial.quote}
          </p>
          <p className="mt-6 text-base font-semibold text-gray-900 dark:text-gray-50">
            {testimonial.author}
          </p>
        </article>

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

