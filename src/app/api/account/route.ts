import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { emailRegex, passwordRegex } from '@/constants/content';
import { generateHashPassword } from '@/utils';
import { auth } from '@/utils/auth';
import prisma from '@/utils/prisma';

type UpdateData = {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
};

export async function PUT(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    const { name, email, password, image } = await request.json();
    const updateData: UpdateData = {};

    if (!name && !email && !password && !image) {
      return NextResponse.json({ errorMessage: 'Nothing to update' });
    }

    if (name) {
      updateData.name = name;
    }

    if (image) {
      updateData.image = image;
    }

    if (email) {
      if (!email.match(emailRegex)) {
        return NextResponse.json({ errorMessage: 'Invalid email format' });
      }
      updateData.email = email;
    }

    if (password) {
      if (!password.match(passwordRegex)) {
        return NextResponse.json({ errorMessage: 'Invalid password format' });
      }
      const passwordHash = await generateHashPassword(password);
      updateData.password = passwordHash.hash;
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e, 'Error during user updating');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while updating user.',
    });
  }
}

export async function DELETE() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ errorMessage: 'No user session' });
    }

    await prisma.user.delete({ where: { id: userId } });
    const cookiesInstance = await cookies();
    cookiesInstance.delete('next-auth.session-token');
    cookiesInstance.delete('next-auth.csrf-token');

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e, 'Error during user deletion');
    return NextResponse.json({
      errorMessage: 'Unexpected error happened while deleting user.',
    });
  }
}
