export interface SendMessageDTO {
  receiverId: string;
  content: string;
}

export interface ChatHistoryQueryDTO {
  page?: number;
  limit?: number;
}