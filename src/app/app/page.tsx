import { Metadata } from 'next';
import TransactionTable from '@/components/molecules/TransactionTable/TransactionTable';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';
import { updateTransaction } from '@/utils/getBudgetAccountInfo';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: `Dashboard | ${APP_SHORT_NAME}`,
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const userTransactions = await prisma.budgetAccountTransaction.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const changedTransactions = await updateTransaction(userTransactions);

  return <TransactionTable transactions={changedTransactions} />;
}
