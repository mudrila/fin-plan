import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';

export default auth(req => {
  const secret = process.env.AUTH_SECRET;
  const salt = process.env.PASSWORD_SALT;

  if (!secret || !salt) {
    throw new Error(
      'AUTH_SECRET and PASSWORD_SALT are not set - application would not work properly!',
    );
  }

  const sessionUser = req.auth?.user;
  const { pathname } = req.nextUrl;

  if (sessionUser && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/app', req.url));
  }

  if (!sessionUser && pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/app/:path*', '/sign-in', '/sign-up'],
};
