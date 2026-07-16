/*
  Warnings:

  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `machine_id` on the `events` table. All the data in the column will be lost.
  - Added the required column `machine_code` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_machine_id_fkey";

-- DropIndex
DROP INDEX "events_machine_id_idx";

-- DropIndex
DROP INDEX "events_machine_id_start_time_idx";

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
DROP COLUMN "machine_id",
ADD COLUMN     "machine_code" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "events_id_seq";

-- CreateIndex
CREATE INDEX "events_machine_code_idx" ON "events"("machine_code");

-- CreateIndex
CREATE INDEX "events_machine_code_start_time_idx" ON "events"("machine_code", "start_time");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_machine_code_fkey" FOREIGN KEY ("machine_code") REFERENCES "machines"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
