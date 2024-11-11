-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetAccount" DROP CONSTRAINT "BudgetAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetAccountTransaction" DROP CONSTRAINT "BudgetAccountTransaction_fromBudgetAccountId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetAccountTransaction" DROP CONSTRAINT "BudgetAccountTransaction_toBudgetAccountId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetAccountTransaction" DROP CONSTRAINT "BudgetAccountTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAccount" ADD CONSTRAINT "BudgetAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAccountTransaction" ADD CONSTRAINT "BudgetAccountTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAccountTransaction" ADD CONSTRAINT "BudgetAccountTransaction_fromBudgetAccountId_fkey" FOREIGN KEY ("fromBudgetAccountId") REFERENCES "BudgetAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAccountTransaction" ADD CONSTRAINT "BudgetAccountTransaction_toBudgetAccountId_fkey" FOREIGN KEY ("toBudgetAccountId") REFERENCES "BudgetAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
