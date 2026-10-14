
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

import app from "./app";
import connectDB from "./database/connection";
import { initSocket } from "./socket/chatSocket";
import { config } from "./config/env.config";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    // ─────────────────────────────────────────
    // 1. Connect to MongoDB
    // ─────────────────────────────────────────

    await connectDB();

    console.log("✅ MongoDB connected successfully");

    // ─────────────────────────────────────────
    // 2. Create HTTP server
    // ─────────────────────────────────────────

    const server = http.createServer(app);

    // ─────────────────────────────────────────
    // 3. Initialize Socket.IO
    // Uses the same allowed origins as Express
    // ─────────────────────────────────────────

    const io = new Server(server, {
      cors: {
        origin: (origin, callback) => {
          if (
            !origin ||
            config.cors.allowedOrigins.includes(origin)
          ) {
            return callback(null, true);
          }

          return callback(
            new Error(`Socket.IO CORS blocked origin: ${origin}`)
          );
        },
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    initSocket(io);

    // ─────────────────────────────────────────
    // 4. Start server
    // ─────────────────────────────────────────

    server.listen(PORT, () => {
      console.log("─────────────────────────────────────");
      console.log("🚀 Dr. Sudan Puri API started");
      console.log(`🌍 Environment: ${config.server.nodeEnv}`);
      console.log(`🔗 Port: ${PORT}`);
      console.log(`🔗 Health: http://localhost:${PORT}/health`);
      console.log("✅ Socket.IO initialized");
      console.log("─────────────────────────────────────");
    });

    // ─────────────────────────────────────────
    // 5. Graceful shutdown
    // ─────────────────────────────────────────

    const shutdown = (signal: string): void => {
      console.log(`⚠️ ${signal} received. Shutting down...`);

      // Stop accepting new Socket.IO connections.
      io.close(() => {
        console.log("✅ Socket.IO connections closed");
      });

      // Close the HTTP server and existing connections.
      server.close((error) => {
        if (error) {
          console.error("❌ Error closing server:", error);
          process.exitCode = 1;
          return;
        }

        console.log("✅ HTTP server closed");
        process.exit(0);
      });
    };

    process.once("SIGTERM", () => shutdown("SIGTERM"));
    process.once("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exitCode = 1;
  }
};

startServer();
