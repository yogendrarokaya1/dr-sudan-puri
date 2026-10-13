import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
}

export const PageHeader = ({
  title,
  subtitle,
  children,
  className,
  centered = false,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "space-y-2",
        centered && "text-center",
        className
      )}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};