"use client";

import { useSocketContext } from "@/context/SocketContext";

export const useSocket = () => {
  const { socket, isConnected, onlineUsers } = useSocketContext();

  const isUserOnline = (userId: string): boolean => {
    return onlineUsers.includes(userId);
  };

  const emitTypingStart = (receiverId: string): void => {
    socket?.emit("typing:start", { receiverId });
  };

  const emitTypingStop = (receiverId: string): void => {
    socket?.emit("typing:stop", { receiverId });
  };

  return {
    socket,
    isConnected,
    onlineUsers,
    isUserOnline,
    emitTypingStart,
    emitTypingStop,
  };
};