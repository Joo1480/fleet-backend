import { findMachines } from "./machine.repository";
import { toMachineDto } from "./machine.mapper";

import { MachineFilters } from "./machine.types";

export async function getMachines(
  filters: MachineFilters,
) {
  const machines = await findMachines(filters);

  return machines.map(toMachineDto);
}