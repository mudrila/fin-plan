import { BudgetAccount, Goal, IncomeSource, SpendingCategory } from '@prisma/client';
import {
  SerializedBudgetAccount,
  SerializedGoal,
  TypedIncomeAccount,
  TypedSpendAccount,
} from '@/types/budget';

export const serializeBudgetAccount = (account: BudgetAccount): SerializedBudgetAccount => ({
  ...account,
  currentBalance: Number(account.currentBalance),
});

export const serializeGoalAccount = (account: Goal): SerializedGoal => ({
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
  type: 'Spending Category',
});

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
