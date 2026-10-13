"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type Language = "en" | "ne";

interface LanguageToggleProps {
  onChange?: (lang: Language) => void;
  className?: string;
}

export const LanguageToggle = ({ onChange, className }: LanguageToggleProps) => {
  const [active, setActive] = useState<Language>("en");

  const handleChange = (lang: Language) => {
    setActive(lang);
    onChange?.(lang);
  };

  return (
    <div
      className={cn(
        "flex rounded-sm border border-gray-200 dark:border-gray-700 overflow-hidden text-sm",
        className
      )}
    >
      {(["en", "ne"] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => handleChange(lang)}
          className={cn(
            "px-3 py-1.5 font-medium transition-colors",
            active === lang
              ? "bg-primary text-white"
              : "text-muted hover:bg-gray-50 dark:hover:bg-gray-800"
          )}
        >
          {lang === "en" ? "EN" : "NE"}
        </button>
      ))}
    </div>
  );
};