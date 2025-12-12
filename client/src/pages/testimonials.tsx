import { testimonialPages } from "@/data/testimonials";
import { Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-white transition-colors duration-300 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-500">Testimonials</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Testimonials for Michael Njo, DDS
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Stories from dentists and healthcare professionals guided through Dental Strategies and Practice Transitions
            Institute.
          </p>
          <p className="text-sm text-gray-600">
            Learn more about{" "}
            <a href="/michael-njo-dds" className="text-blue-600 underline font-medium">
              Michael Njo DDS
            </a>
            .
          </p>
        </header>

        <div className="grid gap-6">
          {testimonialPages.map((testimonial, index) => (
            <article
              key={`${testimonial.author}-${testimonial.slug}-${index}`}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`w-4 h-4 ${starIndex < testimonial.stars ? "fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                {testimonial.excerpt}
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-900">
                {testimonial.author}
              </p>
              <a
                href={`/testimonials/${testimonial.slug}`}
                className="inline-flex mt-3 text-sm text-blue-600 underline font-medium"
              >
                Read full story
              </a>
            </article>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild>
            <Link href="/contact">Work with Michael Njo, DDS</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
