/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { createBlogSchema, CreateBlogFormData } from "@/lib/validations/blog.schema";
import { blogApi } from "@/lib/api/blog.api";
import { slugify } from "@/lib/utils/format";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toast } from "@/components/ui/Toast";
import { IBlog } from "@/types";

interface BlogEditorProps {
  blog?: IBlog;
  mode?: "create" | "edit";
}

export const BlogEditor = ({ blog, mode = "create" }: BlogEditorProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.input<typeof createBlogSchema>, any, CreateBlogFormData>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: blog
      ? {
          title: blog.title,
          slug: blog.slug,
          content: blog.content,
          excerpt: blog.excerpt,
          category: blog.category,
          language: blog.language,
          coverImage: blog.coverImage || "",
          isPublished: blog.isPublished,
        }
      : { isPublished: false, language: "en", category: "general" },
  });

  const title = watch("title");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("title", e.target.value);
    if (mode === "create") {
      setValue("slug", slugify(e.target.value));
    }
  };

  const onSubmit = async (data: CreateBlogFormData) => {
    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await blogApi.create({
          ...data,
          tags: Array.isArray(data.tags) ? data.tags : [],
        });
        setToast({ message: "Blog created successfully!", type: "success" });
      } else if (blog) {
        await blogApi.update(blog.slug, data);
        setToast({ message: "Blog updated successfully!", type: "success" });
      }
      setTimeout(() => router.push("/dashboard/admin/blogs"), 1000);
    } catch {
      setToast({ message: "Failed to save blog", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit as unknown as Parameters<typeof handleSubmit>[0])} className="space-y-6">
        {/* Title */}
        <Input
          id="title"
          label="Title"
          placeholder="Enter blog title"
          error={errors.title?.message}
          {...register("title")}
          onChange={handleTitleChange}
        />

        {/* Slug */}
        <Input
          id="slug"
          label="Slug"
          placeholder="auto-generated-slug"
          error={errors.slug?.message}
          {...register("slug")}
        />

        {/* Excerpt */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink dark:text-gray-200">
            Excerpt
          </label>
          <textarea
            rows={3}
            placeholder="Brief description of the article..."
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100 px-4 py-2.5 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            {...register("excerpt")}
          />
          {errors.excerpt && (
            <p className="text-xs text-red-500">{errors.excerpt.message}</p>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink dark:text-gray-200">
            Content
          </label>
          <textarea
            rows={12}
            placeholder="Write your article content here..."
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100 px-4 py-2.5 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-xs text-red-500">{errors.content.message}</p>
          )}
        </div>

        {/* Category & Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink dark:text-gray-200">
              Category
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100 px-4 py-2.5 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("category")}
            >
              <option value="general">General</option>
              <option value="health-tips">Health Tips</option>
              <option value="nutrition">Nutrition</option>
              <option value="preventive-care">Preventive Care</option>
              <option value="awareness">Awareness</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink dark:text-gray-200">
              Language
            </label>
            <select
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-ink dark:text-gray-100 px-4 py-2.5 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("language")}
            >
              <option value="en">English</option>
              <option value="ne">नेपाली</option>
            </select>
          </div>
        </div>

        {/* Cover Image */}
        <Input
          id="coverImage"
          label="Cover Image URL (optional)"
          placeholder="https://example.com/image.jpg"
          error={errors.coverImage?.message}
          {...register("coverImage")}
        />

        {/* Tags */}
        <Input
          id="tags"
          label="Tags (comma separated)"
          placeholder="health, wellness, nutrition"
          error={errors.tags?.message}
          {...register("tags")}
        />

        {/* Published */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPublished"
            className="w-4 h-4 accent-primary"
            {...register("isPublished")}
          />
          <label
            htmlFor="isPublished"
            className="text-sm font-medium text-ink dark:text-gray-200"
          >
            Publish immediately
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
          >
            {mode === "create" ? "Create Blog" : "Update Blog"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push("/dashboard/admin/blogs")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};