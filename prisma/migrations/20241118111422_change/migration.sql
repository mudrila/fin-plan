/*
  Warnings:

  - You are about to drop the column `toIncomeSourceId` on the `SpendingCategoryTransaction` table. All the data in the column will be lost.
  - Added the required column `transactionsTo` to the `SpendingCategoryTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SpendingCategoryTransaction" DROP CONSTRAINT "SpendingCategoryTransaction_toIncomeSourceId_fkey";

-- AlterTable
ALTER TABLE "SpendingCategoryTransaction" DROP COLUMN "toIncomeSourceId",
ADD COLUMN     "transactionsTo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SpendingCategoryTransaction" ADD CONSTRAINT "SpendingCategoryTransaction_transactionsTo_fkey" FOREIGN KEY ("transactionsTo") REFERENCES "SpendingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
