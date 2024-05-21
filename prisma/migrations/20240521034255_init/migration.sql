-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "end_date" DROP NOT NULL,
ALTER COLUMN "default_payment_method_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "subscription" DROP NOT NULL;
