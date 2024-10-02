import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      console.error('No userId');
      return NextResponse.json({
        errorMessage: 'Something went wrong',
      });
    }

    const budgetAccounts = await prisma.budgetAccount.findMany({
      where: { userId },
    });

    return NextResponse.json(budgetAccounts);
  } catch (e) {
    console.error(e, 'Error during getting accounts');
    return NextResponse.json({
      errorMessage: 'Something went wrong',
    });
  }
}
