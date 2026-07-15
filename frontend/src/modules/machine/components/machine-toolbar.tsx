"use client";

export function MachineToolbar() {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] p-4">
      <div className="flex items-center gap-3">
        <input
          placeholder="Buscar máquina..."
          className="h-10 w-72 rounded-lg border border-[var(--border)] px-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />

        <select className="h-10 rounded-lg border border-[var(--border)] px-3 text-sm">
          <option>Todos os tipos</option>
          <option>Colhedora</option>
          <option>Trator</option>
          <option>Caminhão</option>
        </select>
      </div>

      <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
        + Nova máquina
      </button>
    </div>
  );
}