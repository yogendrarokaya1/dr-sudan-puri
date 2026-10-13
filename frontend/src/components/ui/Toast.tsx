"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning";
  duration?: number;
  onClose: () => void;
}

export const Toast = ({
  message,
  type = "success",
  duration = 4000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: "bg-green-50 border-green-500 text-green-800",
    error:   "bg-red-50 border-red-500 text-red-800",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800",
  };

  const icons = {
    success: <CheckCircle size={18} className="text-green-500" />,
    error:   <XCircle size={18} className="text-red-500" />,
    warning: <AlertCircle size={18} className="text-yellow-500" />,
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[100] flex items-center gap-3",
        "px-4 py-3 border-l-4 rounded-sm shadow-lg min-w-[300px]",
        "transition-all duration-300",
        styles[type],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button onClick={() => { setIsVisible(false); setTimeout(onClose, 300); }}>
        <X size={16} />
      </button>
    </div>
  );
};