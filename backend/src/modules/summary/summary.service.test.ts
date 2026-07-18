import { describe, expect, it } from "vitest";

import { EventGroup } from "@prisma/client";

import {
  calculateChartData,
  calculateEventHours,
  calculateFleetSummary,
  calculateMachineSummary,
} from "./summary.service";

describe("calculateEventHours", () => {
  it("should calculate the duration in hours", () => {
    const start = new Date("2026-06-01T08:00:00Z");
    const end = new Date("2026-06-01T10:00:00Z");

    const result = calculateEventHours(start, end);

    expect(result).toBe(2);
  });

  it("should return 0 when endTime is null", () => {
    const start = new Date("2026-06-01T08:00:00Z");

    const result = calculateEventHours(start, null);

    expect(result).toBe(0);
  });

  it("should return 0 when endTime is before startTime", () => {
    const start = new Date("2026-06-01T10:00:00Z");
    const end = new Date("2026-06-01T08:00:00Z");

    const result = calculateEventHours(start, end);

    expect(result).toBe(0);
  });
});

describe("calculateFleetSummary", () => {
  it("should calculate the fleet indicators", () => {
    const machines = [
      {
        code: "6001",
        name: "Machine 1",
        type: "HARVESTER",

        effectiveHours: 8,
        maneuverHours: 1,
        displacementHours: 1,
        waitingHours: 0,
        maintenanceHours: 2,

        totalHours: 12,

        availability: 83.33,
        efficiency: 66.67,
      },
      {
        code: "6002",
        name: "Machine 2",
        type: "HARVESTER",

        effectiveHours: 6,
        maneuverHours: 2,
        displacementHours: 1,
        waitingHours: 1,
        maintenanceHours: 2,

        totalHours: 12,

        availability: 83.33,
        efficiency: 50,
      },
    ];

    const result = calculateFleetSummary(machines);

    expect(result).toEqual({
      activeMachines: 2,
      totalHours: 24,
      averageAvailability: 83.33,
      averageEfficiency: 58.34,
    });
  });

  it("should return zeros when there are no machines", () => {
    const result = calculateFleetSummary([]);

    expect(result).toEqual({
      activeMachines: 0,
      totalHours: 0,
      averageAvailability: 0,
      averageEfficiency: 0,
    });
  });
});

describe("calculateMachineSummary", () => {
  it("should calculate machine indicators", () => {
    const events = [
      {
        eventGroup: EventGroup.EFETIVO,
        startTime: new Date("2026-06-01T08:00:00Z"),
        endTime: new Date("2026-06-01T12:00:00Z"),
        machine: {
          code: "6001",
          name: "Machine 6001",
          type: "HARVESTER",
        },
      },
      {
        eventGroup: EventGroup.MANUTENCAO,
        startTime: new Date("2026-06-01T13:00:00Z"),
        endTime: new Date("2026-06-01T15:00:00Z"),
        machine: {
          code: "6001",
          name: "Machine 6001",
          type: "HARVESTER",
        },
      },
    ];

    const result = calculateMachineSummary(events);

    expect(result).toEqual({
      code: "6001",
      name: "Machine 6001",
      type: "HARVESTER",

      effectiveHours: 4,
      maneuverHours: 0,
      displacementHours: 0,
      waitingHours: 0,
      maintenanceHours: 2,

      totalHours: 6,

      availability: 66.67,
      efficiency: 66.67,
    });
  });
});

describe("calculateChartData", () => {
  it("should group events by day and event group", () => {
    const events = [
      {
        eventGroup: EventGroup.EFETIVO,
        startTime: new Date("2026-06-01T08:00:00Z"),
        endTime: new Date("2026-06-01T10:00:00Z"),
        machine: {
          code: "6001",
          name: "Machine 6001",
          type: "Harvester",
        },
      },
      {
        eventGroup: EventGroup.MANUTENCAO,
        startTime: new Date("2026-06-01T10:00:00Z"),
        endTime: new Date("2026-06-01T11:30:00Z"),
        machine: {
          code: "6001",
          name: "Machine 6001",
          type: "Harvester",
        },
      },
      {
        eventGroup: EventGroup.EFETIVO,
        startTime: new Date("2026-06-02T08:00:00Z"),
        endTime: new Date("2026-06-02T09:00:00Z"),
        machine: {
          code: "6001",
          name: "Machine 6001",
          type: "Harvester",
        },
      },
    ];

    const result = calculateChartData(events);

    expect(result).toEqual([
      {
        date: "2026-06-01",
        effectiveHours: 2,
        maneuverHours: 0,
        displacementHours: 0,
        waitingHours: 0,
        maintenanceHours: 1.5,
      },
      {
        date: "2026-06-02",
        effectiveHours: 1,
        maneuverHours: 0,
        displacementHours: 0,
        waitingHours: 0,
        maintenanceHours: 0,
      },
    ]);
  });
});