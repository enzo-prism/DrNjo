import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { StructuredData } from "@/components/structured-data";
import { contactDetails, getMichaelNjoStructuredData, resources, services } from "@/seo/structured-data";
import { testimonialPages } from "@/data/testimonials";
import { dugoniCollaborationImage, njoLifeGalleryImages } from "@/data/media";

type GalleryImage = (typeof njoLifeGalleryImages)[number];

export default function MichaelNjoDDS() {
  const book = resources.find((resource) => resource.type === "Book");
  const institute = resources.find((resource) => resource.type === "EducationalOrganization");
  const featuredTestimonials = testimonialPages.slice(0, 6);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <StructuredData data={getMichaelNjoStructuredData()} id="structured-data-michael-njo-dds" />
      <main className="min-h-screen bg-white transition-colors duration-300 px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-500">About</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Michael Njo DDS
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Michael Njo, DDS is a dental practice transitions consultant and founder of Dental Strategies Consulting. He
              mentors dentists and healthcare owners through practice launches, growth planning, valuations, leadership
              development, and successful practice transitions.
            </p>
          </header>

          <section aria-labelledby="background-heading" className="grid gap-8 md:grid-cols-3 items-start">
            <div className="w-full space-y-6">
              <img
                src="/dr-njo-headshot.webp"
                alt="Michael Njo, DDS headshot"
                width={383}
                height={460}
                className="w-56 h-56 md:w-full md:h-auto rounded-3xl object-cover shadow-xl mx-auto md:mx-0"
              />
              <figure className="rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                <img
                  src={dugoniCollaborationImage.src}
                  srcSet={dugoniCollaborationImage.srcSet}
                  sizes={dugoniCollaborationImage.sizes}
                  width={dugoniCollaborationImage.width}
                  height={dugoniCollaborationImage.height}
                  alt={dugoniCollaborationImage.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="px-4 py-3 text-xs text-gray-500">
                  {dugoniCollaborationImage.caption}
                </figcaption>
              </figure>
            </div>
            <div className="md:col-span-2 space-y-4 text-gray-600 leading-relaxed">
              <h2 id="background-heading" className="text-2xl font-semibold text-gray-900">
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

          <section aria-labelledby="life-impact-heading" className="space-y-4">
            <header className="text-center space-y-2">
              <h2 id="life-impact-heading" className="text-2xl font-semibold text-gray-900">
                Life &amp; Impact
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Moments from Dr. Njo's leadership, mentorship, and community partnerships across his career.
              </p>
            </header>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {njoLifeGalleryImages.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className="group block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    aria-haspopup="dialog"
                    aria-label={`View photo: ${image.alt}`}
                  >
                    <img
                      src={image.src}
                      srcSet={image.srcSet}
                      sizes={image.sizes}
                      alt={image.alt}
                      className="h-56 w-full object-cover transition duration-300 group-hover:scale-105 group-focus-visible:scale-105 cursor-zoom-in"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                  {image.caption ? (
                    <figcaption className="px-4 py-3 text-xs text-gray-500">
                      {image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
            <Dialog
              open={Boolean(selectedImage)}
              onOpenChange={(open) => {
                if (!open) {
                  setSelectedImage(null);
                }
              }}
            >
              <DialogContent className="max-w-6xl w-[95vw] border-none bg-transparent p-0 shadow-none">
                {selectedImage ? (
                  <>
                    <DialogTitle className="sr-only">{selectedImage.alt}</DialogTitle>
                    <DialogDescription className="sr-only">
                      {selectedImage.caption ?? "Expanded view of the selected photo."}
                    </DialogDescription>
                    <figure className="rounded-2xl bg-black/90 p-3 sm:p-4">
                      <img
                        src={selectedImage.src}
                        srcSet={selectedImage.srcSet}
                        sizes="100vw"
                        alt={selectedImage.alt}
                        className="max-h-[80vh] w-full rounded-xl object-contain"
                        loading="eager"
                        decoding="async"
                      />
                      {selectedImage.caption ? (
                        <figcaption className="mt-3 text-center text-sm text-gray-200">
                          {selectedImage.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  </>
                ) : null}
              </DialogContent>
            </Dialog>
          </section>

          <section aria-labelledby="testimonials-heading" className="space-y-4">
            <header className="text-center space-y-2">
              <h2 id="testimonials-heading" className="text-2xl font-semibold text-gray-900">
                Testimonials
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                What dentists, teams, and healthcare leaders say about working with Michael Njo, DDS.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              {featuredTestimonials.map((testimonial) => (
                <a
                  key={testimonial.slug}
                  href={`/testimonials/${testimonial.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition"
                >
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {testimonial.excerpt}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                    {testimonial.author}
                  </p>
                  <p className="mt-3 text-sm text-blue-600 underline font-medium">
                    Read full story
                  </p>
                </a>
              ))}
            </div>

            <div className="text-center">
              <a href="/testimonials" className="inline-flex text-sm text-blue-600 underline font-medium">
                View all testimonials
              </a>
            </div>
          </section>

        <section aria-labelledby="services-heading" className="space-y-4">
          <h2 id="services-heading" className="text-2xl font-semibold text-gray-900 text-center">
            Services
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                <p className="text-xs text-gray-500 mt-2">{service.audience}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="organizations-heading" className="space-y-4">
          <h2 id="organizations-heading" className="text-2xl font-semibold text-gray-900 text-center">
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
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-medium text-gray-900">{org.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{org.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="media-heading" className="space-y-4">
          <h2 id="media-heading" className="text-2xl font-semibold text-gray-900 text-center">
            Media &amp; Resources
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {book && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-2">
                <h3 className="text-lg font-medium text-gray-900">{book.name}</h3>
                <p className="text-sm text-gray-600">{book.description}</p>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline font-medium"
                >
                  View the book
                </a>
              </div>
            )}
            {institute && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-2">
                <h3 className="text-lg font-medium text-gray-900">{institute.name}</h3>
                <p className="text-sm text-gray-600">{institute.description}</p>
                <a
                  href={institute.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline font-medium"
                >
                  Visit the institute
                </a>
              </div>
            )}
          </div>
          <div className="text-center">
            <a href="/resources" className="inline-flex text-sm text-blue-600 underline font-medium">
              Browse all resources
            </a>
          </div>
        </section>

        <section aria-labelledby="contact-heading" className="space-y-4 text-center">
          <h2 id="contact-heading" className="text-2xl font-semibold text-gray-900">
            Contact
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            For consulting inquiries, speaking requests, or practice transition support, email{" "}
            <a
              href={`mailto:${contactDetails.email}`}
              className="text-blue-600 underline font-medium"
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
