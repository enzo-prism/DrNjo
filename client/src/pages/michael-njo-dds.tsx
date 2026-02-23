import { useState } from "react";
import { Link } from "wouter";
import { CalendarDays, GraduationCap, MessageSquareQuote, Briefcase, Globe, PlayCircle } from "lucide-react";
import { TestimonialListCard } from "@/components/testimonials/testimonial-card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StructuredData } from "@/components/structured-data";
import { contactDetails, getMichaelNjoStructuredData, resources, services } from "@/seo/structured-data";
import { testimonialPages } from "@/data/testimonials";
import { dugoniCollaborationImage, njoLifeGalleryImages } from "@/data/media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type GalleryImage = (typeof njoLifeGalleryImages)[number];

export default function MichaelNjoDDS() {
  const defaultTab =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("tab") === "news"
      ? "news"
      : "overview";

  const featuredTestimonials = testimonialPages.slice(0, 6);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const newsItems = [
    {
      posted: "Jan 24, 2026",
      eventDate: "Friday, February 27, 2026",
      title: "Building a dental practice that is always sale ready",
      host: "Philips Group",
      sponsor: "Provide",
      image: {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1769271338/event-poster-image_lmuwfb.webp",
        alt: "Event poster for Building a dental practice that is always sale ready",
      },
      description:
        "Dr. Michael Njo, DDS will discuss preparing ownership and operations for potential transition opportunities and long-term value creation.",
    },
    {
      posted: "Nov 09, 2025",
      eventDate: "November 09, 2025",
      title: "Practice Culture Leadership Session",
      host: "Practice Transitions Institute",
      sponsor: "HealthcareStrategiesMD",
      image: {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767707725/UOP-board-dinner_vvxbkq.webp",
        alt: "Culture Leadership Session",
      },
      description:
        "A practical framework session focused on leadership, staffing, and organizational resilience during growth periods.",
    },
  ];

  const organizations = [
    {
      title: "Dental Strategies",
      body: "Primary consulting practice focused on practice launches, growth, and transitions.",
    },
    {
      title: "Practice Transitions Institute",
      body: "Education and transition strategy for dentists navigating ownership and partner dynamics.",
    },
    {
      title: "HealthcareStrategiesMD",
      body: "Broader operational and growth strategy for healthcare practice owners.",
    },
    {
      title: "Business Strategies",
      body: "Leadership, systems, and sustainable workflow support for growing teams.",
    },
  ];

  return (
    <>
      <StructuredData data={getMichaelNjoStructuredData()} id="structured-data-michael-njo-dds" />
      <div className="space-y-8">
        <section className="text-center space-y-4">
          <p className="sr-only">Background</p>
          <p className="text-sm font-medium text-muted-foreground">Consulting Profile</p>
          <h1 className="text-4xl font-semibold">Dr. Michael Njo</h1>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            Founder of Dental Strategies, HealthcareStrategiesMD, Business Strategies, and Practice Transitions Institute, mentoring
            healthcare owners through ownership, growth, and transitions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={`mailto:${contactDetails.email}`}>Send an email</a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Request Consultation</Link>
            </Button>
          </div>
        </section>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

        <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card>
                <CardHeader>
                  <CardTitle>About Dr. Michael Njo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img
                    src={dugoniCollaborationImage.src}
                    srcSet={dugoniCollaborationImage.srcSet}
                    sizes={dugoniCollaborationImage.sizes}
                    alt={dugoniCollaborationImage.alt}
                    width={dugoniCollaborationImage.width}
                    height={dugoniCollaborationImage.height}
                    className="mx-auto h-64 w-64 rounded-2xl object-cover object-center"
                    decoding="async"
                  />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A practitioner-turned-consultant with deep private practice experience, Dr. Njo helps healthcare owners design
                    resilient systems for team execution, growth strategy, and transitions.
                  </p>
                  <Button variant="outline" asChild>
                    <a href={dugoniCollaborationImage.src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      University profile and collaborations
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <p className="sr-only">Services</p>
                  <CardTitle>Core services</CardTitle>
                  <CardDescription>Practice launches, management, and transition work</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {services.map((service) => (
                    <div key={service.name} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{service.name}</p>
                        <Badge variant="secondary">Service</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Organizations</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {organizations.map((org) => (
                  <div key={org.title} className="rounded-lg border border-border p-4">
                    <p className="font-medium">{org.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{org.body}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Life & Leadership in Media</CardTitle>
                <CardDescription>A visual timeline of speaking, mentoring, and leadership moments.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pt-0">
                <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
                  {njoLifeGalleryImages.slice(0, 9).map((image) => (
                    <button
                      key={image.src}
                      type="button"
                      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card text-left"
                      aria-label={image.alt}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.src}
                        srcSet={image.srcSet}
                        sizes={image.sizes}
                        alt={image.alt}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <span
                        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/35"
                        aria-hidden="true"
                      >
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm">Open</span>
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Dialog
              open={Boolean(selectedImage)}
              onOpenChange={(open) => {
                if (!open) {
                  setSelectedImage(null);
                }
              }}
            >
              <DialogContent className="max-w-5xl border-none bg-black/90 p-0 text-white">
                {selectedImage ? (
                  <>
                    <DialogTitle className="sr-only">{selectedImage.alt}</DialogTitle>
                    <DialogDescription className="sr-only">{selectedImage.alt}</DialogDescription>
                    <img
                      src={selectedImage.src}
                      srcSet={selectedImage.srcSet}
                      sizes="100vw"
                      alt={selectedImage.alt}
                      className="h-auto w-full rounded-t-lg object-contain"
                      loading="eager"
                    />
                  </>
                ) : null}
              </DialogContent>
            </Dialog>

            <Card>
              <CardHeader>
                <CardTitle>Testimonials</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {featuredTestimonials.map((testimonial) => (
                  <TestimonialListCard key={testimonial.slug} testimonial={testimonial} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            {newsItems.map((news, index) => (
              <Card key={`${news.title}-${index}`}>
                <CardHeader>
                  <CardTitle>{news.title}</CardTitle>
                  <CardDescription>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {news.eventDate} · {news.host}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <img
                    src={news.image.src}
                    alt={news.image.alt}
                    width={960}
                    height={540}
                    className="w-full rounded-md object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="text-sm text-muted-foreground">{news.description}</p>
                  <p className="text-sm text-muted-foreground">Sponsor: {news.sponsor}</p>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Media & Speaking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Media & Speaking</p>
                  <p className="mt-1">Dr. Njo is frequently asked to provide transition guidance for dental professionals.</p>
                  <Separator className="my-3" />
                  <Button asChild>
                    <Link href="/contact" className="inline-flex items-center gap-2">
                      <MessageSquareQuote className="h-4 w-4" />
                      Request booking details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
