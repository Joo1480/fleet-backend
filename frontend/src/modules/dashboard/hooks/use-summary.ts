import { useQuery } from "@tanstack/react-query";

import { getSummary } from "../services/summary.service";

interface UseSummaryParams {
  from: string;
  to: string;
}

export function useSummary(
  params: UseSummaryParams,
) {
  return useQuery({
    queryKey: ["summary", params.from, params.to],
    queryFn: () => getSummary(params),
  });
}