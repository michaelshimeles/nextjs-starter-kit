/*
  Warnings:

  - Added the required column `created_time` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_time` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "created_time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_time" TIMESTAMP(3) NOT NULL;
