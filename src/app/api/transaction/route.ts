import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const { fromBudgetAccountId, toBudgetAccountId, amount, description } = await request.json();

    const budgetAccountTransactionSchema = z.object({
      userId: z.string().min(1),
      fromBudgetAccountId: z.string().min(1),
      toBudgetAccountId: z.string().min(1),
      amount: z.preprocess(
        val => Number(val),
        z.number().min(0, 'Amount must be a positive number'),
      ),
      description: z.string().optional(),
    });

    const validatedData = budgetAccountTransactionSchema.parse({
      userId,
      fromBudgetAccountId,
      toBudgetAccountId,
      amount,
      description,
    });

    if (validatedData) {
      const fromAccount = await prisma.budgetAccount.findUnique({
        where: { id: fromBudgetAccountId },
      });

      const toAccount = await prisma.budgetAccount.findUnique({
        where: { id: toBudgetAccountId },
      });

      if (!fromAccount || !toAccount) {
        return NextResponse.json({
          errorMessage: 'Account does not exist.',
        });
      }

      await prisma.budgetAccountTransaction.create({
        data: {
          userId,
          fromBudgetAccountId,
          toBudgetAccountId,
          amount,
          description,
        },
      });

      await prisma.budgetAccount.update({
        where: { id: fromBudgetAccountId },
        data: { currentBalance: Number(fromAccount.currentBalance) - amount },
      });

      await prisma.budgetAccount.update({
        where: { id: toBudgetAccountId },
        data: { currentBalance: Number(toAccount.currentBalance) + amount },
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        errorMessage: 'Data provided for making transaction is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during making transaction');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while making transaction.',
    });
  }
}
