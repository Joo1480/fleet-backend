"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMachine } from "../services/machine.service";

type UseDeleteMachineOptions = {
  onSuccess?: () => void;
};

export function useDeleteMachine(options?: UseDeleteMachineOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMachine,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["machines"],
      });

      options?.onSuccess?.();
    },
  });
}