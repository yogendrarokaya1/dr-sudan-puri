import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SocketProvider } from "@/context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dr. Sudan Puri — General Practitioner",
  description:
    "ECFMG Certified & DHA Licensed General Practitioner based in Dubai. Health articles, medical insights and direct consultation.",
  keywords: ["doctor", "general practitioner", "Dubai", "Nepal", "health", "medical"],
  authors: [{ name: "Dr. Sudan Puri" }],
  openGraph: {
    title: "Dr. Sudan Puri — General Practitioner",
    description: "ECFMG Certified & DHA Licensed GP based in Dubai",
    type: "website",
  },
};

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}