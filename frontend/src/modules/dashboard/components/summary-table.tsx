import { MachineSummary } from "../types/summary";

interface SummaryTableProps {
  machines: MachineSummary[];
}

export function SummaryTable({
  machines,
}: SummaryTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Machine</th>
          <th>Type</th>
          <th>Effective</th>
          <th>Maneuver</th>
          <th>Displacement</th>
          <th>Waiting</th>
          <th>Maintenance</th>
          <th>Total</th>
          <th>Availability</th>
          <th>Efficiency</th>
        </tr>
      </thead>

      <tbody>
        {machines.map((machine) => (
          <tr key={machine.code}>
            <td>{machine.name}</td>
            <td>{machine.type}</td>
            <td>{machine.effectiveHours}</td>
            <td>{machine.maneuverHours}</td>
            <td>{machine.displacementHours}</td>
            <td>{machine.waitingHours}</td>
            <td>{machine.maintenanceHours}</td>
            <td>{machine.totalHours}</td>
            <td>{machine.availability}</td>
            <td>{machine.efficiency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}