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

export interface SerializedGoalAccount {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  icon: string | null;
  currentBalance: number;
  monthlyTarget: number;
  type: string;
}

export interface TypedIncomeAccount {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  icon: string | null;
  type: string;
}

export interface TypedSpendAccount {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  icon: string | null;
  type: string;
}
