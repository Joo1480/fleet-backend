"use client";

import { useSummary } from "./hooks/use-summary";

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

  if (isError) {
    return <p>Error loading dashboard.</p>;
  }

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}