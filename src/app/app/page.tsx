import { Metadata } from 'next';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';
import TransactionTable from '@/components/molecules/TransactionTable/TransactionTable';

export const metadata: Metadata = {
  title: `Dashboard | ${APP_SHORT_NAME}`,
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const transactions = await prisma.budgetAccountTransaction.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return <TransactionTable transactions={transactions}/>
}
