/*
  Warnings:

  - You are about to drop the column `billing_details` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_details` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_email` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_url` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `payments` table. All the data in the column will be lost.
  - Added the required column `customer_details` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_intent` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "billing_details",
DROP COLUMN "payment",
DROP COLUMN "payment_details",
DROP COLUMN "receipt_email",
DROP COLUMN "receipt_url",
DROP COLUMN "type",
ADD COLUMN     "customer_details" TEXT NOT NULL,
ADD COLUMN     "payment_intent" TEXT NOT NULL,
ADD COLUMN     "stripe_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "subscription" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscription_id" TEXT NOT NULL,
    "stripe_user_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "default_payment_method_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions_plans" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plan_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "interval" TEXT NOT NULL,

    CONSTRAINT "subscriptions_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoice_id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "amount_paid" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payment_intent_id" TEXT NOT NULL,
    "invoice_pdf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);
