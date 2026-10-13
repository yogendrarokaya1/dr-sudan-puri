"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSocket } from "./useSocket";
import { chatApi } from "@/lib/api/chat.api";
import { IMessage } from "@/types";

export const useChat = (receiverId: string) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Load chat history ─────────────────────────
  const loadHistory = useCallback(async () => {
    if (!receiverId) return;
    setIsLoading(true);
    try {
      const result = await chatApi.getChatHistory(receiverId);
      setMessages(result.data.reverse());
      await chatApi.markAsRead(receiverId);
    } catch (err) {
      console.error("Failed to load chat history", err);
    } finally {
      setIsLoading(false);
    }
  }, [receiverId]);

  // ── Socket listeners ──────────────────────────
  useEffect(() => {
    if (!socket) return;

    socket.on("message:receive", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
      setUnreadCount((prev) => prev + 1);
    });

    socket.on("message:sent", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("typing:start", ({ userId }: { userId: string }) => {
      if (userId === receiverId) setIsTyping(true);
    });

    socket.on("typing:stop", ({ userId }: { userId: string }) => {
      if (userId === receiverId) setIsTyping(false);
    });

    return () => {
      socket.off("message:receive");
      socket.off("message:sent");
      socket.off("typing:start");
      socket.off("typing:stop");
    };
  }, [socket, receiverId]);

  // ── Send message ──────────────────────────────
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || !receiverId) return;
      setIsSending(true);
      try {
        socket?.emit("message:send", { receiverId, content: content.trim() });
      } catch (err) {
        console.error("Failed to send message", err);
      } finally {
        setIsSending(false);
      }
    },
    [socket, receiverId]
  );

  // ── Typing indicator ──────────────────────────
  const handleTyping = useCallback(() => {
    socket?.emit("typing:start", { receiverId });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit("typing:stop", { receiverId });
    }, 2000);
  }, [socket, receiverId]);

  return {
    messages,
    isLoading,
    isSending,
    isTyping,
    unreadCount,
    loadHistory,
    sendMessage,
    handleTyping,
  };
};