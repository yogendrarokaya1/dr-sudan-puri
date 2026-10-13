"use client";

import { useState, useCallback } from "react";
import { blogApi } from "@/lib/api/blog.api";
import { IBlog, IBlogQuery, IPagination } from "@/types";

export const useBlog = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async (query?: IBlogQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await blogApi.getAll(query);
      setBlogs(result.data);
      setPagination(result.pagination);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchBlogBySlug = useCallback(async (slug: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await blogApi.getBySlug(slug);
      setBlog(result);
      return result;
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || "Blog not found");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteBlog = useCallback(async (slug: string) => {
    try {
      await blogApi.delete(slug);
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      return { success: true };
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: e.response?.data?.message || "Failed to delete blog",
      };
    }
  }, []);

  return {
    blogs,
    blog,
    pagination,
    isLoading,
    error,
    fetchBlogs,
    fetchBlogBySlug,
    deleteBlog,
  };
};