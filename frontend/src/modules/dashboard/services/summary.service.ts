import { api } from "@/shared/api/api";

import { SummaryResponse } from "../types/summary";

interface GetSummaryParams {
  from: string;
  to: string;
}

export async function getSummary(
  params: GetSummaryParams,
): Promise<SummaryResponse> {
  const { data } = await api.get<SummaryResponse>(
    "/summary",
    {
      params,
    },
  );

  return data;
}