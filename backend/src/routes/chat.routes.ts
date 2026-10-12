import { Router } from "express";
import { chatController } from "../controllers";
import { authenticate, authorize, validate } from "../middlewares";
import { sendMessageSchema } from "../validators";

const router = Router();

// ── All authenticated users ───────────────────────
router.post(
  "/",
  authenticate,
  validate(sendMessageSchema),
  chatController.sendMessage.bind(chatController)
);

router.get(
  "/history/:adminId",
  authenticate,
  chatController.getChatHistory.bind(chatController)
);

router.get(
  "/unread",
  authenticate,
  chatController.getUnreadCount.bind(chatController)
);

router.patch(
  "/read/:senderId",
  authenticate,
  chatController.markAsRead.bind(chatController)
);

export default router;