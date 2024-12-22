import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';

interface HandlerContext {
  userId: string;
  params: Promise<{ id: string }>;
}

type HandlerFunction = (request: Request, context: HandlerContext) => Promise<NextResponse>;

export function authWrapper(handler: HandlerFunction): HandlerFunction {
  return async function requestHandler(request: Request, context: HandlerContext) {
    try {
      const session = await auth();
      const userId = session?.user?.id;

      if (!userId) {
        return NextResponse.json({ errorMessage: 'No user session' });
      }

      return await handler(request, { ...context, userId });
    } catch (error) {
      console.error('Authorization error:', error);
      return NextResponse.json({ errorMessage: 'Authorization failed' });
    }
  };
}
