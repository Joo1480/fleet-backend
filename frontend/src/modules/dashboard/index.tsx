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
    <SummaryCards summary={data.summary} />
    <SummaryTable machines={data.machines} />
    <SummaryChart chart={data.chart} />
  </>
);
}