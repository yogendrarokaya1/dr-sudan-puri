/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // The inline script in layout.tsx already applied the right class
    // before hydration (to avoid a flash) — just sync state to match it.
    const initialTheme: Theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};