import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';
import { goalAccountSchema } from '@/utils/schemas';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const { title, description, icon, monthlyTarget, currentBalance } = await request.json();
    const { id } = await params;

    const validatedData = goalAccountSchema.parse({
      title,
      description,
      icon,
      monthlyTarget,
      currentBalance,
      userId,
    });

    const existingAccount = await prisma.goal.findUnique({
      where: { id, userId },
    });

    if (!existingAccount) {
      return NextResponse.json({
        errorMessage: "You don't have permission to edit this goal account",
      });
    }

    if (validatedData) {
      await prisma.goal.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          icon,
          monthlyTarget,
          currentBalance,
        },
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        errorMessage: 'Data provided for Goal Account update is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during goal updating');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while updating goal account.',
    });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const { id } = await params;

    const existingAccount = await prisma.goal.findUnique({
      where: { id, userId },
    });

    if (!existingAccount) {
      return NextResponse.json({
        errorMessage: "You don't have permission to delete this goal account",
      });
    }

    await prisma.goal.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error during goal deletion:', e);
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while deleting goal account.',
    });
  }
}
