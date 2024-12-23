import { Metadata } from 'next';
import TransactionTable from '@/components/molecules/TransactionTable/TransactionTable';
import { APP_SHORT_NAME } from '@/constants/content';
import {
  serializeBudgetAccount,
  serializeGoalAccount,
  typeIncomeAccount,
  typeSpendAccount,
} from '@/utils/formatters';
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

  const [
    budgetAccounts,
    incomeAccounts,
    goalAccounts,
    spendingAccounts,
    budgetTransactions,
    incomeTransactions,
    spendingTransactions,
    goalTransactions,
  ] = await Promise.all([
    await prisma.budgetAccount.findMany(),
    await prisma.incomeSource.findMany(),
    await prisma.goal.findMany(),
    await prisma.spendingCategory.findMany(),
    await prisma.budgetAccountTransaction.findMany({
      where: {
        OR: [{ fromBudgetAccountId: id }, { toBudgetAccountId: id }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    await prisma.incomeSourceTransaction.findMany({
      where: { fromIncomeSourceId: id },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    await prisma.spendingCategoryTransaction.findMany({
      where: { transactionsTo: id },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    await prisma.goalTransaction.findMany({
      where: {
        OR: [{ fromAccountId: id }, { toAccountId: id }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  const serializedGoalAccounts = goalAccounts.map(serializeGoalAccount);
  const serializedBudgetAccounts = budgetAccounts.map(serializeBudgetAccount);
  const typedIncomeAccounts = incomeAccounts.map(typeIncomeAccount);
  const typedSpendAccounts = spendingAccounts.map(typeSpendAccount);

  const [
    mappedBudgetAccountTransactions,
    mappedIncomeTransactions,
    mappedGoalTransactions,
    mappedSpendTransactions,
  ] = await Promise.all([
    await mapBudgetTransaction(budgetTransactions),
    await mapIncomeTransaction(incomeTransactions),
    await mapGoalTransaction(goalTransactions),
    await mapSpendTransaction(spendingTransactions),
  ]);

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
      budgetAccounts={serializedBudgetAccounts}
      incomeAccounts={typedIncomeAccounts}
      spendingAccounts={typedSpendAccounts}
      goalAccounts={serializedGoalAccounts}
    />
  );
}
