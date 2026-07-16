import { Request, Response } from "express";

import {
  createMachineSchema,
  listMachinesSchema,
} from "./machine.schema";

import {
  createMachine as createMachineService,
  getMachines,
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

  const createdMachine = await createMachineService(machine);

  return response.status(201).json(createdMachine);
}