-- CreateTable
CREATE TABLE "BudgetAccountTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fromBudgetAccountId" TEXT NOT NULL,
    "toBudgetAccountId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BudgetAccountTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BudgetAccountTransaction" ADD CONSTRAINT "BudgetAccountTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAccountTransaction" ADD CONSTRAINT "BudgetAccountTransaction_fromBudgetAccountId_fkey" FOREIGN KEY ("fromBudgetAccountId") REFERENCES "BudgetAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAccountTransaction" ADD CONSTRAINT "BudgetAccountTransaction_toBudgetAccountId_fkey" FOREIGN KEY ("toBudgetAccountId") REFERENCES "BudgetAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
