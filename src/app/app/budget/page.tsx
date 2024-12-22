import { Metadata } from 'next';
import Budget from '@/components/pages/Budget/Budget';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: `Budget | ${APP_SHORT_NAME}`,
};

export default async function BudgetPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const [budgetAccounts, incomes, goals, spendingCategories, sumGoalTransaction, sumIncomeTransaction, sumSpendTransaction] = await Promise.all([
    prisma.budgetAccount.findMany({ where: { userId } }),
    prisma.incomeSource.findMany({ where: { userId } }),
    prisma.goal.findMany({ where: { userId } }),
    prisma.spendingCategory.findMany({ where: { userId } }),
    prisma.goalTransaction.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
    prisma.incomeSourceTransaction.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
    prisma.spendingCategoryTransaction.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
  ]);

  const totalGoalSum = Number(sumGoalTransaction._sum.amount) || 0;
  const totalIncomeSum = Number(sumIncomeTransaction._sum.amount) || 0;
  const totalSpendSum = Number(sumSpendTransaction._sum.amount) || 0;
  return (
    <Budget
      budgetAccounts={budgetAccounts}
      incomeAccounts={incomes}
      goalAccounts={goals}
      spendingAccounts={spendingCategories}
      sumGoalTransaction={totalGoalSum}
      sumIncomeTransaction={totalIncomeSum}
      sumSpendTransaction={totalSpendSum}
    />
  );
}
