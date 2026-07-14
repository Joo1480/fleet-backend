import { Request, Response } from "express";

import { listMachinesSchema } from "./machine.schema";
import { getMachines } from "./machine.service";

export async function listMachines(
  request: Request,
  response: Response,
) {
  const filters = listMachinesSchema.parse(request.query);

  const machines = await getMachines(filters);

  return response.json({ machines });
}