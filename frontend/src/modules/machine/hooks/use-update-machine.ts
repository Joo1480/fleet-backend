"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateMachine } from "../services/machine.service";
import { CreateMachine } from "../types/machine";

type UseUpdateMachineOptions = {
  onSuccess?: () => void;
};

type UpdateMachineParams = {
  code: string;
  machine: CreateMachine;
};

export function useUpdateMachine(options?: UseUpdateMachineOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ code, machine }: UpdateMachineParams) =>
      updateMachine(code, machine),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["machines"],
      });

      options?.onSuccess?.();
    },
  });
}