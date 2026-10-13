import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-4 gap-4",
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-ink dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted max-w-sm">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};