"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Machine } from "../types/machine";
import { getMachineTypeLabel } from "../utils/machine-type";

type MachineTableProps = {
  machines: Machine[];
};

export function MachineTable({
  machines,
}: MachineTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[#f7f7f5]">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Código</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Nome</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Tipo</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Modelo</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Marca</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Ano</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Ações</th>
          </tr>
        </thead>

        <tbody>
          {machines.map((machine) => (
            <tr
              key={machine.id}
              className="border-t border-[var(--border)] hover:bg-gray-50"
            >
              <td className="px-4 py-3">{machine.code}</td>
              <td className="px-4 py-3">{machine.name}</td>
              <td className="px-4 py-3">{getMachineTypeLabel(machine.type)}</td>
              <td className="px-4 py-3">{machine.model}</td>
              <td className="px-4 py-3">{machine.brand}</td>
              <td className="px-4 py-3">{machine.year}</td>
              <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                        <button
                        className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
                        title="Editar"
                        >
                        <Pencil size={16} />
                        </button>

                        <button
                        className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
                        title="Excluir"
                        >
                        <Trash2 size={16} />
                        </button>
                    </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}