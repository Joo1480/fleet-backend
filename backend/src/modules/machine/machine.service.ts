import {
  createMachine as createMachineRepository,
  findMachines,
} from "./machine.repository";

import { toMachineDto } from "./machine.mapper";

import type {
  CreateMachineSchema,
  ListMachinesSchema,
} from "./machine.schema";

export async function getMachines(filters: ListMachinesSchema) {
  const { machines, total } = await findMachines(filters);

  return {
    data: machines.map(toMachineDto),
    pagination: {
      page: filters.page,
      pageSize: filters.pageSize,
      total,
    },
  };
}

export async function createMachine(
  machine: CreateMachineSchema,
) {
  const createdMachine =
    await createMachineRepository(machine);

  return toMachineDto(createdMachine);
}