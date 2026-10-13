/* eslint-disable react-hooks/error-boundaries */
import { blogApi } from "@/lib/api/blog.api";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  try {
    const blog = await blogApi.getBySlug(slug);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
        <BlogDetail blog={blog} />
      </div>
      
    );
  } catch {
    notFound();
  }
}