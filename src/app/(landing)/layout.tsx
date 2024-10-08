'use client';

import { Box, Container, useColorScheme } from '@mui/material';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import LandingHeader from '@/components/organisms/Navigation/LandingHeader';

export default function LandingLayout({ children }: PropsWithChildren) {
  const { mode } = useColorScheme();
  return (
    <>
      <LandingHeader />
      <Container
        component="main"
        sx={{
          pt: 'calc(56px + 64px)',
          minHeight: '100vh',
          minWidth: '100vw',
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          position="absolute"
          minWidth="100vw"
          minHeight="100vh"
          height="100%"
          width="100%"
          top={0}
          left={0}
          zIndex={-1}
        >
          <Image
            src={
              mode === 'dark' ? '/img/hero-background-dark.png' : '/img/hero-background-light.jpg'
            }
            alt="Hero Background"
            fill
          />
        </Box>
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {children}
        </Box>
      </Container>
    </>
  );
}
