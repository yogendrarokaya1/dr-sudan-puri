import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),

  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address")
    .trim(),

  subject: z
    .string({ error: "Subject is required" })
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject cannot exceed 100 characters")
    .trim(),

  message: z
    .string({ error: "Message is required" })
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;