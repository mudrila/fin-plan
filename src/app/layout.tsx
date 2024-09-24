import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import theme from '@/theme';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
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
