"use server";

import { blogApi } from "@/lib/api/blog.api";
import { ICreateBlogInput, IUpdateBlogInput, IBlogQuery } from "@/types";

export const getBlogsAction = async (query?: IBlogQuery) => {
  try {
    const result = await blogApi.getAll(query);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Failed to fetch blogs",
    };
  }
};

export const getBlogBySlugAction = async (slug: string) => {
  try {
    const result = await blogApi.getBySlug(slug);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Blog not found",
    };
  }
};

export const createBlogAction = async (data: ICreateBlogInput) => {
  try {
    const result = await blogApi.create(data);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Failed to create blog",
    };
  }
};

export const updateBlogAction = async (
  slug: string,
  data: IUpdateBlogInput
) => {
  try {
    const result = await blogApi.update(slug, data);
    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update blog",
    };
  }
};

export const deleteBlogAction = async (slug: string) => {
  try {
    await blogApi.delete(slug);
    return { success: true };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err.response?.data?.message || "Failed to delete blog",
    };
  }
};