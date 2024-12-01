import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkUser } from '@/utils/decorators';
import prisma from '@/utils/prisma';

async function postHandler(request: Request, { userId }: { userId: string }) {
  try {
    const { fromAccountId, toAccountId, amount, description, fromAccountType, toAccountType } =
      await request.json();

    const accountTransactionSchema = z.object({
      userId: z.string().min(1),
      fromAccountId: z.string().min(1),
      toAccountId: z.string().min(1),
      amount: z.preprocess(
        val => Number(val),
        z.number().min(0, 'Amount must be a positive number'),
      ),
      description: z.string().optional(),
    });

    const validatedData = accountTransactionSchema.parse({
      userId,
      fromAccountId,
      toAccountId,
      amount,
      description,
    });

    if (validatedData) {
      switch (true) {
        case fromAccountType === 'Income' && ['Debit', 'Credit'].includes(toAccountType):
          const fromIncomeAccount = await prisma.incomeSource.findUnique({
            where: { id: fromAccountId },
          });

          const toIncomeAccount = await prisma.budgetAccount.findUnique({
            where: { id: toAccountId },
          });

          if (!fromIncomeAccount || !toIncomeAccount) {
            return NextResponse.json({
              errorMessage: 'Account does not exist.',
            });
          }

          await prisma.incomeSourceTransaction.create({
            data: {
              userId,
              fromIncomeSourceId: fromAccountId,
              amount,
              description,
            },
          });
          break;

        case ['Debit', 'Credit', 'Debt', 'Goal'].includes(fromAccountType) &&
          ['Debit', 'Credit', 'Debt', 'Goal'].includes(toAccountType):
          const fromBudgetAccount =
            fromAccountType === 'Goal'
              ? await prisma.goal.findUnique({ where: { id: fromAccountId } })
              : await prisma.budgetAccount.findUnique({ where: { id: fromAccountId } });

          const toBudgetAccount =
            toAccountType === 'Goal'
              ? await prisma.goal.findUnique({ where: { id: toAccountId } })
              : await prisma.budgetAccount.findUnique({ where: { id: toAccountId } });

          if (!fromBudgetAccount || !toBudgetAccount) {
            return NextResponse.json({
              errorMessage: 'Account does not exist.',
            });
          }

          if (fromAccountType === 'Goal' && toAccountType === 'Goal') {
            await prisma.goalTransaction.create({
              data: {
                userId,
                fromAccountId,
                toAccountId,
                amount,
                description,
              },
            });
          } else {
            await prisma.budgetAccountTransaction.create({
              data: {
                userId,
                fromBudgetAccountId: fromAccountId,
                toBudgetAccountId: toAccountId,
                amount,
                description,
              },
            });
          }
          break;

        case ['Debit', 'Credit', 'Debt'].includes(fromAccountType) &&
          toAccountType === 'SpendingCategory':
          const fromSpendAccount = await prisma.budgetAccount.findUnique({
            where: { id: fromAccountId },
          });

          const toSpendAccount = await prisma.spendingCategory.findUnique({
            where: { id: toAccountId },
          });

          if (!fromSpendAccount || !toSpendAccount) {
            return NextResponse.json({
              errorMessage: 'Account does not exist.',
            });
          }

          await prisma.spendingCategoryTransaction.create({
            data: {
              userId,
              transactionsTo: toAccountId,
              amount,
              description,
            },
          });
          break;

        default:
          return NextResponse.json({ errorMessage: 'Invalid transaction types' });
      }
    } else {
      return NextResponse.json({
        errorMessage: 'Data provided for making transaction is invalid!',
      });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e, 'Error during making transaction');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while making transaction.',
    });
  }
}

export const POST = checkUser(postHandler);
