import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';
import { incomeAccountSchema } from '@/utils/schemas';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const { title, description, icon } = await request.json();
    const { id } = await params;

    const validatedData = incomeAccountSchema.parse({
      title,
      description,
      icon,
      userId,
    });

    const existingAccount = await prisma.incomeSource.findUnique({
      where: { id, userId },
    });

    if (!existingAccount) {
      return NextResponse.json({
        errorMessage: "You don't have permission to edit this income account",
      });
    }

    if (validatedData) {
      await prisma.incomeSource.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          icon,
        },
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        errorMessage: 'Data provided for Income Account update is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during account updating');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while updating income account.',
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

    const existingAccount = await prisma.incomeSource.findUnique({
      where: { id, userId },
    });

    if (!existingAccount) {
      return NextResponse.json({
        errorMessage: "You don't have permission to delete this income account",
      });
    }

    await prisma.incomeSource.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error during account deletion:', e);
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while deleting income account.',
    });
  }
}
