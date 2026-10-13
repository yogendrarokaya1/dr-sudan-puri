export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISendMessageInput {
  receiverId: string;
  content: string;
}

export interface IChatHistoryResponse {
  data: IMessage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ISocketUser {
  userId: string;
  socketId: string;
  role: "admin" | "user";
}