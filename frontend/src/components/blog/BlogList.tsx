"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { IBlogQuery, BlogCategory, BlogLanguage } from "@/types";
import { useBlog } from "@/hooks/useBlog";
import { BlogCard } from "./BlogCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

const categories: { label: string; value: BlogCategory | "" }[] = [
  { label: "All",             value: "" },
  { label: "Health Tips",     value: "health-tips" },
  { label: "Nutrition",       value: "nutrition" },
  { label: "Preventive Care", value: "preventive-care" },
  { label: "Awareness",       value: "awareness" },
  { label: "General",         value: "general" },
];

export const BlogList = () => {
  const { blogs, pagination, isLoading, fetchBlogs } = useBlog();
  const [query, setQuery] = useState<IBlogQuery>({
    page: 1,
    limit: 9,
    language: "en",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    void fetchBlogs(query);
  }, [query]);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    setQuery((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleCategory = (category: BlogCategory | "") => {
    setQuery((prev) => ({
      ...prev,
      category: category || undefined,
      page: 1,
    }));
  };

  const handleLanguage = (language: BlogLanguage) => {
    setQuery((prev) => ({ ...prev, language, page: 1 }));
  };

  return (
    <div className="space-y-8">
      {/* ── Filters ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex gap-2 flex-1">
          <Input
            placeholder="Search articles..."
            leftIcon={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button variant="primary" size="md" onClick={handleSearch}>
            Search
          </Button>
        </div>

        {/* Language Toggle */}
        <div className="flex rounded-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {(["en", "ne"] as BlogLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguage(lang)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                query.language === lang
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {lang === "en" ? "English" : "नेपाली"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Category Tabs ─────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategory(cat.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-sm border transition-all ${
              query.category === cat.value ||
              (cat.value === "" && !query.category)
                ? "bg-primary text-white border-primary"
                : "border-gray-200 dark:border-gray-700 text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Blog Grid ────────────────────────────── */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {/* ── Pagination ───────────────────────────── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={query.page === 1}
            onClick={() =>
              setQuery((prev) => ({ ...prev, page: (prev.page || 1) - 1 }))
            }
          >
            Previous
          </Button>
          <span className="text-sm text-muted">
            Page {query.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={query.page === pagination.totalPages}
            onClick={() =>
              setQuery((prev) => ({ ...prev, page: (prev.page || 1) + 1 }))
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};