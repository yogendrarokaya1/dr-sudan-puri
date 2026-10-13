"use client";

import { useEffect, useState } from "react";
import { contactApi, IContact } from "@/lib/api/contact.api";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDateTime } from "@/lib/utils/format";
import { Mail } from "lucide-react";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactApi.getAll();
        setContacts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchContacts();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await contactApi.markAsRead(id);
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isRead: true } : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contact Messages"
        subtitle="Messages received from your website contact form."
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : contacts.length === 0 ? (
        <EmptyState
          icon={<Mail size={24} />}
          title="No messages yet"
          description="Contact form submissions will appear here."
        />
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card
              key={contact._id}
              padding="md"
              className={`space-y-3 ${
                !contact.isRead ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-ink dark:text-white">
                      {contact.name}
                    </p>
                    {!contact.isRead && (
                      <Badge variant="info" size="sm">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted">{contact.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted">
                    {formatDateTime(contact.createdAt)}
                  </span>
                  {!contact.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkRead(contact._id)}
                    >
                      Mark Read
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-ink dark:text-white">
                  {contact.subject}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {contact.message}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}