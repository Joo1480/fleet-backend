"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createMachine } from "../services/machine.service";

export function useCreateMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMachine,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["machines"],
      });
    },
  });
}