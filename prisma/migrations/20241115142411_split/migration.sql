/*
  Warnings:

  - The values [Income,SpendingCategory,Goal] on the enum `BudgetAccountType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `monthlyLimit` on the `BudgetAccount` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BudgetAccountType_new" AS ENUM ('Debt', 'Credit', 'Debit');
ALTER TABLE "BudgetAccount" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "BudgetAccount" ALTER COLUMN "type" TYPE "BudgetAccountType_new" USING ("type"::text::"BudgetAccountType_new");
ALTER TYPE "BudgetAccountType" RENAME TO "BudgetAccountType_old";
ALTER TYPE "BudgetAccountType_new" RENAME TO "BudgetAccountType";
DROP TYPE "BudgetAccountType_old";
ALTER TABLE "BudgetAccount" ALTER COLUMN "type" SET DEFAULT 'Debit';
COMMIT;

-- AlterTable
ALTER TABLE "BudgetAccount" DROP COLUMN "monthlyLimit";

-- CreateTable
CREATE TABLE "IncomeSource" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "IncomeSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpendingCategory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,

    CONSTRAINT "SpendingCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "currentBalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "monthlyTarget" TEXT NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeSourceTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fromIncomeSourceId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncomeSourceTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpendingCategoryTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toIncomeSourceId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpendingCategoryTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fromAccountId" TEXT NOT NULL,
    "toAccountId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoalTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IncomeSource" ADD CONSTRAINT "IncomeSource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendingCategory" ADD CONSTRAINT "SpendingCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeSourceTransaction" ADD CONSTRAINT "IncomeSourceTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeSourceTransaction" ADD CONSTRAINT "IncomeSourceTransaction_fromIncomeSourceId_fkey" FOREIGN KEY ("fromIncomeSourceId") REFERENCES "IncomeSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendingCategoryTransaction" ADD CONSTRAINT "SpendingCategoryTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpendingCategoryTransaction" ADD CONSTRAINT "SpendingCategoryTransaction_toIncomeSourceId_fkey" FOREIGN KEY ("toIncomeSourceId") REFERENCES "SpendingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalTransaction" ADD CONSTRAINT "GoalTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalTransaction" ADD CONSTRAINT "GoalTransaction_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "Goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalTransaction" ADD CONSTRAINT "GoalTransaction_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "Goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
