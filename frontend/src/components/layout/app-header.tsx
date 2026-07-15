"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">

        <div className="font-bold">
          🚜 Analitica <span className="font-normal">Frota</span>
        </div>

        <nav className="flex gap-2">

          <Link
            href="/dashboard"
            className={`rounded-md px-3 py-2 text-sm transition ${
              pathname === "/dashboard"
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/machines"
            className={`rounded-md px-3 py-2 text-sm transition ${
              pathname === "/machines"
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            Máquinas
          </Link>

        </nav>

      </div>
    </header>
  );
}