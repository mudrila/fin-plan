import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    const contact = resend.contacts.create({
      email: email,
      firstName: name,
      unsubscribed: false,
      audienceId: '274752ed-c875-4c06-aa9e-984d5b96df11',
    });

    const userAccountId = (await contact).data?.id;
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (userAccountId && user) {
      await prisma.account.create({
        data: {
          providerAccountId: userAccountId,
          userId: user.id,
          providerId: 'email-and-password',
          providerType: 'CredantialsProvider',
        },
      });
    } else {
      return NextResponse.json({ errorMassage: 'Please check our creadentials' });
    }

    return NextResponse.json({ message: 'Added to audience!' });
  } catch (error) {
    return NextResponse.json({ errorMassage: 'Something went wrong' });
  }
}
