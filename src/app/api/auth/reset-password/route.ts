import { NextResponse } from 'next/server';
import { passwordRegex } from '@/constants/content';
import { generateHashPassword } from '@/utils';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const { email, otp, password } = await request.json();

    if (password) {
      if (!password.match(passwordRegex)) {
        return NextResponse.json({
          message: "Password doesn't match required security parameters",
        });
      }
    } else {
      return NextResponse.json({ message: "New password wasn't sent" });
    }

    const verificationRequest = await prisma.verificationRequest.findFirst({
      where: {
        identifier: email,
        token: otp,
        expires: { gte: new Date() },
      },
    });

    if (!verificationRequest) {
      return NextResponse.json({ errorMessage: "Verification token wasn't found or expired" });
    }

    const passwordHash = await generateHashPassword(password);

    await prisma.user.update({
      where: { email },
      data: {
        password: passwordHash.hash,
      },
    });

    return NextResponse.json({ message: 'Your password updated!' });
  } catch (e) {
    console.error(e, 'Error during updating password');
    return NextResponse.json({
      errorMessage:
        "Unexpected error happened during updating password. Please, try again later or cry - idk, we don't care right now",
    });
  }
}
