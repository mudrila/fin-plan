import { Metadata } from 'next';
import Accounts from '@/components/pages/Budget/Budget';
import { APP_SHORT_NAME } from '@/constants/content';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: `Accounts | ${APP_SHORT_NAME}`,
};

export default async function AccountsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const budgetAccounts = await prisma.budgetAccount.findMany({
    where: { userId },
  });

  const incomeAccounts = await prisma.incomeSource.findMany({
    where: { userId },
  });

  const goalAccounts = await prisma.goals.findMany({
    where: { userId },
  });

  const spendingAccounts = await prisma.spendingCategory.findMany({
    where: { userId },
  });
  return (
    <Accounts
      budgetAccounts={budgetAccounts}
      incomeAccounts={incomeAccounts}
      goalAccounts={goalAccounts}
      spendingAccounts={spendingAccounts}
    />
  );
}
