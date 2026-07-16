"use client";

import { Search, Plus } from "lucide-react";
import { MACHINE_TYPES } from "../utils/machine-type";

type MachineToolbarProps = {
  search: string;
  type: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onCreate: () => void;
};

export function MachineToolbar({
  search,
  type,
  onSearchChange,
  onTypeChange,
  onCreate,
}: MachineToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
      <div className="flex items-center gap-3">
        {/* Campo de busca */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />

          <input
            type="text"
            placeholder="Buscar máquina..."
             value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-72 rounded-lg border border-[var(--border)] bg-white pl-10 pr-3 text-sm outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
          />
        </div>

        {/* Filtro */}
        <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="h-10 min-w-[180px] rounded-lg border border-[var(--border)] bg-white px-3 text-sm outline-none transition focus:border-black/20 focus:ring-2 focus:ring-black/5"
            >
            <option value="">Todos os tipos</option>

            {MACHINE_TYPES.map((machineType) => (
                <option
                key={machineType.value}
                value={machineType.value}
                >
                {machineType.label}
                </option>
            ))}
        </select>
      </div>

      {/* Botão */}
      <button 
      onClick={onCreate}
      className="flex h-10 items-center gap-2 rounded-lg bg-black px-4 text-sm font-medium text-white transition hover:bg-neutral-800">
        <Plus size={16} />
        Nova máquina
      </button>
    </div>
  );
}