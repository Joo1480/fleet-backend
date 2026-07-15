"use client";

import { useMachines } from "../hooks/use-machines";

export function MachineTable() {
  const { data, isPending, error } = useMachines({
    page: 1,
    pageSize: 10,
  });

  if (isPending) {
    return <p>Carregando...</p>;
  }

  if (error || !data) {
    return <p>Erro ao carregar máquinas.</p>;
  }

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
          </tr>
        </thead>

        <tbody>
          {data.data.map((machine) => (
            <tr
              key={machine.id}
              className="border-t border-[var(--border)] hover:bg-gray-50"
            >
              <td className="px-4 py-3">{machine.code}</td>
              <td className="px-4 py-3">{machine.name}</td>
              <td className="px-4 py-3 capitalize">{machine.type}</td>
              <td className="px-4 py-3">{machine.model}</td>
              <td className="px-4 py-3">{machine.brand}</td>
              <td className="px-4 py-3">{machine.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}