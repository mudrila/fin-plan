import { Box, Button, Toolbar } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { AppBar } from './components';
import { APP_NAME } from '@/constants/content';

export default function LandingHeader() {
  return (
    <AppBar
      position="fixed"
      open={false}
      sx={{
        backgroundImage: 'unset',
        backgroundColor: 'rgba(143,150,191,.1)',
        backdropFilter: 'blur(8px)',
        borderRadius: '40px',
        maxWidth: '1440px',
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
              src="/img/logo-full.svg"
              alt={`${APP_NAME} Logo`}
              height={22}
              width={149}
            />
          </Box>
        </NextLink>
        <Box
          display="flex"
          gap={2}
        >
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
