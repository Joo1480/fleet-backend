"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 h-14 border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex h-full max-w-[1120px] items-center gap-6 px-6">
        <div className="text-[15px] font-bold tracking-[-0.01em] whitespace-nowrap">
          🚜 Analitica <span className="font-normal text-[var(--muted)]">· Frota</span>
        </div>

        <nav className="flex gap-1">
          <Link
            href="/dashboard"
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/dashboard"
                ? "bg-black/5 text-[var(--ink)]"
                : "text-[var(--ink-2)] hover:bg-black/5"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/machines"
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              pathname === "/machines"
                ? "bg-black/5 text-[var(--ink)]"
                : "text-[var(--ink-2)] hover:bg-black/5"
            }`}
          >
            Máquinas
          </Link>
        </nav>
      </div>
    </header>
  );
}