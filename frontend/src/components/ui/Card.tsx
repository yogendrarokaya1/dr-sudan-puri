import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export const Card = ({
  children,
  padding = "md",
  hover = false,
  className,
  ...props
}: CardProps) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
        "rounded-sm shadow-sm",
        hover && "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};