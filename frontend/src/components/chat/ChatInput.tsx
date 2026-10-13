"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

interface ChatInputProps {
  onSend: (content: string) => Promise<void>;
  onTyping?: () => void;
  isSending?: boolean;
  disabled?: boolean;
}

export const ChatInput = ({
  onSend,
  onTyping,
  isSending = false,
  disabled = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || isSending) return;
    await onSend(trimmed);
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onTyping?.();
  };

  return (
    <div className="flex items-end gap-3 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <textarea
        rows={1}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type a message... (Enter to send)"
        className={cn(
          "flex-1 resize-none border border-gray-300 dark:border-gray-700",
          "bg-surface dark:bg-gray-800 text-ink dark:text-gray-100",
          "px-4 py-2.5 text-sm rounded-sm max-h-32",
          "focus:outline-none focus:ring-2 focus:ring-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-all duration-200"
        )}
      />
      <Button
        variant="primary"
        size="md"
        onClick={handleSend}
        isLoading={isSending}
        disabled={!message.trim() || disabled}
      >
        <Send size={16} />
      </Button>
    </div>
  );
};