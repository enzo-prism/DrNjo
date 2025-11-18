import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { StructuredData } from "@/components/structured-data";
import { getContactStructuredData } from "@/seo/structured-data";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(7, "Include a valid phone number."),
  organization: z.string().optional(),
  message: z.string().min(10, "Share details so Dr. Njo can respond personally."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  message: "",
};

export default function Contact() {

  const [, setLocation] = useLocation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    const payload = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        payload.append(key, value as string);
      }
    });
    payload.append("_subject", "New inquiry for Michael Njo, DDS");
    payload.append("_replyto", values.email);

    try {
      const res = await fetch("https://formspree.io/f/manaywyw", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }
      setLocation("/contact/success");
    } catch (err) {
      console.error(err);
      setSubmitError("We couldn't send your message. Please try again or email dentalstrategies@gmail.com.");
    }
  };

  return (
    <>
      <StructuredData data={getContactStructuredData()} id="structured-data-contact" />
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-blue-500 dark:text-blue-300">Contact</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-50">
            Send a message to Michael Njo, DDS
          </h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Share a message directly with Dr. Michael Njo, DDS. Let him know about your practice, goals, or questions and
            he’ll personally reach out with next steps.
          </p>
        </div>

        <Card className="shadow-xl border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-50">Send a message to Dr. Njo</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Practice / Organization (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Practice name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder="Share context, goals, or specific questions for Dr. Njo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submitError && (
                  <p className="text-sm text-red-500">{submitError}</p>
                )}
                <Button type="submit" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
                  Send message to Dr. Njo
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/">Back to home</Link>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

      </div>
      </main>
    </>
  );
}
