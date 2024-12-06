/*
  Warnings:

  - The primary key for the `event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `guestCount` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `reserved` on the `event` table. All the data in the column will be lost.
  - The primary key for the `gift` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isReserved` on the `gift` table. All the data in the column will be lost.
  - The `guest_id` column on the `gift` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `guest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `event_date` to the `event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `gift` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_id` on the `gift` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `guest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `event_id` on the `guest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "gift" DROP CONSTRAINT "gift_event_id_fkey";

-- DropForeignKey
ALTER TABLE "gift" DROP CONSTRAINT "gift_guest_id_fkey";

-- DropForeignKey
ALTER TABLE "guest" DROP CONSTRAINT "guest_event_id_fkey";

-- AlterTable
ALTER TABLE "event" DROP CONSTRAINT "event_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "eventDate",
DROP COLUMN "guestCount",
DROP COLUMN "reserved",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "gift" DROP CONSTRAINT "gift_pkey",
DROP COLUMN "isReserved",
ADD COLUMN     "is_reserved" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "event_id",
ADD COLUMN     "event_id" UUID NOT NULL,
DROP COLUMN "guest_id",
ADD COLUMN     "guest_id" UUID,
ADD CONSTRAINT "gift_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "guest" DROP CONSTRAINT "guest_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "event_id",
ADD COLUMN     "event_id" UUID NOT NULL,
ADD CONSTRAINT "guest_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "gift" ADD CONSTRAINT "gift_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift" ADD CONSTRAINT "gift_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guest" ADD CONSTRAINT "guest_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
