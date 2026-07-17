import events from "../data/events.json";

import { prisma } from "../src/shared/prisma/client";

import { EVENT_GROUP_MAP } from "../src/shared/utils/event-group-map";

import type { EventSeed } from "../src/shared/types/event-seed";

export async function seedEvents() {
  const eventList: EventSeed[] = events;

  const machines = await prisma.machine.findMany({
    select: {
      code: true,
    },
  });

  const machineCodes = new Set(
    machines.map((machine) => machine.code),
  );

  let imported = 0;
  let skipped = 0;

  for (const event of eventList) {
    const eventGroup = EVENT_GROUP_MAP[event.eventGroup];

    const startTime = new Date(event.startTime);
    const endTime = event.endTime
      ? new Date(event.endTime)
      : null;

    if (!machineCodes.has(event.machineCode)) {
      console.warn(
        `Skipping event ${event.id}: machine ${event.machineCode} not found.`,
      );
      skipped++;
      continue;
    }

    if (!eventGroup) {
      console.warn(
        `Skipping event ${event.id}: invalid event group ${event.eventGroup}.`,
      );
      skipped++;
      continue;
    }

    if (endTime && startTime > endTime) {
      console.warn(
        `Skipping event ${event.id}: startTime is after endTime.`,
      );
      skipped++;
      continue;
    }

    try {
      const existingEvent = await prisma.event.findUnique({
        where: {
          id: event.id,
        },
      });

      if (existingEvent) {
        console.warn(
          `Skipping event ${event.id}: duplicate event.`,
        );

        skipped++;
        continue;
      }

      await prisma.event.create({
        data: {
          id: event.id,
          machineCode: event.machineCode,
          eventGroup,
          startTime,
          endTime,
        },
      });

      imported++;
    } catch (error) {
      console.warn(
        `Skipping event ${event.id}: ${
          error instanceof Error ? error.message : error
        }`,
      );

      skipped++;
    }
  }

  console.log(`✅ ${imported} events imported.`);
  console.log(`⚠️ ${skipped} events skipped.`);
}