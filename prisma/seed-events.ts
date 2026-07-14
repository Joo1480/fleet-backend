import events from "../data/events.json";

import { EventGroup } from "@prisma/client";

import { prisma } from "../src/shared/prisma/client";

import { EVENT_GROUP_MAP } from "../src/shared/utils/event-group-map";

import type { EventSeed } from "../src/shared/types/event-seed";

export async function seedEvents() {
  const eventList: EventSeed[] = events;

  const machines = await prisma.machine.findMany({
    select: {
      id: true,
      code: true,
    },
  });

  const machineMap = new Map(
    machines.map((machine) => [machine.code, machine.id]),
  );

  const eventData = eventList
    .map((event) => {
      const machineId = machineMap.get(event.machineCode);
      const eventGroup = EVENT_GROUP_MAP[event.eventGroup];

      const startTime = new Date(event.startTime);
      const endTime = event.endTime
        ? new Date(event.endTime)
        : null;

      if (!machineId) {
        console.warn(
          `Skipping event ${event.id}: machine ${event.machineCode} not found.`,
        );
        return null;
      }

      if (!eventGroup) {
        console.warn(
          `Skipping event ${event.id}: invalid event group ${event.eventGroup}.`,
        );
        return null;
      }

      if (endTime && startTime > endTime) {
        console.warn(
          `Skipping event ${event.id}: startTime is after endTime.`,
        );
        return null;
      }

      return {
        machineId,
        eventGroup,
        startTime,
        endTime,
      };
    })
    .filter(
      (event): event is NonNullable<typeof event> => event !== null,
    );

  await prisma.event.createMany({
    data: eventData,
  });

  console.log(`✅ ${eventData.length} events imported.`);
}