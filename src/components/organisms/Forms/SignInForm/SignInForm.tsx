'use client';

import { Card, CardHeader, CardContent, Button, Box, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import EmailInput from '@/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/components/molecules/Inputs/PasswordInput/PasswordInput';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = !emailError && !passwordError;

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    if (isFormValid) {
      try {
        const result = await signIn('email-and-password', {
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
        background: theme =>
          theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(18, 18, 18, 0.8)',
        backdropFilter: 'blur(20px)',
        boxShadow: theme =>
          theme.palette.mode === 'light'
            ? '0 8px 32px rgba(0, 0, 0, 0.08)'
            : '0 8px 32px rgba(0, 0, 0, 0.24)',
        border: theme =>
          `1px solid ${
            theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(255, 255, 255, 0.05)'
          }`,
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

          <Link
            href="/forgot-password"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 600,
              marginLeft: 'auto',
            }}
          >
            Forgot password?
          </Link>
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
