/*
  Warnings:

  - You are about to drop the `Goals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GoalTransaction" DROP CONSTRAINT "GoalTransaction_fromAccountId_fkey";

-- DropForeignKey
ALTER TABLE "GoalTransaction" DROP CONSTRAINT "GoalTransaction_toAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Goals" DROP CONSTRAINT "Goals_userId_fkey";

-- DropTable
DROP TABLE "Goals";

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "currentBalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "monthlyTarget" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalTransaction" ADD CONSTRAINT "GoalTransaction_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalTransaction" ADD CONSTRAINT "GoalTransaction_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
