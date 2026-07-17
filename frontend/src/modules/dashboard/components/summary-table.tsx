import { Card } from "@/components/ui/card";

import { MachineSummary } from "../types/summary";
import { getMachineTypeLabel } from "../utils/machine-types";

interface SummaryTableProps {
  machines: MachineSummary[];
}
function getAvailabilityStyle(value: number) {
  if (value >= 80) {
    return {
      icon: "●",
      className:
        "bg-green-50 text-green-700",
    };
  }

  if (value >= 70) {
    return {
      icon: "▲",
      className:
        "bg-yellow-50 text-yellow-700",
    };
  }

  return {
    icon: "✕",
    className:
      "bg-red-50 text-red-700",
  };
}
function formatHours(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function SummaryTable({
  machines,
}: SummaryTableProps) {
  return (
    <Card className="rounded-xl border border-black/10 bg-[#fcfcfb] py-0 shadow-none">
      <div className="px-5 pt-4">
        <p className="text-base font-semibold text-[#0b0b0b]">
          Indicadores por máquina
        </p>
      </div>

      <div className="overflow-x-auto px-5 pb-5 pt-4">
        <table className="w-full">
          <thead className="border-b border-black/10">
            <tr className="text-left text-sm font-medium text-[#898781]">
              <th className="pb-3">Máquina</th>
              <th className="pb-3">Tipo</th>
              <th className="pb-3 text-right">Efetivo (h)</th>
              <th className="pb-3 text-right">Manobra (h)</th>
              <th className="pb-3 text-right">Desloc. (h)</th>
              <th className="pb-3 text-right">Aguard. (h)</th>
              <th className="pb-3 text-right">Manut. (h)</th>
              <th className="pb-3 text-right">Total (h)</th>
              <th className="pb-3 text-right">Disponibilidade</th>
              <th className="pb-3 text-right">Eficiência</th>
            </tr>
          </thead>

          <tbody>
            {machines.map((machine) => (
              <tr
                key={machine.code}
                className="border-b border-black/10 text-sm hover:bg-black/5"
              >
                <td className="py-4 font-medium text-[#0b0b0b]">
                  {machine.name}
                </td>

                <td className="py-4">
                  <span className="rounded-full border border-black/10 bg-gray-50 px-3 py-1 text-xs font-medium text-[#5c5c5c]">
                    {getMachineTypeLabel(machine.type)}
                  </span>
                </td>

                <td className="py-4 text-right">
                  {formatHours(machine.effectiveHours)}
                </td>

                <td className="py-4 text-right">
                  {formatHours(machine.maneuverHours)}
                </td>

                <td className="py-4 text-right">
                  {formatHours(machine.displacementHours)}
                </td>

                <td className="py-4 text-right">
                  {formatHours(machine.waitingHours)}
                </td>

                <td className="py-4 text-right">
                  {formatHours(machine.maintenanceHours)}
                </td>

                <td className="py-4 text-right font-semibold">
                  {formatHours(machine.totalHours)}
                </td>

                <td className="py-4 text-right">
                  {(() => {
                    const availability = getAvailabilityStyle(machine.availability);

                    return (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${availability.className}`}
                      >
                        <span>{availability.icon}</span>

                        <span>{formatPercent(machine.availability)}</span>
                      </span>
                    );
                  })()}
                </td>

                <td className="py-4 text-right">
                  {formatPercent(machine.efficiency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}