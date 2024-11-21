import { BudgetAccount, Goal, IncomeSource, SpendingCategory } from '@prisma/client';
import {
  SerializedBudgetAccount,
  SerializedGoalAccount,
  TypedIncomeAccount,
  TypedSpendAccount,
} from '@/types/budget';

export const serializeBudgetAccount = (account: BudgetAccount): SerializedBudgetAccount => ({
  ...account,
  currentBalance: Number(account.currentBalance),
});

export const serializeGoalAccount = (account: Goal): SerializedGoalAccount => ({
  ...account,
  currentBalance: Number(account.currentBalance),
  monthlyTarget: Number(account.monthlyTarget),
  type: 'Goal',
});

export const typeIncomeAccount = (account: IncomeSource): TypedIncomeAccount => ({
  ...account,
  type: 'Income',
});

export const typeSpendAccount = (account: SpendingCategory): TypedSpendAccount => ({
  ...account,
  type: 'SpendingCategory',
});

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
