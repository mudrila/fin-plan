-- AlterEnum
ALTER TYPE "BudgetAccountType" ADD VALUE 'Goal';

-- AlterTable
ALTER TABLE "BudgetAccount" ADD COLUMN     "currentBalance" DECIMAL(65,30) NOT NULL DEFAULT 0;
