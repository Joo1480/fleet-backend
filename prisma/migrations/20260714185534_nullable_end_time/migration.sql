-- AlterTable
ALTER TABLE "events" ALTER COLUMN "end_time" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "events_machine_id_idx" ON "events"("machine_id");

-- CreateIndex
CREATE INDEX "events_start_time_idx" ON "events"("start_time");

-- CreateIndex
CREATE INDEX "events_end_time_idx" ON "events"("end_time");

-- CreateIndex
CREATE INDEX "events_machine_id_start_time_idx" ON "events"("machine_id", "start_time");

-- CreateIndex
CREATE INDEX "machines_deleted_at_idx" ON "machines"("deleted_at");
