import axiosInstance from "./axios";
import { ENDPOINTS } from "./endpoints";
import {
  IMessage,
  ISendMessageInput,
  IChatHistoryResponse,
} from "@/types";

export const chatApi = {
  sendMessage: async (data: ISendMessageInput): Promise<IMessage> => {
    const res = await axiosInstance.post(ENDPOINTS.CHAT.SEND, data);
    return res.data.data;
  },

  getChatHistory: async (
    adminId: string,
    page?: number,
    limit?: number
  ): Promise<IChatHistoryResponse> => {
    const res = await axiosInstance.get(ENDPOINTS.CHAT.HISTORY(adminId), {
      params: { page, limit },
    });
    return {
      data: res.data.data,
      pagination: res.data.pagination,
    };
  },

  getUnreadCount: async (): Promise<number> => {
    const res = await axiosInstance.get(ENDPOINTS.CHAT.UNREAD);
    return res.data.data.count;
  },

  markAsRead: async (senderId: string): Promise<void> => {
    await axiosInstance.patch(ENDPOINTS.CHAT.MARK_READ(senderId));
  },
};