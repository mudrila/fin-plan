import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
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
            {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
