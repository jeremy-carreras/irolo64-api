/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Receipt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_departmentId_fkey";

-- DropIndex
DROP INDEX "Receipt_departmentId_idx";

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "departmentId";

-- CreateIndex
CREATE INDEX "Receipt_periodStart_idx" ON "Receipt"("periodStart");
