import { z } from "zod";

export const listMachinesSchema = z.object({
  search: z.string().trim().optional(),
  type: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
});

export const createMachineSchema = z.object({
  code: z.string().trim().min(1),
  name: z.string().trim().min(1),
  type: z.string().trim().min(1),
  model: z.string().trim().min(1),
  brand: z.string().trim().min(1),
  year: z.number().int().min(1900),
});

export type ListMachinesSchema = z.infer<typeof listMachinesSchema>;
export type CreateMachineSchema = z.infer<typeof createMachineSchema>;