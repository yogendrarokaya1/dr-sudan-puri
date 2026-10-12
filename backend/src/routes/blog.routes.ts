import { Router } from "express";
import { blogController } from "../controllers";
import { authenticate, authorize, validate } from "../middlewares";
import { createBlogSchema, updateBlogSchema } from "../validators";

const router = Router();

// ── Public routes ─────────────────────────────────
router.get(
  "/",
  blogController.getAllBlogs.bind(blogController)
);

router.get(
  "/:slug",
  blogController.getBlogBySlug.bind(blogController)
);

// ── Admin only routes ─────────────────────────────
router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createBlogSchema),
  blogController.createBlog.bind(blogController)
);

router.patch(
  "/:slug",
  authenticate,
  authorize("admin"),
  validate(updateBlogSchema),
  blogController.updateBlog.bind(blogController)
);

router.delete(
  "/:slug",
  authenticate,
  authorize("admin"),
  blogController.deleteBlog.bind(blogController)
);

export default router;