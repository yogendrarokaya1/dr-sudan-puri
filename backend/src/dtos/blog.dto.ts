import { BlogCategory, BlogLanguage } from "../types";

export interface CreateBlogDTO {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: BlogCategory;
  language: BlogLanguage;
  coverImage?: string;
  tags?: string[];
  isPublished?: boolean;
}

export interface UpdateBlogDTO {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: BlogCategory;
  language?: BlogLanguage;
  coverImage?: string;
  tags?: string[];
  isPublished?: boolean;
}

export interface BlogQueryDTO {
  page?: number;
  limit?: number;
  category?: BlogCategory;
  language?: BlogLanguage;
  search?: string;
}