import { prisma } from "../../shared/prisma/client";
import { Prisma } from "@prisma/client";

import { MachineFilters } from "./machine.types";

export async function findMachines(
  filters: MachineFilters,
) {
  const where: Prisma.MachineWhereInput = {
    deletedAt: null,
  };

  if (filters.search) {
    where.OR = [
      {
        name: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
      {
        code: {
          contains: filters.search,
        },
      },
    ];
  }

  if (filters.type) {
    where.type = filters.type;
  }

  return prisma.machine.findMany({
    where,
    orderBy: {
      name: "asc",
    },
  });
}