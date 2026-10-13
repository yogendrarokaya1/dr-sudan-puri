import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

export const Badge = ({
  variant = "default",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    default: "bg-primary/10 text-primary",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger:  "bg-red-100 text-red-700",
    info:    "bg-blue-100 text-blue-700",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-sm",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};