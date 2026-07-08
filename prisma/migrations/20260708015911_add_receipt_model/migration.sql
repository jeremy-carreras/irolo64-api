-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "totalCharge" DECIMAL(65,30) NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "pricePerM3" DECIMAL(65,30) NOT NULL,
    "paymentDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Receipt_departmentId_idx" ON "Receipt"("departmentId");

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
