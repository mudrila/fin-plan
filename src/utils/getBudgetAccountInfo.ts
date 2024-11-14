import { BudgetAccountTransaction } from '@prisma/client';
import prisma from './prisma';

async function getBudgetAccount(id: string) {
  const budgetAccount = await prisma.budgetAccount.findFirst({
    where: { id },
  });

  return budgetAccount;
}

export async function getBudgetAccountTitle(id: string) {
  const budgetAccount = await getBudgetAccount(id);

  return budgetAccount?.title;
}

export async function getBudgetAccountType(id: string) {
  const budgetAccount = await getBudgetAccount(id);

  return String(budgetAccount?.type);
}

export async function updateTransaction(transactions: BudgetAccountTransaction[]) {
  const updatedTransaction = await Promise.all(
    transactions.map(async transaction => ({
      ...transaction,
      amount: Number(transaction.amount),
      fromTitle: await getBudgetAccountTitle(transaction.fromBudgetAccountId),
      toTitle: await getBudgetAccountTitle(transaction.toBudgetAccountId),
      fromType: await getBudgetAccountType(transaction.fromBudgetAccountId),
      toType: await getBudgetAccountType(transaction.toBudgetAccountId),
    })),
  );

  return updatedTransaction;
}
