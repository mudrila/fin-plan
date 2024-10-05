import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';
import { budgetAccountSchema } from '@/utils/schemas';

export async function PUT(request: Request) {
  try {
    const { title, description, icon, monthlyLimit, type, currentBalance, id } =
      await request.json();
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const validatedData = budgetAccountSchema.parse({
      title,
      description,
      icon,
      monthlyLimit,
      type,
      currentBalance,
      userId,
    });

    const existingAccount = await prisma.budgetAccount.findUnique({
      where: { id },
    });

    if (!existingAccount || existingAccount.userId !== userId) {
      return NextResponse.json({
        errorMessage: "You don't have permission to edit this account",
      });
    }

    if (validatedData) {
      await prisma.budgetAccount.update({
        where: {
          id,
        },
        data: {
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
    console.error(e, 'Error during account updating');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while updating budget account.',
    });
  }
}
