import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function DentalflixPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-blue-600">DentalFlix</p>

        <header className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900 md:text-5xl">
            Welcome, DentalFlix Community
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            Thanks for stopping by. We’re glad you found us through DentalFlix and we’d love to help with your next
            step—whether that’s learning more about Dr. Michael Njo, exploring resources, or reaching out directly.
          </p>
        </header>

        <section className="w-full rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold text-gray-900">Start here</h2>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild>
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/michael-njo-dds">Learn more about Dr. Njo</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resources">Explore resources</Link>
            </Button>
          </div>
        </section>

        <p className="text-sm text-gray-500">
          Prefer to browse first? Head back to the <Link href="/" className="text-blue-600 underline">home page</Link>.
        </p>
      </div>
    </main>
  );
}
