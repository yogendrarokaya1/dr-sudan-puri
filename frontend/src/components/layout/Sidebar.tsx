"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Mail,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuthContext } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/Avatar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const adminLinks = [
  { label: "Dashboard",  href: "/dashboard/admin",          icon: LayoutDashboard },
  { label: "Blogs",      href: "/dashboard/admin/blogs",    icon: FileText },
  { label: "Contacts",   href: "/dashboard/admin/contacts", icon: Mail },
  { label: "Chat",       href: "/dashboard/admin/chat",     icon: MessageSquare },
];

const userLinks = [
  { label: "Dashboard",  href: "/dashboard/user",           icon: LayoutDashboard },
  { label: "Chat",       href: "/dashboard/user/chat",      icon: MessageSquare },
  { label: "Profile",    href: "/dashboard/user/profile",   icon: User },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuthContext();
  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">

      {/* ── User Info ──────────────────────────────── */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar name={user?.name} size="md" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-ink dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-muted capitalize">{user?.role}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* ── Nav Links ──────────────────────────────── */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-primary/5 hover:text-primary dark:hover:bg-white/5 dark:hover:text-white"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* ── Logout ─────────────────────────────────── */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-sm text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};