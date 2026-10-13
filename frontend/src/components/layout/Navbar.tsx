"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuthContext } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-sm flex items-center justify-center">
              <Stethoscope size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-primary dark:text-white leading-tight">
                Dr. Sudan Puri
              </p>
              <p className="text-xs text-muted leading-tight">
                General Practitioner
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav Links ─────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-sm",
                  pathname === link.href
                    ? "text-primary bg-primary/10 dark:text-white dark:bg-white/10"
                    : "text-muted hover:text-primary hover:bg-primary/5 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Auth Buttons ──────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                >
                  <Avatar name={user?.name} size="sm" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Controls ───────────────────── */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────── */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "block px-4 py-2.5 text-sm font-medium rounded-sm transition-colors",
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted hover:text-primary hover:bg-primary/5"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};