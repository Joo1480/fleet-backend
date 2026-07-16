"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMachine } from "../services/machine.service";

type UseCreateMachineOptions = {
  onSuccess?: () => void;
};

export function useCreateMachine(options?: UseCreateMachineOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMachine,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["machines"],
      });

      options?.onSuccess?.();
    },
  });
}