import { NextResponse } from 'next/server';
import { auth } from '@/utils/auth';

interface HandlerContext {
  userId: string;
  params: { id: string };
}

type HandlerFunction = (request: Request, context: HandlerContext) => Promise<NextResponse>;

export function checkUser(handler: HandlerFunction): HandlerFunction {
  return async function (request: Request, context: HandlerContext) {
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
