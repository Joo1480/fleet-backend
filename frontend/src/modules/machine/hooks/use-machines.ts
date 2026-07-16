"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { getMachines } from "../services/machine.service";
import { MachineFilters } from "../types/machine";

export function useMachines(filters: MachineFilters) {
  return useQuery({
    queryKey: ["machines", filters],
    queryFn: () => getMachines(filters),
    placeholderData: keepPreviousData,
  });
}