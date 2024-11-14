import { Metadata } from 'next';
import TransactionTable from '@/components/molecules/TransactionTable/TransactionTable';
import { APP_SHORT_NAME } from '@/constants/content';
import { updateTransaction } from '@/utils/getBudgetAccountInfo';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: `Budget Account Details | ${APP_SHORT_NAME}`,
};

interface BudgetAccountDetailsProps {
  params: {
    id: string;
  };
}

export default async function budgetAccountDetails({ params }: BudgetAccountDetailsProps) {
  const { id } = params;

  const userTransactions = await prisma.budgetAccountTransaction.findMany({
    where: {
      OR: [{ fromBudgetAccountId: id }, { toBudgetAccountId: id }],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const changedTransactions = await updateTransaction(userTransactions);

  return <TransactionTable transactions={changedTransactions} />;
}
