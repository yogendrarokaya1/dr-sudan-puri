export const ENDPOINTS = {
  // ── Auth ────────────────────────────────────────
  AUTH: {
    SIGNUP:          "/auth/signup",
    LOGIN:           "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD:  "/auth/reset-password",
    PROFILE:         "/auth/profile",
  },

  // ── Blog ────────────────────────────────────────
  BLOG: {
    BASE:            "/blog",
    BY_SLUG:         (slug: string) => `/blog/${slug}`,
  },

  // ── Chat ────────────────────────────────────────
  CHAT: {
    SEND:            "/chat",
    HISTORY:         (adminId: string) => `/chat/history/${adminId}`,
    UNREAD:          "/chat/unread",
    MARK_READ:       (senderId: string) => `/chat/read/${senderId}`,
  },

  // ── Contact ─────────────────────────────────────
  CONTACT: {
    BASE:            "/contact",
    BY_ID:           (id: string) => `/contact/${id}`,
  },
} as const;