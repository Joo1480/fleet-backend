import { z } from "zod";

export const listMachinesSchema = z.object({
  search: z.string().trim().optional(),
  type: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
});

export type ListMachinesSchema = z.infer<typeof listMachinesSchema>;