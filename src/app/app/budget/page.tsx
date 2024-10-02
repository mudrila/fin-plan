import { BudgetAccount } from '@prisma/client';
import { Metadata } from 'next';
import Budget from '@/app/components/pages/Budget/Budget';
import { SerializedBudgetAccount } from '@/constants/content';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: 'Budget | Fin-Plan',
};

const convertDecimalToNumber = (account: BudgetAccount): SerializedBudgetAccount => ({
  ...account,
  monthlyLimit: Number(account.monthlyLimit),
  currentBalance: Number(account.currentBalance),
});

async function getAccounts(): Promise<SerializedBudgetAccount[]> {
  const session = await auth();
  const userId = session?.user?.id;

  const accounts = await prisma.budgetAccount.findMany({
    where: { userId },
  });
  return accounts.map(convertDecimalToNumber);
}

export default async function BudgetPage() {
  const accounts = await getAccounts();

  return <Budget accounts={accounts} />;
}
