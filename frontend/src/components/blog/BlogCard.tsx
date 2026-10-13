import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import { IBlog } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort, truncate } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface BlogCardProps {
  blog: IBlog;
  className?: string;
}

export const BlogCard = ({ blog, className }: BlogCardProps) => {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div
        className={cn(
          "group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
          "rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5",
          "transition-all duration-200 overflow-hidden",
          className
        )}
      >
        {/* ── Cover Image ──────────────────────────── */}
        <div className="relative h-48 bg-surface dark:bg-gray-800 overflow-hidden">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Tag size={24} className="text-primary" />
              </div>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="default">
              {blog.category.replace("-", " ")}
            </Badge>
          </div>
        </div>

        {/* ── Content ──────────────────────────────── */}
        <div className="p-5 space-y-3">
          <h3 className="font-semibold text-ink dark:text-white leading-snug group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
            {truncate(blog.title, 70)}
          </h3>

          <p className="text-sm text-muted leading-relaxed">
            {truncate(blog.excerpt, 120)}
          </p>

          {/* ── Meta ─────────────────────────────── */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Calendar size={13} />
              <span>{formatDateShort(blog.createdAt)}</span>
            </div>
            <span className="text-xs font-medium text-secondary">
              Read more →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};