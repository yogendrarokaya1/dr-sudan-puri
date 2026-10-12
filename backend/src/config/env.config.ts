export const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  },

  database: {
    mongoUri: process.env.MONGO_URI as string,
  },

  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: "7d",
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