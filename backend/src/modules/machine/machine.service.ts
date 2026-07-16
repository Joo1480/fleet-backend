import {
  createMachine as createMachineRepository,
  findMachines,
  updateMachine as updateMachineRepository,
} from "./machine.repository";

import { toMachineDto } from "./machine.mapper";

import type {
  CreateMachineSchema,
  ListMachinesSchema,
  UpdateMachineSchema,
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

export async function updateMachine(
  code: string,
  machine: UpdateMachineSchema,
) {
  const updatedMachine = await updateMachineRepository(
    code,
    machine,
  );

  return toMachineDto(updatedMachine);
}