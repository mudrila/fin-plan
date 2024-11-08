'use client';

import { Box, Container, useColorScheme, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';
import LandingHeader from '@/components/organisms/Navigation/LandingHeader';

export default function LandingLayout({ children }: PropsWithChildren) {
  const { mode } = useColorScheme();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.dark} 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light} 100%)`,
      }}
    >
      <LandingHeader />
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 8 },
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
