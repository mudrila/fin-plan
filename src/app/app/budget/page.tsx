import { Metadata } from 'next';
import Budget from '@/app/components/pages/Budget/Budget';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: `Budget | ${APP_SHORT_NAME}`,
};

export default async function BudgetPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const budgetAccounts = await prisma.budgetAccount.findMany({
    where: { userId },
  });
  return <Budget budgetAccounts={budgetAccounts} />;
}
