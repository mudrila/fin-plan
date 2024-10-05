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

export interface BudgetAccountsProps {
  accounts: SerializedBudgetAccount[];
  title: string;
}

export interface BudgetAccountDialogProps {
  title: string;
  setTitle: (e: string) => void;
  description: string;
  setDescription: (e: string) => void;
  icon: string;
  setIcon: (e: string) => void;
  monthlyLimit: string;
  setMonthlyLimit: (e: string) => void;
  type: string;
  setType: (e: string) => void;
  isPending: boolean;
}
