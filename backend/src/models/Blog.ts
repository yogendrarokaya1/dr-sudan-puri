import mongoose, { Schema } from "mongoose";
import { IBlog } from "../types";

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    category: {
      type: String,
      enum: ["health-tips", "nutrition", "preventive-care", "general", "awareness"],
      default: "general",
    },
    language: {
      type: String,
      enum: ["en", "ne"],
      default: "en",
    },
    author: {
      type: String,
      default: "Dr. Sudan Puri",
    },
    coverImage: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBlog>("Blog", BlogSchema);