import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation failed.",
      errors: error.flatten().fieldErrors,
    });
  }

  console.error(error);

  return response.status(500).json({
    message: "Internal server error.",
  });
}