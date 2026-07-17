"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";

import { ChartSummary } from "../types/summary";

interface SummaryChartProps {
  chart: ChartSummary[];
}

export function SummaryChart({
  chart,
}: SummaryChartProps) {
  return (
    <Card className="rounded-xl border border-black/10 bg-[#fcfcfb] py-0 shadow-none">
      <div className="px-5 pt-4">
        <p className="text-base font-semibold text-[#0b0b0b]">
          Horas por grupo de evento
        </p>

        <p className="text-sm text-[#898781]">
          Frota inteira, por dia
        </p>
      </div>

      <div className="h-[380px] px-5 pb-5 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart}
          barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("pt-BR", {
                timeZone: "America/Sao_Paulo",
              })
            } />

            <YAxis />

            <Tooltip
              labelFormatter={(value) =>
                new Date(String(value)).toLocaleDateString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })
              }
            />

            <Legend />

            <Bar
              dataKey="effectiveHours"
              stackId="hours"
              name="Efetivo"
              fill="#2a78d6"
            />

            <Bar
              dataKey="maneuverHours"
              stackId="hours"
              name="Manobra"
              fill="#1baf7a"
            />

            <Bar
              dataKey="displacementHours"
              stackId="hours"
              name="Deslocamento"
              fill="#eda100"
            />

            <Bar
              dataKey="waitingHours"
              stackId="hours"
              name="Aguardando"
              fill="#008300"
            />

            <Bar
              dataKey="maintenanceHours"
              stackId="hours"
              name="Manutenção"
              fill="#4a3aa7"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}