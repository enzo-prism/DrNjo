import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/structured-data";
import { getContactSuccessStructuredData } from "@/seo/structured-data";

export default function ContactSuccess() {
  return (
    <>
      <StructuredData data={getContactSuccessStructuredData()} id="structured-data-contact-success" />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 px-4 py-12 flex items-center">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-500 dark:text-blue-300">Message sent</p>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
            Thank you for reaching out to Dr. Michael Njo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your message is on its way. Dr. Michael Njo (Michael Njo, DDS) reviews every inquiry personally and will respond within two business days.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Send another message</Link>
          </Button>
        </div>
      </div>
      </main>
    </>
  );
}
