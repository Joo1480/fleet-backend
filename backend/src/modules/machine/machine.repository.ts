import { Prisma } from "@prisma/client";

import { prisma } from "../../shared/prisma/client";

import type { ListMachinesSchema } from "./machine.schema";

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