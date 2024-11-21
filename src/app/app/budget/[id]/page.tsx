import { Metadata } from 'next';
import TransactionTable from '@/components/molecules/TransactionTable/TransactionTable';
import { APP_SHORT_NAME } from '@/constants/content';
import {
  mapBudgetTransaction,
  mapGoalTransaction,
  mapIncomeTransaction,
  mapSpendTransaction,
} from '@/utils/getBudgetAccountInfo';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: `Budget Account Details | ${APP_SHORT_NAME}`,
};

interface BudgetAccountDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function budgetAccountDetails(props: BudgetAccountDetailsProps) {
  const params = await props.params;
  const { id } = params;

  const budgetTransactions = await prisma.budgetAccountTransaction.findMany({
    where: {
      OR: [{ fromBudgetAccountId: id }, { toBudgetAccountId: id }],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const incomeTransactions = await prisma.incomeSourceTransaction.findMany({
    where: { fromIncomeSourceId: id },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const spendingTransactions = await prisma.spendingCategoryTransaction.findMany({
    where: { transactionsTo: id },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const goalTransactions = await prisma.goalTransaction.findMany({
    where: {
      OR: [{ fromAccountId: id }, { toAccountId: id }],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const mappedBudgetAccountTransactions = await mapBudgetTransaction(budgetTransactions);
  const mappedIncomeTransactions = await mapIncomeTransaction(incomeTransactions);
  const mappedGoalTransactions = await mapGoalTransaction(goalTransactions);
  const mappedSpendTransactions = await mapSpendTransaction(spendingTransactions);

  return (
    <TransactionTable
      transactions={[
        ...mappedBudgetAccountTransactions,
        ...mappedIncomeTransactions,
        ...mappedGoalTransactions,
        ...mappedSpendTransactions,
      ]}
    />
  );
}
