/*
  Warnings:

  - The `monthlyTarget` column on the `Goal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "monthlyTarget",
ADD COLUMN     "monthlyTarget" DECIMAL(65,30) NOT NULL DEFAULT 0;
