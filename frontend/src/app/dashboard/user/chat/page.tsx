/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { chatApi } from "@/lib/api/chat.api";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { PageHeader } from "@/components/shared/PageHeader";
import { Spinner } from "@/components/ui/Spinner";

export default function UserChatPage() {
  const [adminId, setAdminId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get admin ID from env or first message history
    const id = process.env.NEXT_PUBLIC_ADMIN_ID;
    if (id) {
      setAdminId(id);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!adminId) {
    return (
      <div className="text-center py-20 text-muted">
        Chat is currently unavailable. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <PageHeader
        title="Chat with Dr. Sudan Puri"
        subtitle="Ask your health questions directly."
      />
      <div className="h-[calc(100%-5rem)]">
        <ChatWindow
          receiverId={adminId}
          receiverName="Dr. Sudan Puri"
        />
      </div>
    </div>
  );
}