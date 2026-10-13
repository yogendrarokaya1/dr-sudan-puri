import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-[#152f58] focus:ring-primary rounded-sm",
    secondary:
      "bg-secondary text-white hover:bg-[#2569a8] focus:ring-secondary rounded-sm",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary rounded-sm",
    ghost:
      "text-primary hover:bg-primary/10 focus:ring-primary rounded-sm",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 rounded-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner size="sm" color="current" />
      ) : (
        leftIcon && <span>{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};