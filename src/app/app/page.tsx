import { Metadata } from 'next';
import TransactionTable from '@/components/molecules/TransactionTable/TransactionTable';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';
import { updateBudgetTransaction, updateIncomeTransaction, updateGoalTransaction, updateSpendTransaction } from '@/utils/getBudgetAccountInfo';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: `Dashboard | ${APP_SHORT_NAME}`,
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const budgetTransactions = await prisma.budgetAccountTransaction.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const incomeTransactions = await prisma.incomeSourceTransaction.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const spendingTransactions = await prisma.spendingCategoryTransaction.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const goalTransactions = await prisma.goalTransaction.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  const changedBudgetTransactions = await updateBudgetTransaction(budgetTransactions);
  const changedIncomeTransactions = await updateIncomeTransaction(incomeTransactions);
  const changedGoalTransactions = await updateGoalTransaction(goalTransactions);
  const changedSpendTransactions = await updateSpendTransaction(spendingTransactions);

  return <TransactionTable
  transactions={[...changedBudgetTransactions, ...changedIncomeTransactions, ...changedGoalTransactions, ...changedSpendTransactions]}
  />;
}
