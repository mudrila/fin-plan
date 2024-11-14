import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  audienceId,
  providerId,
  providerType,
  emailRegex,
  passwordRegex,
} from '@/constants/content';
import { generateHashPassword } from '@/utils';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (email && password) {
      if (!email.match(emailRegex) || !password.match(passwordRegex)) {
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

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash.hash,
      },
    });

    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const contact = await resend.contacts.create({
      email,
      firstName: name,
      unsubscribed: false,
      audienceId,
    });

    if (!contact) {
      return NextResponse.json({
        errorMessage: 'Server error. Please try again later.',
      });
    }

    const userAccountId = contact.data?.id;

    if (userAccountId && newUser) {
      await prisma.account.create({
        data: {
          providerAccountId: userAccountId,
          userId: newUser.id,
          providerId,
          providerType,
        },
      });
    } else {
      return NextResponse.json({
        errorMassage: 'Required data is missing from the request payload',
      });
    }

    return NextResponse.json({ message: 'Signed Up!' });
  } catch (e) {
    console.error(e, 'Error during Sign Up');
    return NextResponse.json({
      errorMessage:
        "Unexpected error happened during sign up. Please, try again later or cry - idk, we don't care right now",
    });
  }
}
