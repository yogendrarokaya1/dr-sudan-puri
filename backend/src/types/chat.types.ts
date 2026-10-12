import { Document } from "mongoose";

export interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ISocketUser {
  userId: string;
  socketId: string;
  role: "admin" | "user";
}