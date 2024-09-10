import { Container, Box, Typography, Stack } from '@mui/material';
import React from 'react';

interface SignUpContainerProps {
  children: React.ReactNode;
}

export default function SignUpContainer({ children }: SignUpContainerProps) {
  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
        >
          Sign Up
        </Typography>
        <Stack
          sx={{
            justifyContent: 'center',
            p: 2,
          }}
        >
          {children}
        </Stack>
      </Box>
    </Container>
  );
}
