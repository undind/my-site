import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

import { getDatabaseUrl } from "../lib/database-url";

const adapter = new PrismaPg({
  connectionString: getDatabaseUrl(),
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.user.upsert({
    where: {
      email: "admin@email.com",
    },

    update: {},

    create: {
      email: "admin@email.com",
      name: "Admin",
      password: "12345678",
    },
  });

  console.log("Database seeded");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
