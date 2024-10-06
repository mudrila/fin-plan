'use client';

import { Box, Button, Toolbar, useColorScheme } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';
import { AppBar } from './components';
import ThemeModeSwitch from '@/components/atoms/ThemeModeSwitch/ThemeModeSwitch';
import { APP_NAME } from '@/constants/content';

export default function LandingHeader() {
  const session = useSession();
  const { mode } = useColorScheme();
  return (
    <AppBar
      position="fixed"
      open={false}
      sx={{
        backgroundColor: 'rgba(143,150,191,.1)',
        backdropFilter: 'blur(8px)',
        borderRadius: '12px',
        maxWidth: '1440px',
        width: 'calc(100vw - 24px)',
        mt: 1,
        mx: 'auto',
        left: '0',
      }}
    >
      <Toolbar sx={{ width: '100%', display: 'flex', px: 1.5, justifyContent: 'space-between' }}>
        <NextLink href="/">
          <Box
            display="flex"
            height="100%"
            alignItems="center"
          >
            <Image
              src={
                mode === 'light'
                  ? '/img/logo/color-logo-short.svg'
                  : '/img/logo/white-logo-short.svg'
              }
              alt={`${APP_NAME} Logo`}
              height={56}
              width={80}
            />
          </Box>
        </NextLink>
        <Box
          display="flex"
          gap={2}
        >
          <ThemeModeSwitch />
          {session?.data?.user ? (
            <Button
              component={NextLink}
              href="/app"
              variant="contained"
              color="primary"
            >
              Go to App
            </Button>
          ) : (
            <>
              <Button
                component={NextLink}
                href="/sign-up"
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <Button
                component={NextLink}
                href="/sign-in"
                variant="outlined"
                color="secondary"
              >
                Sign In
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
