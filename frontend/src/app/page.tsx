"use client";

import { useMachines } from "@/modules/machine/hooks/use-machines";

export default function MachinesPage() {
  const result = useMachines({
    page: 1,
    pageSize: 10,
  });

  console.log(result);

  return (
    <div>
      <pre>{JSON.stringify({
        status: result.status,
        isPending: result.isPending,
        isLoading: result.isLoading,
        isFetching: result.isFetching,
        error: result.error,
      }, null, 2)}</pre>
    </div>
  );
}