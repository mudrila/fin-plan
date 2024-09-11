import { Container, Box } from '@mui/material';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sign Up | Fin-Plan',
};

export default function SignUpLayout({ children }: PropsWithChildren) {
  return (
    <Container
      component="main"
      maxWidth="sm"
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
