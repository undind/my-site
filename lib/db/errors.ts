import { Prisma } from "@/generated/prisma/client";

export type AppErrorCode = "CONFLICT" | "NOT_FOUND" | "INVALID_REFERENCE" | "DATABASE_ERROR";

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
    public readonly field?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = error.meta?.target;
        const field = Array.isArray(target) && target.includes("slug") ? "slug" : undefined;

        throw new AppError("CONFLICT", "Запись с такими данными уже существует.", field);
      }

      case "P2025":
        throw new AppError("NOT_FOUND", "Запись или связанный объект не найден.");

      case "P2003":
        throw new AppError("INVALID_REFERENCE", "Не удалось связать запись с выбранными данными.");

      default:
        throw new AppError("DATABASE_ERROR", "Не удалось выполнить операцию с базой данных.");
    }
  }

  // Неизвестные ошибки не маскируем.
  throw error;
}
