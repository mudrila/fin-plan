import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';
import { budgetAccountSchema } from '@/utils/schemas';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const { title, description, icon, monthlyLimit, type, currentBalance } = await request.json();

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
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        errorMessage: 'Data provided for Budget Account creation is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during account creation');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while creating budget account.',
    });
  }
}
