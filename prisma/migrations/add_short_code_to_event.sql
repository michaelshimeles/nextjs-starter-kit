ALTER TABLE "event" ADD COLUMN "short_code" TEXT;
CREATE UNIQUE INDEX "event_short_code_key" ON "event"("short_code"); 