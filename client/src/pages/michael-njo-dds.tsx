import drNjoHeadshot from "@assets/Dr. Njo_1753322899280.webp";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/structured-data";
import { contactDetails, getMichaelNjoStructuredData, resources, services } from "@/seo/structured-data";

export default function MichaelNjoDDS() {
  const book = resources.find((resource) => resource.type === "Book");
  const institute = resources.find((resource) => resource.type === "EducationalOrganization");

  return (
    <>
      <StructuredData data={getMichaelNjoStructuredData()} id="structured-data-michael-njo-dds" />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-500 dark:text-blue-300">About</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-50">
              Michael Njo DDS
            </h1>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Michael Njo, DDS is a dental practice transitions consultant and founder of Dental Strategies Consulting. He
              mentors dentists and healthcare owners through practice launches, growth planning, valuations, leadership
              development, and successful practice transitions.
            </p>
          </header>

          <section aria-labelledby="background-heading" className="grid gap-8 md:grid-cols-3 items-start">
            <img
              src={drNjoHeadshot}
              alt="Michael Njo, DDS headshot"
              className="w-56 h-56 md:w-full md:h-auto rounded-3xl object-cover shadow-xl mx-auto md:mx-0"
              loading="lazy"
            />
            <div className="md:col-span-2 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <h2 id="background-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                Background
              </h2>
              <p>
                Michael Njo, DDS is a graduate of the University of the Pacific School of Dentistry and spent years in
                private practice before moving into full‑time consulting. His work centers on helping doctors align
                clinical values with the business realities of ownership.
              </p>
              <p>
                For more than 25 years, Dr. Njo has partnered with practice owners on start‑ups, acquisitions,
                partnerships, expansions, retirement planning, and seller/buyer transitions. He focuses on clear strategy,
                strong teams, and sustainable patient‑centered growth.
              </p>
              <p>
                Through his organizations, he works hands‑on with doctors and teams to build systems that reduce
                operational friction, improve profitability, and protect the patient experience during periods of change.
              </p>
            </div>
          </section>

        <section aria-labelledby="services-heading" className="space-y-4">
          <h2 id="services-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-50 text-center">
            Services
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">{service.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{service.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{service.audience}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="organizations-heading" className="space-y-4">
          <h2 id="organizations-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-50 text-center">
            Organizations
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Dental Strategies Consulting",
                description:
                  "Primary consulting practice focused on practice launches, growth strategy, valuations, and transitions.",
              },
              {
                name: "Practice Transitions Institute",
                description:
                  "Education and training platform helping dentists navigate ownership, partnerships, and retirement transitions.",
              },
              {
                name: "HealthcareStrategiesMD",
                description:
                  "Advisory work extending transition and growth frameworks to broader healthcare practices.",
              },
              {
                name: "Business Strategies",
                description:
                  "Business coaching for owners who want scalable systems, resilient teams, and long‑term profitability.",
              },
            ].map((org) => (
              <div
                key={org.name}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">{org.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{org.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="media-heading" className="space-y-4">
          <h2 id="media-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-50 text-center">
            Media &amp; Resources
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {book && (
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">{book.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{book.description}</p>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 underline font-medium"
                >
                  View the book
                </a>
              </div>
            )}
            {institute && (
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">{institute.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{institute.description}</p>
                <a
                  href={institute.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 underline font-medium"
                >
                  Visit the institute
                </a>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="contact-heading" className="space-y-4 text-center">
          <h2 id="contact-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Contact
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            For consulting inquiries, speaking requests, or practice transition support, email{" "}
            <a
              href={`mailto:${contactDetails.email}`}
              className="text-blue-600 dark:text-blue-400 underline font-medium"
            >
              {contactDetails.email}
            </a>{" "}
            or use the contact form.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/contact">Contact Michael Njo, DDS</Link>
            </Button>
          </div>
        </section>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="ghost" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
