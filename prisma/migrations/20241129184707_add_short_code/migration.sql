/*
  Warnings:

  - A unique constraint covering the columns `[short_code]` on the table `event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "short_code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "event_short_code_key" ON "event"("short_code");
