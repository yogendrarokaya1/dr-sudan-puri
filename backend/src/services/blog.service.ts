import { blogRepository } from "../repositories";
import { IBlog } from "../types";
import { CreateBlogDTO, UpdateBlogDTO, BlogQueryDTO } from "../dtos";
import { NotFoundError, ConflictError } from "../errors";
import { IPaginatedResponse } from "../types";

export class BlogService {
  async createBlog(data: CreateBlogDTO): Promise<IBlog> {
    const exists = await blogRepository.existsBySlug(data.slug);
    if (exists) {
      throw new ConflictError("Blog with this slug already exists");
    }
    return await blogRepository.create(data);
  }

  async getAllBlogs(query: BlogQueryDTO): Promise<IPaginatedResponse<IBlog>> {
    const { page = 1, limit = 10 } = query;
    const { blogs, total } = await blogRepository.findAll(query);

    return {
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getBlogBySlug(slug: string): Promise<IBlog> {
    const blog = await blogRepository.findBySlug(slug);
    if (!blog) {
      throw new NotFoundError("Blog post not found");
    }
    return blog;
  }

  async updateBlog(slug: string, data: UpdateBlogDTO): Promise<IBlog> {
    const blog = await blogRepository.updateBySlug(slug, data);
    if (!blog) {
      throw new NotFoundError("Blog post not found");
    }
    return blog;
  }

  async deleteBlog(slug: string): Promise<void> {
    const blog = await blogRepository.deleteBySlug(slug);
    if (!blog) {
      throw new NotFoundError("Blog post not found");
    }
  }
}

export default new BlogService();