"use client";

import { useState } from "react";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { MessageSquare } from "lucide-react";

export default function AdminChatPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <PageHeader
        title="Chat Inbox"
        subtitle="Respond to messages from your patients and visitors."
      />

      {selectedUserId ? (
        <div className="h-[calc(100%-5rem)]">
          <ChatWindow
            receiverId={selectedUserId}
            receiverName="User"
          />
        </div>
      ) : (
        <EmptyState
          icon={<MessageSquare size={24} />}
          title="No conversation selected"
          description="Select a conversation from the list to start chatting."
        />
      )}
    </div>
  );
}