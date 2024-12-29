import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/utils/auth';
import {
  createTransaction,
  deleteTransaction,
  findTransactionById,
  updateTransaction,
} from '@/utils/transactionHandler';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const { id } = await params;
    const {
      fromAccountId,
      toAccountId,
      amount,
      description = '',
      fromAccountType,
      toAccountType,
    } = await request.json();

    const transactionSchema = z.object({
      userId: z.string().min(1),
      fromAccountId: z.string().min(1),
      toAccountId: z.string().min(1),
      amount: z.preprocess(
        val => Number(val),
        z.number().min(0, 'Amount must be a positive number'),
      ),
      description: z.string(),
    });

    const validatedData = transactionSchema.parse({
      userId,
      fromAccountId,
      toAccountId,
      amount,
      description,
    });

    const existingTransaction = await findTransactionById(id);

    if (!existingTransaction) {
      return NextResponse.json({ errorMessage: 'Transaction not found' });
    }

    const isSameType =
      existingTransaction.fromType.includes(fromAccountType) &&
      existingTransaction.toType.includes(toAccountType);

    if (isSameType) {
      await updateTransaction(validatedData, fromAccountType, toAccountType, id);
    } else {
      await deleteTransaction(existingTransaction);
      await createTransaction(validatedData, fromAccountType, toAccountType);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e, 'Error processing transaction');
    return NextResponse.json({
      errorMessage: 'Unexpected error occurred while processing the transaction',
    });
  }
}
