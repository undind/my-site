import { handlePrismaError } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function getTags() {
  try {
    return await prisma.tag.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}
