"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useBlog } from "@/hooks/useBlog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDateShort } from "@/lib/utils/format";

export default function AdminBlogsPage() {
  const { blogs, isLoading, fetchBlogs, deleteBlog } = useBlog();

  useEffect(() => {
    void fetchBlogs({ limit: 50 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await deleteBlog(slug);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Manage Blogs"
          subtitle="Create, edit and manage your health articles."
        />
        <Link href="/dashboard/admin/blogs/create">
          <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
            New Blog
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : blogs.length === 0 ? (
        <EmptyState
          title="No blogs yet"
          description="Create your first health article."
          action={
            <Link href="/dashboard/admin/blogs/create">
              <Button variant="primary" size="md">
                Create Blog
              </Button>
            </Link>
          }
        />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {["Title", "Category", "Language", "Status", "Date", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 text-xs font-semibold text-muted uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-ink dark:text-white max-w-[200px] truncate">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="default">
                        {blog.category.replace("-", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {blog.language === "en" ? "English" : "नेपाली"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={blog.isPublished ? "success" : "warning"}>
                        {blog.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {formatDateShort(blog.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/admin/blogs/${blog.slug}`}>
                          <Button variant="ghost" size="sm">
                            <Pencil size={14} />
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(blog.slug)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}