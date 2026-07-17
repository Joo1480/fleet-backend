"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SummaryCards } from "./components/summary-cards";
import { SummaryChart } from "./components/summary-chart";
import { SummaryTable } from "./components/summary-table";
import { useSummary } from "./hooks/use-summary";

const DEFAULT_FROM = "2026-06-01";
const DEFAULT_TO = "2026-06-07";

export default function Dashboard() {
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [to, setTo] = useState(DEFAULT_TO);

  const [filters, setFilters] = useState({
    from: `${DEFAULT_FROM}T00:00:00.000Z`,
    to: `${DEFAULT_TO}T23:59:59.999Z`,
  });

  const { data, isLoading, isError } = useSummary(filters);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error loading dashboard.</p>;
  }

  function handleApplyFilters() {
    setFilters({
      from: `${from}T00:00:00.000Z`,
      to: `${to}T23:59:59.999Z`,
    });
  }

  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard da frota</h1>

          <p className="text-sm text-muted-foreground">
            Indicadores do período selecionado
          </p>
        </div>

        <div className="flex items-end gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              From
            </label>

            <Input
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              To
            </label>

            <Input
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
            />
          </div>

          <Button onClick={handleApplyFilters}>
            Apply
          </Button>
        </div>
      </div>

      <SummaryCards summary={data.summary} />

      <SummaryChart chart={data.chart} />

      <SummaryTable machines={data.machines} />
    </>
  );
}