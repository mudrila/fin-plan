import { NextResponse } from 'next/server';
import { checkUser } from '@/utils/decorators';
import prisma from '@/utils/prisma';
import { incomeAccountSchema } from '@/utils/schemas';

async function postHandler(request: Request, { userId }: { userId: string }) {
  try {
    const { title, description, icon } = await request.json();

    const validatedData = incomeAccountSchema.parse({
      title,
      description,
      icon,
      userId,
    });

    if (validatedData) {
      await prisma.spendingCategory.create({
        data: {
          userId,
          title,
          description,
          icon,
        },
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        errorMessage: 'Data provided for Spending Category creation is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during spending category creation');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while creating spending category.',
    });
  }
}

export const POST = checkUser(postHandler);
