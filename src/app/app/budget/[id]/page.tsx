import { Metadata } from 'next';
import { APP_SHORT_NAME } from '@/constants/content';
import TransactionTable from '@/components/molecules/TransactionTable/TransactionTable';
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

  const transactions = await prisma.budgetAccountTransaction.findMany({
    where: {
      OR: [
        { fromBudgetAccountId: id },
        { toBudgetAccountId: id },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return <TransactionTable transactions={transactions} edit/>
}