import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';
import { incomeAccountSchema } from '@/utils/schemas';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

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
