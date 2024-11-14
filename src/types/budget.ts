import { BudgetAccountType } from '@prisma/client';

export interface SerializedBudgetAccount {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  icon: string | null;
  monthlyLimit: number;
  currentBalance: number;
  type: BudgetAccountType;
}
