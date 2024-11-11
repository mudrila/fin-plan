import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        errorMessage: 'User with such email not found. Please chech our email',
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    function generateOTP() {
      const digits = '0123456789';
      let OTP = '';
      const len = digits.length;
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * len)];
      }
      return OTP;
    }
    const otpCode = generateOTP();

    await prisma.verificationRequest.create({
      data: {
        identifier: email,
        token: otpCode,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    const { error } = await resend.emails.send({
      from: 'Noreply <noreply@yfp.io>',
      to: [email],
      subject: 'Verification Code',
      text: otpCode,
    });

    if (error) {
      return NextResponse.json({ errorMessage: error.message });
    }

    return NextResponse.json({ message: 'Code sended!' });
  } catch (e) {
    console.error(e, 'Error during sending your code');
    return NextResponse.json({
      errorMessage:
        "Unexpected error happened. Please, try again later or cry - idk, we don't care right now",
    });
  }
}

export async function PUT(request: Request) {
  try {
    const { email, otp } = await request.json();

    const verificationRequest = await prisma.verificationRequest.findFirst({
      where: {
        identifier: email,
        token: otp,
        expires: { gte: new Date() },
      },
    });

    if (!verificationRequest) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({ valid: true });
  } catch (e) {
    console.error(e, 'Error during verifying your code');
    return NextResponse.json({
      errorMessage:
        "Unexpected error happened. Please, try again later or cry - idk, we don't care right now",
    });
  }
}
