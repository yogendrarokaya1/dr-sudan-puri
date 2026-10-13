"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useSocket } from "@/hooks/useSocket";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";
import { IMessage } from "@/types";
import { timeAgo } from "@/lib/utils/format";
import { truncate } from "@/lib/utils/format";

interface ChatListItem {
  userId: string;
  name: string;
  lastMessage?: IMessage;
}

interface ChatListProps {
  chats: ChatListItem[];
  selectedId?: string;
  onSelect: (userId: string) => void;
}

export const ChatList = ({ chats, selectedId, onSelect }: ChatListProps) => {
  const { isUserOnline } = useSocket();

  return (
    <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
      {chats.length === 0 ? (
        <div className="py-10 text-center text-sm text-muted">
          No conversations yet
        </div>
      ) : (
        chats.map((chat) => {
          const isOnline = isUserOnline(chat.userId);
          const isSelected = selectedId === chat.userId;

          return (
            <button
              key={chat.userId}
              onClick={() => onSelect(chat.userId)}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
                isSelected
                  ? "bg-primary/10 dark:bg-primary/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {/* Avatar with online dot */}
              <div className="relative shrink-0">
                <Avatar name={chat.name} size="md" />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-ink dark:text-white truncate">
                    {chat.name}
                  </p>
                  {chat.lastMessage && (
                    <span className="text-[10px] text-muted shrink-0 ml-2">
                      {timeAgo(chat.lastMessage.createdAt)}
                    </span>
                  )}
                </div>
                {chat.lastMessage && (
                  <p className="text-xs text-muted truncate mt-0.5">
                    {truncate(chat.lastMessage.content, 40)}
                  </p>
                )}
              </div>
            </button>
          );
        })
      )}
    </div>
  );
};