import { z } from "zod";

export const listMachinesSchema = z.object({
  search: z.string().trim().optional(),
  type: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
});

const machineSchema = z.object({
  code: z.string().trim().min(1),
  name: z.string().trim().min(1),
  type: z.string().trim().min(1),
  model: z.string().trim().min(1),
  brand: z.string().trim().min(1),
  year: z.number().int().min(1900),
});

export const createMachineSchema = machineSchema;

export const updateMachineSchema = machineSchema;

export type ListMachinesSchema = z.infer<typeof listMachinesSchema>;
export type CreateMachineSchema = z.infer<typeof createMachineSchema>;
export type UpdateMachineSchema = z.infer<typeof updateMachineSchema>;