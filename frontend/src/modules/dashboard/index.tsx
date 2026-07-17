"use client";
import { useSummary } from "./hooks/use-summary";
import { SummaryCards } from "./components/summary-cards";
import { SummaryTable } from "./components/summary-table";
import { SummaryChart } from "./components/summary-chart";

const DEFAULT_FROM = "2026-06-01T00:00:00.000Z";
const DEFAULT_TO = "2026-06-07T23:59:59.999Z";

export default function Dashboard() {
  const { data, isLoading, isError } = useSummary({
    from: DEFAULT_FROM,
    to: DEFAULT_TO,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error loading dashboard.</p>;
  }

  return (
  <>
  <div className="flex items-center justify-between">
    <div>
      <h1><strong>Dashboard da frota</strong></h1>
      <p>Indicadores do período selecionado</p>
    </div>

    {/* Por enquanto pode ser um select estático */}
    <select>
      <option>01/06/2026 – 07/06/2026</option>
    </select>
  </div>

  <SummaryCards summary={data.summary} />

  <SummaryChart chart={data.chart} />

  <SummaryTable machines={data.machines} />
</>
);
}