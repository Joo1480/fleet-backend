import { Card } from "@/components/ui/card";

import { FleetSummary } from "../types/summary";

interface SummaryCardsProps {
  summary: FleetSummary;
}

export function SummaryCards({
  summary,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Máquinas ativas",
      value: summary.activeMachines,
      description: "Máquinas no período",
    },
    {
      title: "Horas totais",
      value: `${summary.totalHours.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} h`,
      description: "No período",
    },
    {
      title: "Disponibilidade média",
      value: `${summary.averageAvailability.toFixed(1)}%`,
      description: "(total − manutenção) ÷ total",
    },
    {
      title: "Eficiência média",
      value: `${summary.averageEfficiency.toFixed(1)}%`,
      description: "efetivo ÷ total",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="rounded-xl border border-black/10 bg-[#fcfcfb] py-0 shadow-none"
        >
          <div className="px-5 pt-4">
            <p className="text-xs font-medium text-[#898781]">
              {card.title}
            </p>
          </div>

          <div className="px-5 pb-5 pt-1">
            <p className="text-[32px] font-bold leading-none tracking-[-0.02em] text-[#0b0b0b]">
              {card.value}
            </p>

            <p className="mt-2 text-xs text-[#898781]">
              {card.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}