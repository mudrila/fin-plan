import { NextResponse } from 'next/server';
import { checkUser } from '@/utils/decorators';
import prisma from '@/utils/prisma';
import { goalAccountSchema } from '@/utils/schemas';

async function postHandle(request: Request, { userId }: { userId: string }) {
  try {
    const { title, description, icon, monthlyTarget, currentBalance } = await request.json();

    const validatedData = goalAccountSchema.parse({
      title,
      description,
      icon,
      monthlyTarget,
      currentBalance,
      userId,
    });

    if (validatedData) {
      await prisma.goal.create({
        data: {
          userId,
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
        errorMessage: 'Data provided for Goal creation is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during goal creation');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while creating goal account.',
    });
  }
}

export const POST = checkUser(postHandle);
