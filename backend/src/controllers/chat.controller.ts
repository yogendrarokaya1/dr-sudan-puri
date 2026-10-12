import { Request, Response, NextFunction } from "express";
import { chatService } from "../services";
import { sendSuccess, sendPaginated } from "../utils";
import { SendMessageDTO, ChatHistoryQueryDTO } from "../dtos";

export class ChatController {
  async sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const senderId = req.user!.id;
      const data: SendMessageDTO = req.body;
      const message = await chatService.sendMessage(senderId, data);
      sendSuccess(res, "Message sent successfully", message, 201);
    } catch (error) {
      next(error);
    }
  }

  async getChatHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const adminId = req.params.adminId as string;

      const query: ChatHistoryQueryDTO = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 20,
      };

      const result = await chatService.getChatHistory(userId, adminId, query);

      sendPaginated(
        res,
        "Chat history fetched successfully",
        result.data,
        result.pagination.total,
        result.pagination.page,
        result.pagination.limit
      );
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const receiverId = req.user!.id;
      const senderId = req.params.senderId as string;
      await chatService.markAsRead(senderId, receiverId);
      sendSuccess(res, "Messages marked as read", {});
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const receiverId = req.user!.id;
      const count = await chatService.getUnreadCount(receiverId);
      sendSuccess(res, "Unread count fetched", { count });
    } catch (error) {
      next(error);
    }
  }
}

export default new ChatController();