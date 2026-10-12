import { Document } from "mongoose";

export type BlogCategory =
  | "health-tips"
  | "nutrition"
  | "preventive-care"
  | "general"
  | "awareness";

export type BlogLanguage = "en" | "ne";

export interface IBlog extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}