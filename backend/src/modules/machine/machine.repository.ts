import { Prisma } from "@prisma/client";

import { prisma } from "../../shared/prisma/client";

import type {
  CreateMachineSchema,
  ListMachinesSchema,
  UpdateMachineSchema,
} from "./machine.schema";


export async function findMachines(filters: ListMachinesSchema) {
  const { search, type, page, pageSize } = filters;

  const where: Prisma.MachineWhereInput = {
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        code: {
          contains: search,
        },
      },
    ];
  }

  if (type) {
    where.type = type;
  }

  const [machines, total] = await prisma.$transaction([
    prisma.machine.findMany({
      where,
      orderBy: {
        name: "asc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),

    prisma.machine.count({
      where,
    }),
  ]);

  return {
    machines,
    total,
  };
}

export async function createMachine(
  machine: CreateMachineSchema,
) {
  return prisma.machine.create({
    data: {
      code: machine.code,
      name: machine.name,
      type: machine.type,
      model: machine.model,
      brand: machine.brand,
      year: machine.year,
    },
  });
}

export async function updateMachine(
  code: string,
  machine: UpdateMachineSchema,
) {
  return prisma.machine.update({
    where: {
      code,
    },
    data: {
      name: machine.name,
      type: machine.type,
      model: machine.model,
      brand: machine.brand,
      year: machine.year,

      // Só atualize o code se a regra de negócio permitir.
      code: machine.code,
    },
  });
}

export async function deleteMachine(code: string) {
  return prisma.machine.update({
    where: {
      code,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}