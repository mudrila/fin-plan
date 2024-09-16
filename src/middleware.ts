import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const salt = process.env.PASSWORD_SALT;

  if (!secret || !salt) {
    throw new Error('You need to set AUTH_SECRET and PASSWORD_SALT');
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
}

export const config = {
  matcher: ['/app/:path*', '/sign-in', '/sign-up'],
};
