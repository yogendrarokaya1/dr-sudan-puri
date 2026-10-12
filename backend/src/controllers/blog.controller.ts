import { Request, Response, NextFunction } from "express";
import { blogService } from "../services";
import { sendSuccess, sendPaginated } from "../utils";
import { CreateBlogDTO, UpdateBlogDTO, BlogQueryDTO } from "../dtos";

export class BlogController {
  async createBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: CreateBlogDTO = req.body;
      const blog = await blogService.createBlog(data);
      sendSuccess(res, "Blog created successfully", blog, 201);
    } catch (error) {
      next(error);
    }
  }

  async getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query: BlogQueryDTO = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        category: req.query.category as BlogQueryDTO["category"],
        language: req.query.language as BlogQueryDTO["language"],
        search: req.query.search as string,
      };

      const result = await blogService.getAllBlogs(query);

      sendPaginated(
        res,
        "Blogs fetched successfully",
        result.data,
        result.pagination.total,
        result.pagination.page,
        result.pagination.limit
      );
    } catch (error) {
      next(error);
    }
  }

  async getBlogBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const blog = await blogService.getBlogBySlug(slug);
      sendSuccess(res, "Blog fetched successfully", blog);
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = req.params.slug as string;
      const data: UpdateBlogDTO = req.body;
      const blog = await blogService.updateBlog(slug, data);
      sendSuccess(res, "Blog updated successfully", blog);
    } catch (error) {
      next(error);
    }
  }

  async deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = req.params.slug as string;
      await blogService.deleteBlog(slug);
      sendSuccess(res, "Blog deleted successfully", {});
    } catch (error) {
      next(error);
    }
  }
}

export default new BlogController();