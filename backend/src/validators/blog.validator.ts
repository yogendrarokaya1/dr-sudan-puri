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
    .max(200, "Slug cannot exceed 200 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens")
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
    { error: "Category is required" }
  ),

  language: z.enum(["en", "ne"], {
    error: "Language is required",
  }),

  coverImage: z
    .string()
    .url("Cover image must be a valid URL")
    .optional(),

  tags: z
    .array(z.string())
    .max(10, "Cannot have more than 10 tags")
    .optional(),

  isPublished: z.boolean().optional(),
});

export const updateBlogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title cannot exceed 200 characters")
    .trim()
    .optional(),

  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .optional(),

  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(300, "Excerpt cannot exceed 300 characters")
    .optional(),

  category: z
    .enum(["health-tips", "nutrition", "preventive-care", "general", "awareness"])
    .optional(),

  language: z.enum(["en", "ne"]).optional(),

  coverImage: z
    .string()
    .url("Cover image must be a valid URL")
    .optional(),

  tags: z
    .array(z.string())
    .max(10, "Cannot have more than 10 tags")
    .optional(),

  isPublished: z.boolean().optional(),
});