import Image from "next/image";
import { Calendar, User, Tag } from "lucide-react";
import { IBlog } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/format";

interface BlogDetailProps {
  blog: IBlog;
}

export const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <article className="max-w-3xl mx-auto">
      {/* ── Cover Image ────────────────────────────── */}
      {blog.coverImage && (
        <div className="relative h-64 sm:h-96 rounded-sm overflow-hidden mb-8">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* ── Header ───────────────────────────────────── */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="default">
            {blog.category.replace("-", " ")}
          </Badge>
          <Badge variant="info">
            {blog.language === "en" ? "English" : "नेपाली"}
          </Badge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-white leading-tight">
          {blog.title}
        </h1>

        <p className="text-lg text-muted leading-relaxed">
          {blog.excerpt}
        </p>

        {/* ── Meta ─────────────────────────────────── */}
        <div className="flex items-center gap-6 text-sm text-muted pt-2 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <User size={15} />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={15} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {/* ── Tags ─────────────────────────────────── */}
        {blog.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={14} className="text-muted" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-muted px-2 py-1 rounded-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div
        className="prose prose-blue dark:prose-invert max-w-none
          prose-headings:text-ink dark:prose-headings:text-white
          prose-p:text-muted dark:prose-p:text-gray-300
          prose-p:leading-relaxed prose-p:text-base
          prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-ink dark:prose-strong:text-white"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};