"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { useAuthContext } from "@/context/AuthContext";
import { useSocket } from "@/hooks/useSocket";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils/cn";

interface ChatWindowProps {
  receiverId: string;
  receiverName?: string;
}

export const ChatWindow = ({ receiverId, receiverName }: ChatWindowProps) => {
  const { user } = useAuthContext();
  const { isUserOnline, emitTypingStart, emitTypingStop } = useSocket();
  const {
    messages,
    isLoading,
    isSending,
    isTyping,
    loadHistory,
    sendMessage,
    handleTyping,
  } = useChat(receiverId);

  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Load history on mount ─────────────────────
  useEffect(() => {
    void loadHistory();
  }, [receiverId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Scroll to bottom on new message ──────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isOnline = isUserOnline(receiverId);

  return (
    <div className="flex flex-col h-full bg-surface dark:bg-gray-950 rounded-sm border border-gray-200 dark:border-gray-800 overflow-hidden">

      {/* ── Header ───────────────────────────────── */}
      <div className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
            {receiverName?.[0]?.toUpperCase() || "D"}
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink dark:text-white">
            {receiverName || "Dr. Sudan Puri"}
          </p>
          <p className={cn(
            "text-xs",
            isTyping
              ? "text-secondary"
              : isOnline
              ? "text-green-500"
              : "text-muted"
          )}>
            {isTyping ? "typing..." : isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* ── Messages ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner size="lg" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-sm text-muted">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message._id}
                message={message}
                currentUserId={user?._id || ""}
                senderName={receiverName}
              />
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* ── Input ────────────────────────────────── */}
      <ChatInput
        onSend={sendMessage}
        onTyping={handleTyping}
        isSending={isSending}
      />
    </div>
  );
};