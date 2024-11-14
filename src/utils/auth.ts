import { PrismaAdapter } from '@auth/prisma-adapter';
import { User } from '@prisma/client';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma';
import { generateHashPassword } from './';
import { providerId } from '@/constants/content';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: providerId,
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        let user: User | null = null;
        if (
          !credentials?.email ||
          !credentials.password ||
          typeof credentials.email !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }
        const passwordHash = await generateHashPassword(credentials.password);

        user = await prisma.user.findFirst({
          where: { email: credentials.email, password: passwordHash.hash },
        });

        if (!user) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
});
