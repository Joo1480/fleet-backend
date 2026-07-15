import { api } from "@/shared/api/api";

import {
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