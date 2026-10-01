import { prisma } from "@/lib/prisma";

export async function getCurrentUser(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
