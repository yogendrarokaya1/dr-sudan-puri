"use client";

import Link from "next/link";
import { MessageSquare, User, BookOpen } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/shared/PageHeader";

const quickLinks = [
  {
    icon: <MessageSquare size={22} />,
    title: "Chat with Dr. Puri",
    description: "Send a message and get a response directly.",
    href: "/dashboard/user/chat",
    color: "bg-blue-50 text-primary",
  },
  {
    icon: <User size={22} />,
    title: "Update Profile",
    description: "Keep your medical profile up to date.",
    href: "/dashboard/user/profile",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Read Health Articles",
    description: "Browse the latest health articles by Dr. Puri.",
    href: "/blog",
    color: "bg-purple-50 text-purple-700",
  },
];

export default function UserDashboardPage() {
  const { user } = useAuthContext();

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Hello, ${user?.name ?? "there"} 👋`}
        subtitle="Welcome to your personal health dashboard."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Card key={link.title} hover padding="md" className="space-y-4">
            <div
              className={`w-12 h-12 rounded-sm flex items-center justify-center ${link.color}`}
            >
              {link.icon}
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-ink dark:text-white">
                {link.title}
              </h3>
              <p className="text-sm text-muted">{link.description}</p>
            </div>
            <Link href={link.href}>
              <Button variant="outline" size="sm">
                Go →
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}