/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { token, isAuthenticated } = useAuthContext();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: { token },
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("🔌 Socket connected");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("❌ Socket disconnected");
    });

    newSocket.on("user:online", ({ userId }: { userId: string }) => {
      setOnlineUsers((prev) => [...new Set([...prev, userId])]);
    });

    newSocket.on("user:offline", ({ userId }: { userId: string }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated, token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within SocketProvider");
  }
  return context;
};