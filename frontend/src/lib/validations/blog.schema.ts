import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title cannot exceed 200 characters")
    .trim(),

  slug: z
    .string({ error: "Slug is required" })
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens"
    )
    .trim(),

  content: z
    .string({ error: "Content is required" })
    .min(50, "Content must be at least 50 characters"),

  excerpt: z
    .string({ error: "Excerpt is required" })
    .min(10, "Excerpt must be at least 10 characters")
    .max(300, "Excerpt cannot exceed 300 characters"),

  category: z.enum(
    ["health-tips", "nutrition", "preventive-care", "general", "awareness"],
    { error: "Please select a category" }
  ),

  language: z.enum(["en", "ne"], {
    error: "Please select a language",
  }),

  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),

  tags: z
    .string()
    .optional()
    .transform((val) =>
      val ? val.split(",").map((t) => t.trim()).filter(Boolean) : []
    ),

  isPublished: z.boolean().default(false),
});

export const updateBlogSchema = createBlogSchema.partial();

export type CreateBlogFormData = z.infer<typeof createBlogSchema>;
export type UpdateBlogFormData = z.infer<typeof updateBlogSchema>;