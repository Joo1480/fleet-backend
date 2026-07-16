import { api } from "@/shared/api/api";

import {
  CreateMachine,
  ListMachinesResponse,
  MachineFilters,
} from "../types/machine";

export async function getMachines(
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

export async function updateMachine(
  code: string,
  machine: CreateMachine,
) {
  const { data } = await api.put(
    `/machines/${code}`,
    machine,
  );

  return data;
}

export async function deleteMachine(code: string) {
  await api.delete(`/machines/${code}`);
}