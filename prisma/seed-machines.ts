import machines from "../data/machines.json";

import { prisma } from "../src/shared/prisma/client";

import type { MachineSeed } from "../src/shared/types/machine-seed";

export async function seedMachines() {
  const machineList = machines as MachineSeed[];

  await prisma.machine.createMany({
    data: machineList,
  });

  console.log(`✅ ${machineList.length} machines imported.`);
}