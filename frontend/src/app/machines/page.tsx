"use client";

import { useMachines } from "@/modules/machine/hooks/use-machines";

export default function MachinesPage() {
  const { data, isLoading, error } = useMachines({
    page: 1,
    pageSize: 10,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar máquinas.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Máquinas
      </h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}