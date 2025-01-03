'use client';

import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { StyledLink } from '@/components/atoms/Link/StyledNextLink';
import EmailInput from '@/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/components/molecules/Inputs/PasswordInput/PasswordInput';
import { providerId } from '@/constants/content';
import {
  paperDarkBackground,
  paperDarkBorder,
  paperDarkBoxShadow,
  paperLightBackground,
  paperLightBorder,
  paperLightBoxShadow,
} from '@/theme/tokens';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const isFormValid = !emailError && !passwordError;

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    if (isFormValid) {
      try {
        const result = await signIn(providerId, {
          redirectTo: '/app',
          email,
          password,
          redirect: false,
        });
        if (!result || !!result.error || !result.ok) {
          toast.error('User with given email and password was not found', {
            duration: 3000,
          });
        } else if (result.ok) {
          toast.success('Welcome on board!', { duration: 3000 });
          window.location.href = `/app?t=${Date.now()}`;
        }
      } catch (e) {
        console.error(e, 'Unexpected error while logging in');
        toast.error('Unexpected error while processing login. Please, try again later', {
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
        background: theme.palette.mode === 'light' ? paperLightBackground : paperDarkBackground,
        backdropFilter: 'blur(20px)',
        boxShadow: theme.palette.mode === 'light' ? paperLightBoxShadow : paperDarkBoxShadow,
        border: `1px solid ${theme.palette.mode === 'light' ? paperLightBorder : paperDarkBorder}`,
        borderRadius: 3,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <CardHeader
        title="Sign In"
        sx={{
          pb: 0,
          '& .MuiCardHeader-title': {
            variant: 'h4',
            fontWeight: 700,
          },
          '& .MuiCardHeader-content': {
            overflow: 'visible',
          },
        }}
      />
      <CardContent sx={{ pt: 4 }}>
        <Stack spacing={3}>
          <EmailInput
            value={email}
            errorMessage={emailError}
            onError={setEmailError}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          <PasswordInput
            onError={setPasswordError}
            onChange={e => setPassword(e.target.value)}
            valueBlackList={email && email.includes('@') ? [email, email.split('@')[0]] : []}
            value={password}
            disabled={loading}
          />

          <StyledLink href="/forgot-password">Forgot password?</StyledLink>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!email || !password || !isFormValid || loading}
            sx={{
              py: 1.5,
              mt: 2,
              fontWeight: 700,
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Stack>
      </CardContent>
      <Box
        sx={{
          p: 3,
          pt: 0,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
