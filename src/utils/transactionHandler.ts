import { NextResponse } from 'next/server';
import {
  NewTransactionData,
  Transaction,
  TypedBudgetTransaction,
  TypedGoalTransaction,
  TypedIncomeTransaction,
  TypedSpendingCategoryTransaction,
} from '@/types/transaction';
import prisma from '@/utils/prisma';

export async function findTransactionById(id: string): Promise<Transaction | null> {
  const spendingCategoryTransaction = await prisma.spendingCategoryTransaction.findUnique({
    where: { id },
  });

  if (spendingCategoryTransaction) {
    return {
      fromType: ['Debit', 'Credit', 'Debt'],
      toType: ['Spending Category'],
      type: 'Spending Category',
      id: spendingCategoryTransaction.id,
      toAccountId: spendingCategoryTransaction.transactionsTo,
    } as TypedSpendingCategoryTransaction;
  }

  const budgetAccountTransaction = await prisma.budgetAccountTransaction.findUnique({
    where: { id },
  });

  if (budgetAccountTransaction) {
    return {
      fromType: ['Debit', 'Credit', 'Debt'],
      toType: ['Debit', 'Credit', 'Debt'],
      type: 'Budget',
      id: budgetAccountTransaction.id,
      fromBudgetAccountId: budgetAccountTransaction.fromBudgetAccountId,
      toBudgetAccountId: budgetAccountTransaction.toBudgetAccountId,
      amount: Number(budgetAccountTransaction.amount),
    } as TypedBudgetTransaction;
  }

  const goalTransaction = await prisma.goalTransaction.findUnique({
    where: { id },
  });

  if (goalTransaction) {
    return {
      fromType: ['Goal'],
      toType: ['Goal'],
      type: 'Goal',
      id: goalTransaction.id,
      fromAccountId: goalTransaction.fromAccountId,
      toAccountId: goalTransaction.toAccountId,
      amount: Number(goalTransaction.amount),
    } as TypedGoalTransaction;
  }

  const incomeSourceTransaction = await prisma.incomeSourceTransaction.findUnique({
    where: { id },
  });

  if (incomeSourceTransaction) {
    return {
      fromType: ['Income'],
      toType: ['Debit', 'Credit'],
      type: 'Income',
      id: incomeSourceTransaction.id,
      fromAccountId: incomeSourceTransaction.fromIncomeSourceId,
    } as TypedIncomeTransaction;
  }

  return null;
}

export async function updateTransaction(
  newData: NewTransactionData,
  fromAccountType: string,
  toAccountType: string,
  id: string,
) {
  switch (true) {
    case fromAccountType === 'Income' && ['Debit', 'Credit'].includes(toAccountType):
      const fromIncomeAccount = await prisma.incomeSource.findUnique({
        where: { id: newData.fromAccountId },
      });

      const toIncomeAccount = await prisma.budgetAccount.findUnique({
        where: { id: newData.toAccountId },
      });

      if (!fromIncomeAccount || !toIncomeAccount) {
        return NextResponse.json({
          errorMessage: 'Account does not exist.',
        });
      }

      await prisma.incomeSourceTransaction.update({
        where: { id },
        data: {
          fromIncomeSourceId: newData.fromAccountId,
          amount: newData.amount,
          description: newData.description,
        },
      });
      break;

    case ['Debit', 'Credit', 'Debt', 'Goal'].includes(fromAccountType) &&
      ['Debit', 'Credit', 'Debt', 'Goal'].includes(toAccountType):
      const fromBudgetAccount =
        fromAccountType === 'Goal'
          ? await prisma.goal.findUnique({ where: { id: newData.fromAccountId } })
          : await prisma.budgetAccount.findUnique({ where: { id: newData.fromAccountId } });

      const toBudgetAccount =
        toAccountType === 'Goal'
          ? await prisma.goal.findUnique({ where: { id: newData.toAccountId } })
          : await prisma.budgetAccount.findUnique({ where: { id: newData.toAccountId } });

      if (!fromBudgetAccount || !toBudgetAccount) {
        return NextResponse.json({
          errorMessage: 'Account does not exist.',
        });
      }

      if (fromAccountType === 'Goal' && toAccountType === 'Goal') {
        const oldTransaction = await prisma.goalTransaction.findFirst({
          where: { id },
        });
        const newAmount = Number(oldTransaction?.amount) - newData.amount;

        await prisma.goalTransaction.update({
          where: { id },
          data: {
            fromAccountId: newData.fromAccountId,
            toAccountId: newData.toAccountId,
            amount: newData.amount,
            description: newData.description,
          },
        });

        await prisma.goal.update({
          where: { id: newData.fromAccountId },
          data: {
            currentBalance: {
              decrement: newAmount,
            },
          },
        });

        await prisma.goal.update({
          where: { id: newData.toAccountId },
          data: {
            currentBalance: {
              increment: newAmount,
            },
          },
        });
      } else {
        const oldTransaction = await prisma.budgetAccountTransaction.findFirst({
          where: { id },
        });
        const newAmount = Number(oldTransaction?.amount) - newData.amount;

        await prisma.budgetAccountTransaction.update({
          where: { id },
          data: {
            fromBudgetAccountId: newData.fromAccountId,
            toBudgetAccountId: newData.toAccountId,
            amount: newData.amount,
            description: newData.description,
          },
        });

        await prisma.budgetAccount.update({
          where: { id: newData.fromAccountId },
          data: {
            currentBalance: {
              increment: newAmount,
            },
          },
        });

        await prisma.budgetAccount.update({
          where: { id: newData.toAccountId },
          data: {
            currentBalance: {
              decrement: newAmount,
            },
          },
        });
      }
      break;

    case ['Debit', 'Credit', 'Debt'].includes(fromAccountType) &&
      toAccountType === 'Spending Category':
      const fromSpendAccount = await prisma.budgetAccount.findUnique({
        where: { id: newData.fromAccountId },
      });

      const toSpendAccount = await prisma.spendingCategory.findUnique({
        where: { id: newData.toAccountId },
      });

      if (!fromSpendAccount || !toSpendAccount) {
        return NextResponse.json({
          errorMessage: 'Account does not exist.',
        });
      }

      await prisma.spendingCategoryTransaction.update({
        where: { id },
        data: {
          transactionsTo: newData.toAccountId,
          amount: newData.amount,
          description: newData.description,
        },
      });
      break;

    default:
      return NextResponse.json({ errorMessage: 'Invalid transaction types' });
  }
}

