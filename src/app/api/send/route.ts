import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { audienceId, providerId, providerType } from '@/constants/content';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY is not set');
      return NextResponse.json({
        errorMessage: 'Server configuration error. Please try again later.',
      });
    }

    const { email, name } = await request.json();

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
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (userAccountId && user) {
      await prisma.account.create({
        data: {
          providerAccountId: userAccountId,
          userId: user.id,
          providerId,
          providerType,
        },
      });
    } else {
      return NextResponse.json({
        errorMassage: 'Required data is missing from the request payload',
      });
    }

    return NextResponse.json({
      message: 'Your email successfully subscribed for most necessary security updates!',
    });
  } catch (error) {
    return NextResponse.json({ errorMassage: 'Something went wrong' });
  }
}
