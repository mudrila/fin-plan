import { NextResponse } from 'next/server';
import { generateHashPassword } from '@/utils';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const passwordHash = await generateHashPassword(password);

    const user = await prisma.user.findFirst({
      where: { email, password: passwordHash.hash },
    });

    if (!user) {
      return NextResponse.json({
        errorMessage: 'User with given email / password combination was not found',
      });
    }

    return NextResponse.json({ message: 'Signed in!' });
  } catch (e) {
    console.error(e, 'Error during Sign In');
		return NextResponse.json({
      errorMessage:
        "Unexpected error happened during sign in. Please, try again later or cry - idk, we don't care right now",
    });
  }
}
