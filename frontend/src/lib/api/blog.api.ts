import axiosInstance from "./axios";
import { ENDPOINTS } from "./endpoints";
import {
  IBlog,
  IBlogListResponse,
  IBlogQuery,
  ICreateBlogInput,
  IUpdateBlogInput,
} from "@/types";

export const blogApi = {
  getAll: async (query?: IBlogQuery): Promise<IBlogListResponse> => {
    const res = await axiosInstance.get(ENDPOINTS.BLOG.BASE, {
      params: query,
    });
    return {
      data: res.data.data,
      pagination: res.data.pagination,
    };
  },

  getBySlug: async (slug: string): Promise<IBlog> => {
    const res = await axiosInstance.get(ENDPOINTS.BLOG.BY_SLUG(slug));
    return res.data.data;
  },

  create: async (data: ICreateBlogInput): Promise<IBlog> => {
    const res = await axiosInstance.post(ENDPOINTS.BLOG.BASE, data);
    return res.data.data;
  },

  update: async (slug: string, data: IUpdateBlogInput): Promise<IBlog> => {
    const res = await axiosInstance.patch(ENDPOINTS.BLOG.BY_SLUG(slug), data);
    return res.data.data;
  },

  delete: async (slug: string): Promise<void> => {
    await axiosInstance.delete(ENDPOINTS.BLOG.BY_SLUG(slug));
  },
};