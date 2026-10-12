import { Router } from "express";
import { contactController } from "../controllers";
import { authenticate, authorize, validate } from "../middlewares";
import { createContactSchema } from "../validators";
import { contactLimiter } from "../middlewares";

const router = Router();

// ── Public route ──────────────────────────────────
router.post(
  "/",
  contactLimiter,
  validate(createContactSchema),
  contactController.submitContact.bind(contactController)
);

// ── Admin only routes ─────────────────────────────
router.get(
  "/",
  authenticate,
  authorize("admin"),
  contactController.getAllContacts.bind(contactController)
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  contactController.markAsRead.bind(contactController)
);

export default router;