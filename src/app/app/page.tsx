import { Metadata } from 'next';
import TransactionTable from '@/components/molecules/TransactionTable/TransactionTable';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';
import {
  mapBudgetTransaction,
  mapIncomeTransaction,
  mapGoalTransaction,
  mapSpendTransaction,
} from '@/utils/getBudgetAccountInfo';
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

  const mappedBudgetAccountTransactions = await mapBudgetTransaction(budgetTransactions);
  const mappedIncomeTransactions = await mapIncomeTransaction(incomeTransactions);
  const mappedGoalTransactions = await mapGoalTransaction(goalTransactions);
  const mappedSpendTransactions = await mapSpendTransaction(spendingTransactions);

  const allTransactions = [
    ...mappedBudgetAccountTransactions,
    ...mappedIncomeTransactions,
    ...mappedGoalTransactions,
    ...mappedSpendTransactions,
  ];

  const sortedTransactions = allTransactions.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return (
    <TransactionTable
      transactions={sortedTransactions}
    />
  );
}
