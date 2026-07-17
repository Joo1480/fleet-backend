export interface FleetSummaryDto {
  activeMachines: number;
  totalHours: number;
  averageAvailability: number;
  averageEfficiency: number;
}

export interface MachineSummaryDto {
  code: string;
  name: string;
  type: string;

  effectiveHours: number;
  maneuverHours: number;
  displacementHours: number;
  waitingHours: number;
  maintenanceHours: number;

  totalHours: number;

  availability: number;
  efficiency: number;
}

export interface ChartSummaryDto {
  date: string;

  effectiveHours: number;
  maneuverHours: number;
  displacementHours: number;
  waitingHours: number;
  maintenanceHours: number;
}

export interface SummaryDto {
  summary: FleetSummaryDto;
  machines: MachineSummaryDto[];
  chart: ChartSummaryDto[];
}