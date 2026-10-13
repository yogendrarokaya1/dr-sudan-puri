"use client";

import { useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div
        className={cn(
          "relative w-full bg-white dark:bg-gray-900 rounded-sm shadow-xl",
          "border border-gray-200 dark:border-gray-800",
          sizes[size]
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-ink dark:text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};