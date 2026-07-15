"use client";

import { MachineTable } from "./machine-table";
import { MachineToolbar } from "./machine-toolbar";

export function MachineList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Máquinas</h1>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Gerencie sua frota de máquinas
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
        <MachineToolbar />

        <MachineTable />
      </div>
    </div>
  );
}