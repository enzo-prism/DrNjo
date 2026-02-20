import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import MichaelNjoDDS from "@/pages/michael-njo-dds";
import MichaelNjoInterview from "@/pages/dr-michael-njo-interview";

const Contact = lazy(() => import("@/pages/contact"));
const ContactSuccess = lazy(() => import("@/pages/contact-success"));
const TestimonialsPage = lazy(() => import("@/pages/testimonials"));
const TestimonialDetailPage = lazy(() => import("@/pages/testimonial-detail"));
const ResourcesPage = lazy(() => import("@/pages/resources"));
const DentalflixPage = lazy(() => import("@/pages/dentalflix"));
const NotFound = lazy(() => import("@/pages/not-found"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/michael-njo-dds" component={MichaelNjoDDS} />
            <Route path="/dr-michael-njo-interview" component={MichaelNjoInterview} />
            <Route path="/testimonials" component={TestimonialsPage} />
            <Route path="/testimonials/:slug" component={TestimonialDetailPage} />
            <Route path="/resources" component={ResourcesPage} />
            <Route path="/dentalflix" component={DentalflixPage} />
            <Route path="/contact" component={Contact} />
            <Route path="/contact/success" component={ContactSuccess} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
