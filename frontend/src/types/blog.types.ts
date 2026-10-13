export type BlogCategory =
  | "health-tips"
  | "nutrition"
  | "preventive-care"
  | "general"
  | "awareness";

export type BlogLanguage = "en" | "ne";

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: BlogCategory;
  language: BlogLanguage;
  author: string;
  coverImage?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBlogInput {
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

export interface IUpdateBlogInput {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: BlogCategory;
  language?: BlogLanguage;
  coverImage?: string;
  tags?: string[];
  isPublished?: boolean;
}

export interface IBlogQuery {
  page?: number;
  limit?: number;
  category?: BlogCategory;
  language?: BlogLanguage;
  search?: string;
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBlogListResponse {
  data: IBlog[];
  pagination: IPagination;
}