import {
  BudgetAccountTransaction,
  GoalTransaction,
  IncomeSourceTransaction,
  SpendingCategoryTransaction,
} from '@prisma/client';
import prisma from './prisma';

async function getBudgetAccount(id: string) {
  const budgetAccount = await prisma.budgetAccount.findFirst({
    where: { id },
  });

  return budgetAccount;
}

async function getIncomeAccount(id: string) {
  const incomeAccount = await prisma.incomeSource.findFirst({
    where: { id },
  });

  return incomeAccount;
}

async function getGoalAccount(id: string) {
  const goalAccount = await prisma.goal.findFirst({
    where: { id },
  });

  return goalAccount;
}
async function getSpendAccount(id: string) {
  const spendAccount = await prisma.spendingCategory.findFirst({
    where: { id },
  });

  return spendAccount;
}

export async function getAccountTitle(id: string, type: string) {
  if (type === 'Budget') {
    const budgetAccount = await getBudgetAccount(id);
    return budgetAccount?.title;
  }
  if (type === 'Income') {
    const incomeAccount = await getIncomeAccount(id);
    return incomeAccount?.title;
  }
  if (type === 'Goal') {
    const goalAccount = await getGoalAccount(id);
    return goalAccount?.title;
  }
  if (type === 'Spending Category') {
    const spendingCategory = await getSpendAccount(id);
    return spendingCategory?.title;
  }

  return '';
}

export async function getAccountType(id: string) {
  const budgetAccount = await getBudgetAccount(id);

  return String(budgetAccount?.type);
}

export async function mapBudgetTransaction(transactions: BudgetAccountTransaction[]) {
  const mappedTransaction = await Promise.all(
    transactions.map(async transaction => ({
      ...transaction,
      amount: Number(transaction.amount),
      fromTitle: await getAccountTitle(transaction.fromBudgetAccountId, 'Budget'),
      toTitle: await getAccountTitle(transaction.toBudgetAccountId, 'Budget'),
      fromType: await getAccountType(transaction.fromBudgetAccountId),
      toType: await getAccountType(transaction.toBudgetAccountId),
    })),
  );

  return mappedTransaction;
}

export async function mapIncomeTransaction(transactions: IncomeSourceTransaction[]) {
  const mappedTransaction = await Promise.all(
    transactions.map(async transaction => ({
      ...transaction,
      amount: Number(transaction.amount),
      fromTitle: await getAccountTitle(transaction.fromIncomeSourceId, 'Income'),
      toTitle: '',
      fromType: 'Income',
      toType: 'Budget',
    })),
  );

  return mappedTransaction;
}

export async function mapGoalTransaction(transactions: GoalTransaction[]) {
  const mappedTransaction = await Promise.all(
    transactions.map(async transaction => ({
      ...transaction,
      amount: Number(transaction.amount),
      fromTitle: await getAccountTitle(transaction.toAccountId, 'Goal'),
      toTitle: await getAccountTitle(transaction.fromAccountId, 'Goal'),
      fromType: 'Goal',
      toType: 'Goal',
    })),
  );

  return mappedTransaction;
}

export async function mapSpendTransaction(transactions: SpendingCategoryTransaction[]) {
  const mappedTransaction = await Promise.all(
    transactions.map(async transaction => ({
      ...transaction,
      amount: Number(transaction.amount),
      fromTitle: '',
      toTitle: await getAccountTitle(transaction.transactionsTo, 'Spending Category'),
      fromType: 'Credit',
      toType: 'Spending Category',
    })),
  );

  return mappedTransaction;
}
