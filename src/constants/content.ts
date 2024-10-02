import { BudgetAccountType } from '@prisma/client';

export const PASSWORD_STRENGTH_DESCRIPTIONS = [
  '',
  'Very Weak',
  'Weak',
  'Medium',
  'Strong',
  'Very Strong',
];
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;

export const accountTypes = [
  'Income',
  'Debt',
  'SpendingCategory',
  'Credit',
  'Debit',
  'Goal',
] as const;

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