export async function deleteTransaction(transaction: Transaction) {
  switch (transaction.type) {
    case 'Spending Category':
      await prisma.spendingCategoryTransaction.delete({ where: { id: transaction.id } });
      break;

    case 'Budget':
      await prisma.budgetAccount.update({
        where: { id: transaction.fromBudgetAccountId },
        data: {
          currentBalance: {
            increment: transaction.amount,
          },
        },
      });

      await prisma.budgetAccount.update({
        where: { id: transaction.toBudgetAccountId },
        data: {
          currentBalance: {
            decrement: transaction.amount,
          },
        },
      });

      await prisma.budgetAccountTransaction.delete({ where: { id: transaction.id } });
      break;

    case 'Goal':
      await prisma.goal.update({
        where: { id: transaction.fromAccountId },
        data: {
          currentBalance: {
            increment: transaction.amount,
          },
        },
      });

      await prisma.goal.update({
        where: { id: transaction.toAccountId },
        data: {
          currentBalance: {
            decrement: transaction.amount,
          },
        },
      });

      await prisma.goalTransaction.delete({ where: { id: transaction.id } });
      break;

    case 'Income':
      await prisma.incomeSourceTransaction.delete({ where: { id: transaction.id } });
      break;

    default:
      return NextResponse.json({ errorMessage: 'Invalid transaction type' });
  }
}

export async function createTransaction(
  newData: NewTransactionData,
  fromAccountType: string,
  toAccountType: string,
) {
  switch (true) {
    case fromAccountType === 'Income' && ['Debit', 'Credit'].includes(toAccountType):
      await prisma.incomeSourceTransaction.create({
        data: {
          userId: newData.userId,
          fromIncomeSourceId: newData.fromAccountId,
          amount: newData.amount,
          description: newData.description,
        },
      });
      break;

    case ['Debit', 'Credit', 'Debt', 'Goal'].includes(fromAccountType) &&
      ['Debit', 'Credit', 'Debt', 'Goal'].includes(toAccountType):
      const fromBudgetAccount =
        fromAccountType === 'Goal'
          ? await prisma.goal.findUnique({ where: { id: newData.fromAccountId } })
          : await prisma.budgetAccount.findUnique({ where: { id: newData.fromAccountId } });

      const toBudgetAccount =
        toAccountType === 'Goal'
          ? await prisma.goal.findUnique({ where: { id: newData.toAccountId } })
          : await prisma.budgetAccount.findUnique({ where: { id: newData.toAccountId } });

      if (!fromBudgetAccount || !toBudgetAccount) {
        return NextResponse.json({
          errorMessage: 'Account does not exist',
        });
      }

      if (fromAccountType === 'Goal' && toAccountType === 'Goal') {
        await prisma.goalTransaction.create({
          data: {
            userId: newData.userId,
            fromAccountId: newData.fromAccountId,
            toAccountId: newData.toAccountId,
            amount: newData.amount,
            description: newData.description,
          },
        });

        await prisma.goal.update({
          where: { id: newData.fromAccountId },
          data: {
            currentBalance: {
              decrement: newData.amount,
            },
          },
        });

        await prisma.goal.update({
          where: { id: newData.toAccountId },
          data: {
            currentBalance: {
              increment: newData.amount,
            },
          },
        });
      } else {
        await prisma.budgetAccountTransaction.create({
          data: {
            userId: newData.userId,
            fromBudgetAccountId: newData.fromAccountId,
            toBudgetAccountId: newData.toAccountId,
            amount: newData.amount,
            description: newData.description,
          },
        });

        await prisma.budgetAccount.update({
          where: { id: newData.fromAccountId },
          data: {
            currentBalance: {
              decrement: newData.amount,
            },
          },
        });

        await prisma.budgetAccount.update({
          where: { id: newData.toAccountId },
          data: {
            currentBalance: {
              increment: newData.amount,
            },
          },
        });
      }
      break;

    case ['Debit', 'Credit', 'Debt'].includes(fromAccountType) &&
      toAccountType === 'Spending Category':
      await prisma.spendingCategoryTransaction.create({
        data: {
          userId: newData.userId,
          transactionsTo: newData.toAccountId,
          amount: newData.amount,
          description: newData.description,
        },
      });
      break;

    default:
      return NextResponse.json({ errorMessage: 'Invalid transaction type' });
  }
}
