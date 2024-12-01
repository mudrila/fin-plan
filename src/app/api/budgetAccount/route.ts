import { NextResponse } from 'next/server';
import { checkUser } from '@/utils/decorators';
import prisma from '@/utils/prisma';
import { budgetAccountSchema } from '@/utils/schemas';

async function postHandle(request: Request, { userId }: { userId: string }) {
  try {
    const { title, description, icon, type, currentBalance } = await request.json();

    const validatedData = budgetAccountSchema.parse({
      title,
      description,
      icon,
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

export const POST = checkUser(postHandle);
