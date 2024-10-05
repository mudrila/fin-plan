import { Alice, Lato } from 'next/font/google';

export const aliceFont = Alice({
  weight: '400',
  display: 'swap',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-alice',
});
export const latoFont = Lato({
  weight: ['100', '300', '400', '700'],
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lato',
});
