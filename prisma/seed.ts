import { prisma } from "../src/shared/prisma/client";
import { seedMachines } from "./seed-machines";
import { seedEvents } from "./seed-events";

export async function clearDatabase() {
  await prisma.event.deleteMany();
  await prisma.machine.deleteMany();
}

export async function main() {
  console.log("🚀 Starting database seed...");

  await clearDatabase();
  await seedMachines();
  await seedEvents();

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });