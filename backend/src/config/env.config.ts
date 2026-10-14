
const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const config = {
  server: {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
  },

  cors: {
    allowedOrigins,
  },

  database: {
    mongoUri: process.env.MONGO_URI as string,
  },

  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  email: {
    host: process.env.MAIL_HOST as string,
    port: Number(process.env.MAIL_PORT) || 587,
    user: process.env.MAIL_USER as string,
    pass: process.env.MAIL_PASS as string,
  },

  admin: {
    email: process.env.ADMIN_EMAIL as string,
  },
} as const;
