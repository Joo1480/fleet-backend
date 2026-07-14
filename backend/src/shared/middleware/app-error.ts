export interface AppError {
  statusCode: number;
  message: string;
}

export function createAppError(
  message: string,
  statusCode = 400,
): AppError {
  return {
    message,
    statusCode,
  };
}