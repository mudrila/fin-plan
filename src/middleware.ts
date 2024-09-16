import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
    salt: process.env.PASSWORD_SALT!,
  });

  const { pathname } = req.nextUrl;

  if (token && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/app', req.url));
  }

  if (!token && pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/sign-in', '/sign-up'],
};
