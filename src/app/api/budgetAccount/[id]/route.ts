import { NextResponse } from 'next/server';
import { checkUser } from '@/utils/decorators';
import prisma from '@/utils/prisma';
import { budgetAccountSchema } from '@/utils/schemas';

async function putHandler(
  request: Request,
  { params, userId }: { params: Promise<{ id: string }>; userId: string },
) {
  try {
    const { title, description, icon, type, currentBalance } = await request.json();
    const { id } = await params;

    const validatedData = budgetAccountSchema.parse({
      title,
      description,
      icon,
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

async function deleteHandel(
  request: Request,
  { params, userId }: { params: Promise<{ id: string }>; userId: string },
) {
  try {
    const { id } = await params;

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

export const PUT = checkUser(putHandler);
export const DELETE = checkUser(deleteHandel);
