import { z } from "zod";

export const sendMessageSchema = z.object({
  receiverId: z
    .string({ error: "Receiver ID is required" })
    .min(1, "Receiver ID is required"),

  content: z
    .string({ error: "Message content is required" })
    .min(1, "Message cannot be empty")
    .max(1000, "Message cannot exceed 1000 characters")
    .trim(),
});