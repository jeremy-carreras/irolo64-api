/*
  Warnings:

  - Added the required column `consumedM3` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable - First add column as nullable
ALTER TABLE "Receipt" ADD COLUMN "consumedM3" DECIMAL(65,30);

-- Populate existing rows with calculated value (totalCharge / pricePerM3)
UPDATE "Receipt" SET "consumedM3" = "totalCharge" / "pricePerM3" WHERE "consumedM3" IS NULL;

-- Make column NOT NULL
ALTER TABLE "Receipt" ALTER COLUMN "consumedM3" SET NOT NULL;
