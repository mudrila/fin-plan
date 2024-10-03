import { BudgetAccount } from '@prisma/client';
import { SerializedBudgetAccount } from '@/types/budget';

export const serializeBudgetAccount = (account: BudgetAccount): SerializedBudgetAccount => ({
  ...account,
  monthlyLimit: Number(account.monthlyLimit),
  currentBalance: Number(account.currentBalance),
});
