import { ChartSummary } from "../types/summary";

interface SummaryChartProps {
  chart: ChartSummary[];
}

export function SummaryChart({
  chart,
}: SummaryChartProps) {
  return (
    <pre>
      {JSON.stringify(chart, null, 2)}
    </pre>
  );
}