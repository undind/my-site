import { getCurrentSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export async function getProjects() {
  const session = await getCurrentSession();

  if (!session) return;

  return prisma.project.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      tags: true
    }
  });
}
