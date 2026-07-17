import { EventGroup } from "@prisma/client";
import { findSummaryData } from "./summary.repository";

const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;

function calculateEventHours(
  startTime: Date,
  endTime: Date | null,
): number {
  if (!endTime) {
    return 0;
  }

  const milliseconds = endTime.getTime() - startTime.getTime();

  const hours = milliseconds / MILLISECONDS_PER_HOUR;

  return Number(hours.toFixed(2));
}

function groupEventsByMachine(
  events: Awaited<ReturnType<typeof findSummaryData>>,
) {
  const groupedEvents = new Map<
    string,
    Awaited<ReturnType<typeof findSummaryData>>
  >();

  for (const event of events) {
    const machineCode = event.machine.code;

    const machineEvents = groupedEvents.get(machineCode);

    if (machineEvents) {
      machineEvents.push(event);
      continue;
    }

    groupedEvents.set(machineCode, [event]);
  }

  return groupedEvents;
}

function calculateMachineSummary(
  events: Awaited<ReturnType<typeof findSummaryData>>,
) {
  const machine = events[0].machine;

  let effectiveHours = 0;
  let maneuverHours = 0;
  let displacementHours = 0;
  let waitingHours = 0;
  let maintenanceHours = 0;

  for (const event of events) {
    const hours = calculateEventHours(
      event.startTime,
      event.endTime,
    );

    switch (event.eventGroup) {
      case EventGroup.EFETIVO:
        effectiveHours += hours;
        break;

      case EventGroup.MANOBRA:
        maneuverHours += hours;
        break;

      case EventGroup.DESLOCAMENTO:
        displacementHours += hours;
        break;

      case EventGroup.AGUARDANDO:
        waitingHours += hours;
        break;

      case EventGroup.MANUTENCAO:
        maintenanceHours += hours;
        break;
    }
  }

    effectiveHours = Number(effectiveHours.toFixed(2));
    maneuverHours = Number(maneuverHours.toFixed(2));
    displacementHours = Number(displacementHours.toFixed(2));
    waitingHours = Number(waitingHours.toFixed(2));
    maintenanceHours = Number(maintenanceHours.toFixed(2));

  const totalHours = Number(
    (
      effectiveHours +
      maneuverHours +
      displacementHours +
      waitingHours +
      maintenanceHours
    ).toFixed(2),
  );

  const availability =
    totalHours === 0
        ? 0
        : Number(
            (
            ((totalHours - maintenanceHours) / totalHours) *
            100
            ).toFixed(2),
        );

   const efficiency =
    totalHours === 0
        ? 0
        : Number(
            (
            (effectiveHours / totalHours) *
            100
            ).toFixed(2),
        );
  return {
    code: machine.code,
    name: machine.name,
    type: machine.type,

    effectiveHours,
    maneuverHours,
    displacementHours,
    waitingHours,
    maintenanceHours,

    totalHours,

    availability,
    efficiency,
  };
}


export async function getSummary(
  from: Date,
  to: Date,
) {
  const events = await findSummaryData(from, to);

  const groupedEvents = groupEventsByMachine(events);

  return [...groupedEvents.values()].map(
    calculateMachineSummary,
  );
}