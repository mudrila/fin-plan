import { NextResponse } from 'next/server';
import { z } from 'zod';
import { accountTypes } from '@/constants/content';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const { title, description, icon, monthlyLimit, type, currentBalance, userId } =
      await request.json();

    const BudgetAccountTypeEnum = z.enum(accountTypes);

    const budgetAccountSchema = z.object({
      title: z.string().min(1, 'Title is required'),
      description: z.string().optional(),
      icon: z.string().optional(),
      monthlyLimit: z.preprocess(
        val => Number(val),
        z.number().min(0, 'Monthly limit must be a positive number'),
      ),
      type: BudgetAccountTypeEnum.default('Debit'),
      currentBalance: z.preprocess(val => Number(val), z.number()),
      userId: z.string().min(1),
    });

    const validatedData = budgetAccountSchema.parse({
      title,
      description,
      icon,
      monthlyLimit,
      type,
      currentBalance,
      userId,
    });

    if (validatedData) {
      await prisma.budgetAccount.create({
        data: {
          userId,
          title,
          description,
          icon,
          monthlyLimit,
          type,
          currentBalance,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e, 'Error during account creation');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while creating budget account.',
    });
  }
}
