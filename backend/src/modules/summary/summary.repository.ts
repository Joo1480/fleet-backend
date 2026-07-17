import { prisma } from "../../shared/prisma/client";

export function findSummaryData(
  from: Date,
  to: Date,
) {
  return prisma.event.findMany({
    where: {
      deletedAt: null,
      startTime: {
        gte: from,
        lte: to,
      },
    },
    select: {
      eventGroup: true,
      startTime: true,
      endTime: true,
      machine: {
        select: {
          code: true,
          name: true,
          type: true,
        },
      },
    },
  });
}