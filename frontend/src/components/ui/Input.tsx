import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-ink dark:text-gray-200"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-muted">{leftIcon}</span>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              "w-full border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700",
              "text-ink dark:text-gray-100 placeholder:text-muted",
              "px-4 py-2.5 text-sm rounded-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-muted">{rightIcon}</span>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";