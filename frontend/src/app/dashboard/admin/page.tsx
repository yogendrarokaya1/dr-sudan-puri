"use client";

import { useEffect, useState } from "react";
import { FileText, Mail, MessageSquare, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { useAuthContext } from "@/context/AuthContext";
import { blogApi } from "@/lib/api/blog.api";
import { contactApi } from "@/lib/api/contact.api";

interface Stats {
  blogs: number;
  contacts: number;
  unread: number;
}

export default function AdminDashboardPage() {
  const { user } = useAuthContext();
  const [stats, setStats] = useState<Stats>({ blogs: 0, contacts: 0, unread: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, contactsRes] = await Promise.all([
          blogApi.getAll({ limit: 1 }),
          contactApi.getAll(),
        ]);
        const unread = contactsRes.filter((c) => !c.isRead).length;
        setStats({
          blogs: blogsRes.pagination.total,
          contacts: contactsRes.length,
          unread,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Blogs",
      value: stats.blogs,
      icon: <FileText size={22} />,
      color: "bg-blue-50 text-primary",
    },
    {
      label: "Total Messages",
      value: stats.contacts,
      icon: <Mail size={22} />,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Unread Messages",
      value: stats.unread,
      icon: <MessageSquare size={22} />,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "Active Chats",
      value: "—",
      icon: <Users size={22} />,
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${user?.name ?? "Doctor"} 👋`}
        subtitle="Here's an overview of your personal website activity."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} padding="md" className="space-y-4">
            <div
              className={`w-12 h-12 rounded-sm flex items-center justify-center ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-ink dark:text-white">
                {isLoading ? "..." : stat.value}
              </p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}