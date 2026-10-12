import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types";

const MessageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: String,
      required: [true, "Sender ID is required"],
    },
    receiverId: {
      type: String,
      required: [true, "Receiver ID is required"],
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>("Message", MessageSchema);