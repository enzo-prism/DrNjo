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
            Special DentalFlix event offer: get <span className="font-semibold text-gray-900">$500 off any service</span>
            with Dr. Michael Njo.
          </p>
        </header>

        <section className="w-full rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold text-gray-900">How to claim your $500 event offer</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
            When you book or reach out, please mention: <span className="font-semibold">"I heard about Michael from the DentalFlix event."</span>
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild>
              <Link href="/contact">Claim $500 off - Contact Dr. Njo</Link>
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
