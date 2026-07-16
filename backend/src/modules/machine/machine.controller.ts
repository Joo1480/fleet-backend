import { Request, Response } from "express";

import {
  createMachineSchema,
  listMachinesSchema,
  updateMachineSchema,
} from "./machine.schema";

import {
  createMachine as createMachineService,
  getMachines,
  updateMachine as updateMachineService,
  deleteMachine as deleteMachineService,
} from "./machine.service";

export async function listMachines(
  request: Request,
  response: Response,
) {
  const filters = listMachinesSchema.parse(request.query);

  const machines = await getMachines(filters);

  return response.json({ machines });
}

export async function createMachine(
  request: Request,
  response: Response,
) {
  const machine = createMachineSchema.parse(request.body);

  try {
  const createdMachine = await createMachineService(machine);

  return response.status(201).json(createdMachine);
  } catch (error: any) {
    if (error.code === "P2002") {
      return response.status(409).json({
        message: "Já existe uma máquina com este código.",
      });
    }

    throw error;
  }
}

export async function updateMachine(
  request: Request,
  response: Response,
) {

  const { code } = request.params;
  const machine = updateMachineSchema.parse(request.body);  

  const updatedMachine = await updateMachineService(
    code,
    machine,
  );

  return response.json(updatedMachine);
}

export async function deleteMachine(
  request: Request,
  response: Response,
) {
  const { code } = request.params;

  await deleteMachineService(code);

  return response.status(204).send();
}