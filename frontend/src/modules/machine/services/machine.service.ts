import { api } from "@/shared/api/api";

import {
  CreateMachine,
  ListMachinesResponse,
  MachineFilters,
} from "../types/machine";

export async function listMachines(
  filters: MachineFilters,
): Promise<ListMachinesResponse> {
  const { data } = await api.get("/machines", {
    params: filters,
  });

  return data.machines;
}
export async function createMachine(machine: CreateMachine) {
  const { data } = await api.post("/machines", machine);

  return data;
}