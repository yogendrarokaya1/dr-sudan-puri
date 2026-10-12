import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import connectDB from "./database/connection";
import { initSocket } from "./socket/chatSocket";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    // ── Connect to MongoDB ──────────────────────
    await connectDB();

    // ── Create HTTP server ──────────────────────
    const server = http.createServer(app);

    // ── Initialize Socket.io ────────────────────
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    initSocket(io);

    // ── Start server ────────────────────────────
    server.listen(PORT, () => {
      console.log("─────────────────────────────────────");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 Health: http://localhost:${PORT}/health`);
      console.log("─────────────────────────────────────");
    });

    // ── Graceful shutdown ───────────────────────
    process.on("SIGTERM", () => {
      console.log("⚠️  SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();