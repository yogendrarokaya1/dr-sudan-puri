import { Server, Socket } from "socket.io";
import { verifyToken } from "../utils/jwt";
import { messageRepository } from "../repositories";
import { ISocketUser } from "../types";

const connectedUsers = new Map<string, ISocketUser>();

export const initSocket = (io: Server): void => {
  // ── Auth middleware for socket ──────────────────
  io.use((socket: Socket, next) => {
    try {
      const token = socket.handshake.auth.token as string;

      if (!token) {
        return next(new Error("Authentication token missing"));
      }

      const decoded = verifyToken(token);
      socket.data.user = decoded;
      next();
    } catch (error) {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const user = socket.data.user;
    console.log(`🔌 Connected: ${user.id} (${user.role})`);

    // ── Register user as online ───────────────────
    connectedUsers.set(user.id, {
      userId: user.id,
      socketId: socket.id,
      role: user.role,
    });

    // Broadcast online status
    io.emit("user:online", { userId: user.id });

    // ── Send message ──────────────────────────────
    socket.on(
      "message:send",
      async (data: { receiverId: string; content: string }) => {
        try {
          if (!data.receiverId || !data.content?.trim()) {
            socket.emit("error", { message: "Invalid message data" });
            return;
          }

          // Save to DB
          const message = await messageRepository.create(user.id, {
            receiverId: data.receiverId,
            content: data.content.trim(),
          });

          // Send to receiver if online
          const receiver = connectedUsers.get(data.receiverId);
          if (receiver) {
            io.to(receiver.socketId).emit("message:receive", message);
          }

          // Confirm to sender
          socket.emit("message:sent", message);
        } catch (error) {
          socket.emit("error", { message: "Failed to send message" });
        }
      }
    );

    // ── Mark messages as read ─────────────────────
    socket.on("message:read", async (data: { senderId: string }) => {
      try {
        await messageRepository.markAsRead(data.senderId, user.id);

        // Notify sender their messages were read
        const sender = connectedUsers.get(data.senderId);
        if (sender) {
          io.to(sender.socketId).emit("message:read:confirm", {
            readBy: user.id,
          });
        }
      } catch (error) {
        socket.emit("error", { message: "Failed to mark as read" });
      }
    });

    // ── Typing indicators ─────────────────────────
    socket.on("typing:start", (data: { receiverId: string }) => {
      const receiver = connectedUsers.get(data.receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("typing:start", { userId: user.id });
      }
    });

    socket.on("typing:stop", (data: { receiverId: string }) => {
      const receiver = connectedUsers.get(data.receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("typing:stop", { userId: user.id });
      }
    });

    // ── Get online users ──────────────────────────
    socket.on("users:online", () => {
      const onlineUserIds = Array.from(connectedUsers.keys());
      socket.emit("users:online", onlineUserIds);
    });

    // ── Disconnect ────────────────────────────────
    socket.on("disconnect", () => {
      connectedUsers.delete(user.id);
      io.emit("user:offline", { userId: user.id });
      console.log(`❌ Disconnected: ${user.id}`);
    });
  });
};