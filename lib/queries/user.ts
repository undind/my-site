import { getCurrentSession } from "@/lib/auth-server";
import { handlePrismaError } from "@/lib/db/errors";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  try {
    const session = await getCurrentSession();

    if (!session) return;

    return prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }
}
