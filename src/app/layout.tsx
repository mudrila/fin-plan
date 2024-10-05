import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_SHORT_NAME,
  GITHUB_NAME,
  PROD_DOMAIN,
  TWITTER_NAME,
} from '@/constants/content';
import theme from '@/theme';

export const metadata: Metadata = {
  title: APP_SHORT_NAME,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_SHORT_NAME,
    description: APP_DESCRIPTION,
    url: PROD_DOMAIN,
    siteName: APP_NAME,
    images: [`${PROD_DOMAIN}/img/hero-brand.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${TWITTER_NAME}`,
    title: APP_SHORT_NAME,
    description: APP_DESCRIPTION,
    images: [`${PROD_DOMAIN}/img/hero-brand.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: APP_NAME, url: `https://github.com/${GITHUB_NAME}` }],
  alternates: {
    canonical: PROD_DOMAIN,
  },
  keywords: [
    'Financial Planning',
    'Finances',
    'Budgetting',
    'Budget Planning',
    'Personal Finances',
    'Personal Financial Plan',
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/favicon.png"
        />
        <link
          rel="icon"
          href="/favicon.png"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster
              position="top-center"
              richColors
            />
            <SessionProvider>{children}</SessionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
