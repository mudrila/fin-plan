import { NextResponse } from 'next/server';
import { emailRegex, passwordRegex } from '@/constants/content';
import { generateHashPassword } from '@/utils';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (email && password) {
      if (!email.match(emailRegex) && !password.match(passwordRegex)) {
        return NextResponse.json({ message: 'Please check our email and password' });
      }
    } else {
      return NextResponse.json({ message: 'Please enter email and password' });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      return NextResponse.json({ errorMessage: 'User with such email already exists' });
    }

    const passwordHash = await generateHashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash.hash,
      },
    });

    return NextResponse.json({ message: 'Signed Up!' });
  } catch (e) {
    console.error(e, 'Error during Sign Up');
    return NextResponse.json({
      errorMessage:
        "Unexpected error happened during sign up. Please, try again later or cry - idk, we don't care right now",
    });
  }
}
