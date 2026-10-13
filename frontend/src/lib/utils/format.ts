// ── Date formatting ───────────────────────────────
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateShort = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTime = (date: string | Date): string => {
  return `${formatDateShort(date)} at ${formatTime(date)}`;
};

export const timeAgo = (date: string | Date): string => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

// ── Text formatting ───────────────────────────────
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// ── Number formatting ─────────────────────────────
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};