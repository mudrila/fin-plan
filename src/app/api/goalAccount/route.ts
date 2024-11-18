import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';
import { goalAccountSchema } from '@/utils/schemas';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

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
      await prisma.goals.create({
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
