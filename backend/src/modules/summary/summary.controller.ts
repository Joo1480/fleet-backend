import { Request, Response } from "express";

import { getSummary } from "./summary.service";

export async function summaryController(
  request: Request,
  response: Response,
) {
  const { from, to } = request.query;

  if (!from || !to) {
    return response.status(400).json({
      message: "The 'from' and 'to' query parameters are required.",
    });
  }

  const summary = await getSummary(
    new Date(from as string),
    new Date(to as string),
  );

  return response.json(summary);
}