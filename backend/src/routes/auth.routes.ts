import { Router } from "express";
import { authController } from "../controllers";
import { authenticate } from "../middlewares";
import { authorize } from "../middlewares";
import { validate } from "../middlewares";
import { authLimiter } from "../middlewares";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "../validators";

const router = Router();

// ── Public routes ─────────────────────────────────
router.post(
  "/signup",
  authLimiter,
  validate(signupSchema),
  authController.signup.bind(authController)
);

router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  authController.login.bind(authController)
);

router.post(
  "/forgot-password",
  authLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword.bind(authController)
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword.bind(authController)
);

// ── Protected routes ──────────────────────────────
router.get(
  "/profile",
  authenticate,
  authController.getProfile.bind(authController)
);

router.patch(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  authController.updateProfile.bind(authController)
);

export default router;