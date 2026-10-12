import { Blog } from "../models";
import { IBlog } from "../types";
import { CreateBlogDTO, UpdateBlogDTO, BlogQueryDTO } from "../dtos";

export class BlogRepository {
  async create(data: CreateBlogDTO): Promise<IBlog> {
    return await Blog.create(data);
  }

  async findAll(query: BlogQueryDTO): Promise<{ blogs: IBlog[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      category,
      language,
      search,
    } = query;

    const filter: Record<string, unknown> = { isPublished: true };

    if (category) filter.category = category;
    if (language) filter.language = language;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(filter),
    ]);

    return { blogs, total };
  }

  async findBySlug(slug: string): Promise<IBlog | null> {
    return await Blog.findOne({ slug, isPublished: true });
  }

  async findBySlugAdmin(slug: string): Promise<IBlog | null> {
    return await Blog.findOne({ slug });
  }

  async updateBySlug(slug: string, data: UpdateBlogDTO): Promise<IBlog | null> {
    return await Blog.findOneAndUpdate({ slug }, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBySlug(slug: string): Promise<IBlog | null> {
    return await Blog.findOneAndDelete({ slug });
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const blog = await Blog.findOne({ slug }).select("_id");
    return !!blog;
  }
}

export default new BlogRepository();