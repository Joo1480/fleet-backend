import { Machine } from "@prisma/client";
import { MachineResponseDto } from "./machine.dto";

export function toMachineDto(
  machine: Machine,
): MachineResponseDto {
  return {
    id: machine.id,
    code: machine.code,
    name: machine.name,
    type: machine.type,
    model: machine.model,
    brand: machine.brand,
    year: machine.year,
  };
}