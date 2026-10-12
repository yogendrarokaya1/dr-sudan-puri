import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { apiLimiter } from "./middlewares";
import { AppError } from "./errors";
import { sendError } from "./utils";
import routes from "./routes";

const app: Application = express();

// ── Security Middleware ───────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Rate Limiting ─────────────────────────────────
app.use("/api", apiLimiter);

// ── Body Parser ───────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ── Static Files (uploads) ────────────────────────
app.use("/uploads", express.static("uploads"));

// ── Health Check ──────────────────────────────────
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Dr. Sudan Puri API is running 🚀",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ────────────────────────────────────
app.use("/api", routes);

// ── 404 Handler ───────────────────────────────────
app.all("*splat", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// ── Global Error Handler ──────────────────────────
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return sendError(res, err.message, 400);
  }

  // Mongoose duplicate key error
  if (err.name === "MongoServerError" && (err as any).code === 11000) {
    return sendError(res, "Duplicate field value entered", 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return sendError(res, "Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    return sendError(res, "Token expired", 401);
  }

  console.error("💥 Unexpected Error:", err);
  return sendError(res, "Internal Server Error", 500);
});

export default app;