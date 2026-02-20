import { ArrowRight, CalendarDays, Download, Play } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/structured-data";
import { getMichaelNealInterviewStructuredData } from "@/seo/structured-data";

const videoUrl = "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1771604636/interview_osy2ak.mp4";
const transcriptUrl = "/dr-michael-neal-interview-transcript.txt";

const corePrinciples = [
  {
    title: "Pro Quality of Life",
    description: "Success should enhance your life, not consume it.",
  },
  {
    title: "Pro Work-Life Balance",
    description: "A thriving practice should support your health and relationships.",
  },
  {
    title: "Pro Family",
    description: "Family and personal well-being are non-negotiable priorities.",
  },
];

const expertiseAreas = [
  {
    title: "Practice Transitions",
    bullets: [
      "Buy practices",
      "Sell practices",
      "Enter partnerships",
      "Relocate and start from scratch",
      "Scale into multi-practice ownership",
    ],
  },
  {
    title: "Management Consulting",
    bullets: [
      "Culture building",
      "Team alignment",
      "Operational clarity",
      "Leadership development",
      "Sustainable growth",
    ],
  },
  {
    title: "Legal Navigation",
    bullets: [
      "Malpractice challenges",
      "Labor law issues, especially in California",
      "Partnership dissolutions",
      "Divorce-related business implications",
    ],
  },
];

const audiencePoints = [
  "Dentists seeking integrity over shortcuts",
  "Owners navigating major career decisions",
  "Leaders focused on culture and team alignment",
  "People who want growth aligned with personal life",
];

export default function DrMichaelNealInterview() {
  return (
    <>
      <StructuredData data={getMichaelNealInterviewStructuredData()} id="structured-data-dr-michael-neal-interview" />
      <main className="min-h-screen bg-white px-4 py-12 transition-colors duration-300">
        <div className="mx-auto w-full max-w-4xl space-y-10">
          <header className="rounded-3xl border border-blue-100/80 bg-gradient-to-b from-white to-blue-50/50 p-7 md:p-10">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-600">Featured Conversation</p>
            <h1 className="mt-3 text-3xl leading-tight font-semibold text-gray-900 md:text-4xl">
              Helping Dentists Thrive Through Every Stage of Their Career
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
              In this featured conversation, Dr. Michael Neal shares how a career-ending injury led to a 22-year journey guiding dentists through
              transitions, management growth, and difficult legal moments.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild>
                <a href="#interview-video" className="inline-flex items-center justify-center gap-2">
                  <Play className="h-4 w-4" />
                  Watch the Interview
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a
                  href={transcriptUrl}
                  download="Dr-Michael-Neal-interview-transcript.txt"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Full Transcript
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Schedule a Private Consultation
                </Link>
              </Button>
            </div>
          </header>

          <section
            id="interview-video"
            className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
            aria-labelledby="interview-video-heading"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Section 2</p>
            <h2 id="interview-video-heading" className="text-2xl font-semibold text-gray-900">
              Full Interview
            </h2>
            <p className="text-sm text-gray-600">
              Below is the full conversation. If your browser does not support streaming, the transcript is available for download.
            </p>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black">
              <video controls className="h-auto w-full bg-black" preload="metadata" playsInline>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support embedded video. Download it from the file at the top of this page.
              </video>
            </div>
            <p className="text-xs text-gray-500" id="transcript">
              Download: <a href={transcriptUrl} download className="text-blue-600 underline">Complete interview transcript (.txt)</a>
            </p>
          </section>

          <section className="space-y-4" aria-labelledby="intro-heading">
            <h2 id="intro-heading" className="text-2xl font-semibold text-gray-900">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For more than two decades, Dr. Michael Neal has helped dentists across the country make strategic practice decisions:
              private practice transitions, team growth, legal challenges, and ownership structure.
            </p>
            <ul className="space-y-2 pl-5 text-gray-700">
              <li className="list-disc">How an unexpected injury reshaped his career path.</li>
              <li className="list-disc">
                Why Dental Strategies is built to differ from large one-size-fits-all consulting firms.
              </li>
              <li className="list-disc">The three principles guiding each client relationship.</li>
              <li className="list-disc">Why culture and alignment matter more than production alone.</li>
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8" aria-labelledby="origin-heading">
            <h2 id="origin-heading" className="text-2xl font-semibold text-gray-900">
              From Private Practice to Dental Strategies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Dr. Neal graduated from UOP Dental School and practiced dentistry until a C6–C7 disc injury required him to step away from clinical work. Instead of leaving the profession,
              he chose to continue serving dentists through consulting.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Dental Strategies now supports dentists through practice transitions, business management, and legal navigation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              What began as referral-based consulting has grown through long-term relationships and trust.
            </p>
          </section>

          <section className="space-y-4" aria-labelledby="principles-heading">
            <h2 id="principles-heading" className="text-2xl font-semibold text-gray-900">
              The Three Core Principles
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {corePrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-medium text-gray-900">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{principle.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4" aria-labelledby="expertise-heading">
            <h2 id="expertise-heading" className="text-2xl font-semibold text-gray-900">
              Three Areas of Expertise
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {expertiseAreas.map((area) => (
                <article key={area.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">{area.title}</h3>
                  <ul className="mt-3 space-y-2 pl-5 text-sm text-gray-600">
                    {area.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-900">A Different Kind of Consulting</h2>
            <p className="text-gray-700 leading-relaxed">
              Dental Strategies was intentionally built for direct work with clients. No rotating advisors or anonymous prepay contracts.
              Engagement is based on alignment, transparency, and long-term commitment.
            </p>
            <p className="text-gray-900 font-semibold">
              “Not everyone is the right fit. It’s a selection process.”
            </p>
          </section>

          <section className="space-y-4" aria-labelledby="audience-heading">
            <h2 id="audience-heading" className="text-2xl font-semibold text-gray-900">
              Who This Is For
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {audiencePoints.map((point) => (
                <p
                  key={point}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700"
                >
                  {point}
                </p>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="cta-heading">
            <h2 id="cta-heading" className="text-2xl font-semibold text-gray-900">
              Final Step
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
              If you are considering a transition, partnership issue, or legal complexity in your practice, request a private consultation.
              First conversations focus on fit and clarity.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2">
                  Schedule Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/testimonials">Read Client Stories</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
