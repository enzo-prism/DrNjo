import { Link } from "wouter";
import { ArrowRight, BadgeDollarSign, CalendarCheck2, MessageSquareQuote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DentalflixPage() {
  const redemptionPhrase = "I heard about Michael from the DentalFlix event.";
  const claimSteps = [
    "Book a call or send a message through the contact page.",
    `Mention this exact line: "${redemptionPhrase}"`,
    "Your $500 DentalFlix discount is applied to any service with Dr. Michael Njo.",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white px-4 py-14 md:py-20">
      <div className="mx-auto w-full max-w-5xl space-y-7">
        <header className="rounded-[2rem] border border-slate-200/80 bg-white/85 px-6 py-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur md:px-10 md:py-12">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            DentalFlix Exclusive
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
            $500 Off With Dr. Michael Njo
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-xl">
            DentalFlix viewers can apply a <span className="font-semibold text-slate-900">$500 event discount</span> to
            any service.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 font-semibold text-white">
              <BadgeDollarSign className="h-4 w-4" />
              $500 OFF ANY SERVICE
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600">
              <CalendarCheck2 className="h-4 w-4 text-blue-600" />
              Valid for DentalFlix referrals
            </span>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-blue-100/40 p-6 shadow-lg shadow-blue-100/60 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">Claim in 3 steps</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 md:text-3xl">How to redeem your DentalFlix offer</h2>
            <ol className="mt-6 space-y-4">
              {claimSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700 md:text-base">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <MessageSquareQuote className="h-4 w-4 text-blue-600" />
              What to Say
            </p>
            <blockquote className="mt-4 rounded-2xl bg-slate-900 px-5 py-6 text-lg font-semibold leading-relaxed text-white">
              "{redemptionPhrase}"
            </blockquote>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Mention that exact line when you book or contact Dr. Njo so your event discount can be applied immediately.
            </p>
          </aside>
        </div>

        <section className="rounded-[2rem] border border-slate-900 bg-slate-900 px-6 py-7 text-center text-white shadow-xl shadow-slate-400/30 md:px-8 md:py-8">
          <h3 className="text-2xl font-semibold md:text-3xl">Ready to claim your $500 discount?</h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Reach out now and mention DentalFlix to lock in your event pricing.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="h-11 bg-blue-500 px-6 text-white hover:bg-blue-400">
              <Link href="/contact" className="inline-flex items-center gap-2">
                Claim $500 off - Contact Dr. Njo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" asChild className="h-11 border border-white/20 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white">
              <Link href="/michael-njo-dds">Learn more about Dr. Njo</Link>
            </Button>
            <Button variant="outline" asChild className="h-11 border-white/40 bg-transparent px-6 text-white hover:bg-white hover:text-slate-900">
              <Link href="/resources">Explore resources</Link>
            </Button>
          </div>
        </section>

        <p className="pb-2 text-center text-sm text-slate-500">
          Prefer to browse first? Head back to the{" "}
          <Link href="/" className="font-medium text-blue-700 underline underline-offset-2">
            home page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
