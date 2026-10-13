import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "current";
  className?: string;
}

export const Spinner = ({
  size = "md",
  color = "primary",
  className,
}: SpinnerProps) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-4",
  };

  const colors = {
    primary: "border-primary border-t-transparent",
    white: "border-white border-t-transparent",
    current: "border-current border-t-transparent",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        sizes[size],
        colors[color],
        className
      )}
    />
  );
};