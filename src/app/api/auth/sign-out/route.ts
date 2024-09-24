import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Successfully signed out' });

    response.cookies.set('next-auth.session-token', '', { maxAge: 0, path: '/' });
    response.cookies.set('next-auth.callback-url', '', { maxAge: 0, path: '/' });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Sign out failed' }, { status: 500 });
  }
}
