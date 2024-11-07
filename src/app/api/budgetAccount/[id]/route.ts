import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';
import { budgetAccountSchema } from '@/utils/schemas';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const { title, description, icon, monthlyLimit, type, currentBalance } = await request.json();
    const { id } = await params;

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
      where: { id, userId },
    });

    if (!existingAccount) {
      return NextResponse.json({
        errorMessage: "You don't have permission to edit this budget account",
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
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        errorMessage: 'Data provided for Budget Account update is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during account updating');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while updating budget account.',
    });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const id = params.id;

    const existingAccount = await prisma.budgetAccount.findUnique({
      where: { id, userId },
    });

    if (!existingAccount) {
      return NextResponse.json({
        errorMessage: "You don't have permission to edit this budget account",
      });
    }

    await prisma.budgetAccount.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e, 'Error during account deletion');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while deletion budget account.',
    });
  }
}
