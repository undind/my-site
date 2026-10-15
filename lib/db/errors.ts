import { Prisma } from "@/generated/prisma/client";

export type AppErrorCode = "CONFLICT" | "NOT_FOUND" | "INVALID_REFERENCE" | "DATABASE_ERROR";

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new AppError("CONFLICT", "A record with this data already exists.");

      case "P2025":
        throw new AppError("NOT_FOUND", "Record not found.");

      case "P2003":
        throw new AppError("INVALID_REFERENCE", "The operation cannot be performed due to related records.");

      default:
        throw new AppError("DATABASE_ERROR", "The database operation could not be performed.");
    }
  }

  throw error;
}
