import { resources, bookReviews } from "@/seo/structured-data";
import { ExternalLink, Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ResourcesPage() {
  const book = resources.find((resource) => resource.type === "Book");
  const institute = resources.find((resource) => resource.type === "EducationalOrganization");

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-500 dark:text-blue-300">Resources</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-50">
            Education &amp; Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Explore Dr. Michael Njo’s book and educational programs designed to help healthcare owners navigate growth
            and practice transitions.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {book && (
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{book.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{book.description}</p>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 underline font-medium"
              >
                View on Amazon
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          )}

          {institute && (
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{institute.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{institute.description}</p>
              <a
                href={institute.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 underline font-medium"
              >
                Visit Institute
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          )}
        </section>

        {bookReviews.length > 0 && (
          <section aria-labelledby="reviews-heading" className="space-y-4">
            <h2 id="reviews-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-50 text-center">
              Reader reviews
            </h2>
            <div className="grid gap-4">
              {bookReviews.slice(0, 3).map((review, index) => (
                <article
                  key={`${review.author}-${index}`}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/70 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${starIndex < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
                      />
                    ))}
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-gray-50">{review.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {review.body}
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{review.author}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/contact">Contact Michael Njo, DDS</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

