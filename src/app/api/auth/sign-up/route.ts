import { NextResponse } from 'next/server';
import { generateHashPassword } from '@/utils';
import { signIn } from '@/utils/auth';
import { prisma } from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (user) {
      return NextResponse.json({ errorMessage: 'User with such email already exists' });
    }

    const passwordHash = await generateHashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash.hash,
      },
    });

    if (newUser.id) {
      const signInResponse = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      if (signInResponse?.error) {
        return NextResponse.json({ errorMessage: signInResponse.error });
      }

      return NextResponse.json({ message: 'User created and signed successfully' });
    }
  } catch (error) {
    return NextResponse.json({ errorMessage: error });
  }
}
