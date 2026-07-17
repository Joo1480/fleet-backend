import { findSummaryData } from "./summary.repository";

export async function getSummary(
  from: Date,
  to: Date,
) {
  const events = await findSummaryData(from, to);

  return events;
}