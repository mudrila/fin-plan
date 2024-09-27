-- CreateEnum
CREATE TYPE "BudgetAccountType" AS ENUM ('Income', 'Debt', 'SpendingCategory', 'Credit', 'Debit');

-- CreateTable
CREATE TABLE "BudgetAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "monthlyLimit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "type" "BudgetAccountType" NOT NULL DEFAULT 'Debit',

    CONSTRAINT "BudgetAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BudgetAccount" ADD CONSTRAINT "BudgetAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
