"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { blogApi } from "@/lib/api/blog.api";
import { IBlog } from "@/types";
import { BlogEditor } from "@/components/blog/BlogEditor";
import { PageHeader } from "@/components/shared/PageHeader";
import { Spinner } from "@/components/ui/Spinner";

export default function EditBlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogApi.getBySlug(slug);
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!blog) {
    return <p className="text-muted">Blog not found.</p>;
  }

  return (
    <div className="max-w-3xl space-y-8">
      <PageHeader title="Edit Blog" subtitle={`Editing: ${blog.title}`} />
      <BlogEditor blog={blog} mode="edit" />
    </div>
  );
}