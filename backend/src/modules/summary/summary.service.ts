import { EventGroup } from "@prisma/client";
import { findSummaryData } from "./summary.repository";
import {
  SummaryDto,
  ChartSummaryDto,
  FleetSummaryDto,
  MachineSummaryDto,
} from "./summary.dto";

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
): Map<
  string,
  Awaited<ReturnType<typeof findSummaryData>>
> {
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
): MachineSummaryDto {
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

function calculateFleetSummary(
  machines: MachineSummaryDto[],
): FleetSummaryDto {
  const activeMachines = machines.length;

  const totalHours = Number(
    machines
      .reduce(
        (total, machine) => total + machine.totalHours,
        0,
      )
      .toFixed(2),
  );

  const averageAvailability =
    activeMachines === 0
      ? 0
      : Number(
          (
            machines.reduce(
              (total, machine) =>
                total + machine.availability,
              0,
            ) / activeMachines
          ).toFixed(2),
        );

  const averageEfficiency =
    activeMachines === 0
      ? 0
      : Number(
          (
            machines.reduce(
              (total, machine) =>
                total + machine.efficiency,
              0,
            ) / activeMachines
          ).toFixed(2),
        );

  return {
    activeMachines,
    totalHours,
    averageAvailability,
    averageEfficiency,
  };
}

function calculateChartData(
  events: Awaited<ReturnType<typeof findSummaryData>>,
): ChartSummaryDto[] {
  const chartData = new Map<string, ChartSummaryDto>();

  for (const event of events) {
    const date = event.startTime
      .toISOString()
      .split("T")[0];

    if (!chartData.has(date)) {
      chartData.set(date, {
        date,
        effectiveHours: 0,
        maneuverHours: 0,
        displacementHours: 0,
        waitingHours: 0,
        maintenanceHours: 0,
      });
    }

    const day = chartData.get(date);

    if (!day) {
    continue;
    }

    const hours = calculateEventHours(
      event.startTime,
      event.endTime,
    );

    switch (event.eventGroup) {
      case EventGroup.EFETIVO:
        day.effectiveHours += hours;
        break;

      case EventGroup.MANOBRA:
        day.maneuverHours += hours;
        break;

      case EventGroup.DESLOCAMENTO:
        day.displacementHours += hours;
        break;

      case EventGroup.AGUARDANDO:
        day.waitingHours += hours;
        break;

      case EventGroup.MANUTENCAO:
        day.maintenanceHours += hours;
        break;
    }
  }

  return [...chartData.values()].map((day) => ({
    ...day,
    effectiveHours: Number(day.effectiveHours.toFixed(2)),
    maneuverHours: Number(day.maneuverHours.toFixed(2)),
    displacementHours: Number(day.displacementHours.toFixed(2)),
    waitingHours: Number(day.waitingHours.toFixed(2)),
    maintenanceHours: Number(day.maintenanceHours.toFixed(2)),
  }));
}

export async function getSummary(
  from: Date,
  to: Date,
): Promise<SummaryDto> {
  const events = await findSummaryData(from, to);

  const groupedEvents = groupEventsByMachine(events);

  const machines = [...groupedEvents.values()].map(calculateMachineSummary);

  machines.sort((a, b) => a.code.localeCompare(b.code));

  const summary = calculateFleetSummary(machines,);
  const chart = calculateChartData(events);
  chart.sort((a, b) => a.date.localeCompare(b.date));

    return {
    summary,
    machines,
    chart,
    };
}