import { FleetSummary } from "../types/summary";

interface SummaryCardsProps {
  summary: FleetSummary;
}

export function SummaryCards({
  summary,
}: SummaryCardsProps) {
  return (
    <div>
      <div>{summary.activeMachines}</div>
      <div>{summary.totalHours}</div>
      <div>{summary.averageAvailability}</div>
      <div>{summary.averageEfficiency}</div>
    </div>
  );
}