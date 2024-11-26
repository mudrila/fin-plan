import { BudgetAccountType } from '@prisma/client';

export interface SerializedBudgetAccount {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  icon: string | null;
  currentBalance: number;
  type: BudgetAccountType;
}

export interface SerializedGoal {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  icon: string | null;
  currentBalance: number;
  monthlyTarget: number;
  type: 'Goal';
}

export interface TypedIncomeAccount {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  icon: string | null;
  type: 'Income';
}

export interface TypedSpendAccount {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  icon: string | null;
  type: 'Spending Category';
}
