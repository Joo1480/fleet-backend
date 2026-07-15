import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { QueryProvider } from "@/shared/providers/query-provider";
import { AppShell } from "@/components/layout/app-shell";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fleet Monitor",
  description: "Fleet Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <QueryProvider>
          <AppShell>
            {children}
          </AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}