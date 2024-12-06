/*
  Warnings:

  - You are about to drop the column `eventId` on the `gift` table. All the data in the column will be lost.
  - You are about to drop the column `guestId` on the `gift` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `guest` table. All the data in the column will be lost.
  - Added the required column `event_id` to the `gift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `guest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "gift" DROP CONSTRAINT "gift_eventId_fkey";

-- DropForeignKey
ALTER TABLE "gift" DROP CONSTRAINT "gift_guestId_fkey";

-- DropForeignKey
ALTER TABLE "guest" DROP CONSTRAINT "guest_eventId_fkey";

-- AlterTable
ALTER TABLE "gift" DROP COLUMN "eventId",
DROP COLUMN "guestId",
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "guest_id" TEXT;

-- AlterTable
ALTER TABLE "guest" DROP COLUMN "eventId",
ADD COLUMN     "event_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "gift" ADD CONSTRAINT "gift_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift" ADD CONSTRAINT "gift_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest" ADD CONSTRAINT "guest_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
