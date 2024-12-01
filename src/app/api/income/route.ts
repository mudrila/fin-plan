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
      await prisma.incomeSource.create({
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
        errorMessage: 'Data provided for Income Account creation is invalid!',
      });
    }
  } catch (e) {
    console.error(e, 'Error during income account creation');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while creating income account.',
    });
  }
}

export const POST = checkUser(postHandler);
