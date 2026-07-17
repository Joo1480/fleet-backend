export interface FleetSummary {
  activeMachines: number;
  totalHours: number;
  averageAvailability: number;
  averageEfficiency: number;
}

export interface MachineSummary {
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

export interface ChartSummary {
  date: string;

  effectiveHours: number;
  maneuverHours: number;
  displacementHours: number;
  waitingHours: number;
  maintenanceHours: number;
}

export interface SummaryResponse {
  summary: FleetSummary;
  machines: MachineSummary[];
  chart: ChartSummary[];
}