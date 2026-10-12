import { messageRepository } from "../repositories";
import { userRepository } from "../repositories";
import { IMessage } from "../types";
import { SendMessageDTO, ChatHistoryQueryDTO } from "../dtos";
import { NotFoundError } from "../errors";
import { IPaginatedResponse } from "../types";

export class ChatService {
  async sendMessage(
    senderId: string,
    data: SendMessageDTO
  ): Promise<IMessage> {
    const receiver = await userRepository.findById(data.receiverId);
    if (!receiver) {
      throw new NotFoundError("Receiver not found");
    }

    return await messageRepository.create(senderId, data);
  }

  async getChatHistory(
    userId: string,
    adminId: string,
    query: ChatHistoryQueryDTO
  ): Promise<IPaginatedResponse<IMessage>> {
    const { page = 1, limit = 20 } = query;
    const { messages, total } = await messageRepository.findConversation(
      userId,
      adminId,
      query
    );

    return {
      success: true,
      message: "Chat history fetched successfully",
      data: messages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(senderId: string, receiverId: string): Promise<void> {
    await messageRepository.markAsRead(senderId, receiverId);
  }

  async getUnreadCount(receiverId: string): Promise<number> {
    return await messageRepository.getUnreadCount(receiverId);
  }
}

export default new ChatService();