import { Message } from "../models";
import { IMessage } from "../types";
import { SendMessageDTO, ChatHistoryQueryDTO } from "../dtos";

export class MessageRepository {
  async create(
    senderId: string,
    data: SendMessageDTO
  ): Promise<IMessage> {
    return await Message.create({
      senderId,
      receiverId: data.receiverId,
      content: data.content,
    });
  }

  async findConversation(
    userId: string,
    adminId: string,
    query: ChatHistoryQueryDTO
  ): Promise<{ messages: IMessage[]; total: number }> {
    const { page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { senderId: userId, receiverId: adminId },
        { senderId: adminId, receiverId: userId },
      ],
    };

    const [messages, total] = await Promise.all([
      Message.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Message.countDocuments(filter),
    ]);

    return { messages, total };
  }

  async markAsRead(senderId: string, receiverId: string): Promise<void> {
    await Message.updateMany(
      { senderId, receiverId, isRead: false },
      { isRead: true }
    );
  }

  async getUnreadCount(receiverId: string): Promise<number> {
    return await Message.countDocuments({ receiverId, isRead: false });
  }
}

export default new MessageRepository();