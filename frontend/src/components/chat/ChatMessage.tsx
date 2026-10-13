import { IMessage } from "@/types";
import { formatTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Check, CheckCheck } from "lucide-react";

interface ChatMessageProps {
  message: IMessage;
  currentUserId: string;
  senderName?: string;
}

export const ChatMessage = ({
  message,
  currentUserId,
  senderName,
}: ChatMessageProps) => {
  const isSender = message.senderId === currentUserId;

  return (
    <div
      className={cn(
        "flex items-end gap-2 mb-4",
        isSender ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* ── Avatar ──────────────────────────────── */}
      {!isSender && (
        <Avatar name={senderName || "Dr. Sudan Puri"} size="sm" />
      )}

      {/* ── Bubble ──────────────────────────────── */}
      <div
        className={cn(
          "max-w-[70%] px-4 py-2.5 rounded-sm shadow-sm",
          isSender
            ? "bg-primary text-white rounded-br-none"
            : "bg-white dark:bg-gray-800 text-ink dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-none"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>

        {/* ── Time + Read ─────────────────────── */}
        <div
          className={cn(
            "flex items-center gap-1 mt-1",
            isSender ? "justify-end" : "justify-start"
          )}
        >
          <span
            className={cn(
              "text-[10px]",
              isSender ? "text-blue-200" : "text-muted"
            )}
          >
            {formatTime(message.createdAt)}
          </span>
          {isSender && (
            message.isRead
              ? <CheckCheck size={12} className="text-blue-200" />
              : <Check size={12} className="text-blue-200" />
          )}
        </div>
      </div>
    </div>
  );
};