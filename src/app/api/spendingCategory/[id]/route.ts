import { NextResponse } from 'next/server';
import { checkUser } from '@/utils/decorators';
import prisma from '@/utils/prisma';
import { incomeAccountSchema } from '@/utils/schemas';

async function putHandler(
  request: Request,
  { params, userId }: { params: Promise<{ id: string }>; userId: string },
) {
  try {
    const { title, description, icon } = await request.json();
    const { id } = await params;

    const validatedData = incomeAccountSchema.parse({
      title,
      description,
      icon,
      userId,
    });

    const existingAccount = await prisma.spendingCategory.findUnique({
      where: { id, userId },
    });

    if (!existingAccount) {
      return NextResponse.json({
        errorMessage: "You don't have permission to edit this spending category",
      });
    }

    if (validatedData) {
      await prisma.spendingCategory.update({
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
        errorMessage: 'Data provided for Spending Category update is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during account updating');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while updating spending category.',
    });
  }
}

async function deleteHandel(
  request: Request,
  { params, userId }: { params: Promise<{ id: string }>; userId: string },
) {
  try {
    const { id } = await params;

    const existingAccount = await prisma.spendingCategory.findUnique({
      where: { id, userId },
    });

    if (!existingAccount) {
      return NextResponse.json({
        errorMessage: "You don't have permission to delete this spending category",
      });
    }

    await prisma.spendingCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error during account deletion:', e);
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while deleting spending category.',
    });
  }
}

export const PUT = checkUser(putHandler);
export const DELETE = checkUser(deleteHandel);
