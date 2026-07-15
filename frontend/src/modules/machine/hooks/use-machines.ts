"use client";

import { useQuery } from "@tanstack/react-query";

import { listMachines } from "../services/machine.service";
import { MachineFilters } from "../types/machine";

export function useMachines(filters: MachineFilters) {
  return useQuery({
    queryKey: ["machines", filters],
    queryFn: () => listMachines(filters),
  });
}