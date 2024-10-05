import { Container, Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import React from 'react';

export default function AuthPagesLayout({ children }: PropsWithChildren) {
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
