"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Mail, MapPin, Globe, Send } from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/validations/contact.schema";
import { contactApi } from "@/lib/api/contact.api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/Card";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await contactApi.submit(data);
      setIsSuccess(true);
      reset();
    } catch {
      setToast({ message: "Failed to send message. Try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <PageHeader
        title="Get in Touch"
        subtitle="Have a question or want to connect? Send a message and Dr. Puri will get back to you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Contact Info ──────────────────────── */}
        <div className="space-y-4">
          <Card padding="md" className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="font-medium text-ink dark:text-white text-sm">Location</p>
              <p className="text-sm text-muted">Al Khail Gate, Dubai, UAE</p>
            </div>
          </Card>

          <Card padding="md" className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <p className="font-medium text-ink dark:text-white text-sm">Email</p>
              <a
                href="mailto:sudanpuri@example.com"
                className="text-sm text-secondary hover:underline"
              >
                sudanpuri@example.com
              </a>
            </div>
          </Card>

          <Card padding="md" className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center text-primary shrink-0">
              <Globe size={18} />
            </div>
            <div>
              <p className="font-medium text-ink dark:text-white text-sm">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/sudan-puri-a69979244/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-secondary hover:underline"
              >
                View Profile
              </a>
            </div>
          </Card>
        </div>

        {/* ── Contact Form ──────────────────────── */}
        <div className="lg:col-span-2">
          {isSuccess ? (
            <Card padding="lg" className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Send size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-ink dark:text-white">
                Message Sent!
              </h3>
              <p className="text-sm text-muted">
                Thank you for reaching out. Dr. Puri will get back to you soon.
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsSuccess(false)}
              >
                Send Another Message
              </Button>
            </Card>
          ) : (
            <Card padding="lg">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    label="Full Name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>

                <Input
                  id="subject"
                  label="Subject"
                  placeholder="What is this about?"
                  error={errors.subject?.message}
                  {...register("subject")}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink dark:text-gray-200">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Your message..."
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100 px-4 py-2.5 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">{errors.message?.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={<Send size={16} />}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}