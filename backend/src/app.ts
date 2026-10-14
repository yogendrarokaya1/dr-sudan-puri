
import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import helmet from "helmet";
import cors from "cors";

import { apiLimiter } from "./middlewares";
import { AppError } from "./errors";
import { sendError } from "./utils";
import { config } from "./config/env.config";

import routes from "./routes";

const app: Application = express();

// ─────────────────────────────────────────────
// 1. Security Middleware
// ─────────────────────────────────────────────

app.use(helmet());

// ─────────────────────────────────────────────
// 2. CORS Configuration
// Supports local development and Vercel
// ─────────────────────────────────────────────

const allowedOrigins = config.cors.allowedOrigins;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header.
      // CORS is a browser security policy, not authentication.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ─────────────────────────────────────────────
// 3. Body Parsing
// ─────────────────────────────────────────────

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// 4. Rate Limiting
// ─────────────────────────────────────────────

app.use("/api", apiLimiter);

// ─────────────────────────────────────────────
// 5. Static Files
// ─────────────────────────────────────────────

app.use("/uploads", express.static("uploads"));

// ─────────────────────────────────────────────
// 6. Health Check
// ─────────────────────────────────────────────

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Dr. Sudan Puri API is running",
    environment: config.server.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
// 7. API Routes
// ─────────────────────────────────────────────

app.use("/api", routes);

// ─────────────────────────────────────────────
// 8. 404 Handler
// ─────────────────────────────────────────────

app.all("*splat", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `Route ${req.originalUrl} not found`,
      404
    )
  );
});

// ─────────────────────────────────────────────
// 9. Global Error Handler
// ─────────────────────────────────────────────

app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) {
      return next(err);
    }

    // CORS errors
    if (err.message.startsWith("CORS blocked origin:")) {
      return sendError(res, "Origin not allowed", 403);
    }

    // Application errors
    if (err instanceof AppError) {
      return sendError(
        res,
        err.message,
        err.statusCode
      );
    }

    // Mongoose validation errors
    if (err.name === "ValidationError") {
      return sendError(res, err.message, 400);
    }

    // Mongoose duplicate key errors
    if (
      err.name === "MongoServerError" &&
      (err as Error & { code?: number }).code === 11000
    ) {
      return sendError(
        res,
        "Duplicate field value entered",
        400
      );
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
      return sendError(res, "Invalid token", 401);
    }

    if (err.name === "TokenExpiredError") {
      return sendError(res, "Token expired", 401);
    }

    console.error("Unexpected Error:", err);

    return sendError(
      res,
      "Internal Server Error",
      500
    );
  }
);

export default app;
