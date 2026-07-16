import { z } from "zod";

export const createMachineSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Código é obrigatório"),

  name: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório"),

  type: z
    .string()
    .trim()
    .min(1, "Tipo é obrigatório"),

  model: z
    .string()
    .trim()
    .min(1, "Modelo é obrigatório"),

  brand: z
    .string()
    .trim()
    .min(1, "Marca é obrigatória"),

  year: z.coerce
    .number({
      invalid_type_error: "Ano é obrigatório",
    })
    .min(1900, "Ano inválido")
    .max(new Date().getFullYear() + 1, "Ano inválido"),
});

export type CreateMachineFormData = z.infer<
  typeof createMachineSchema
>;