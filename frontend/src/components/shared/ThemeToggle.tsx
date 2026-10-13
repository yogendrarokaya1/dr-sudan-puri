"use client";

import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";
import { cn } from "@/lib/utils/cn";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-sm transition-colors",
        "text-muted hover:text-primary hover:bg-primary/10",
        "dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};