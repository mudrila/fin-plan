'use client';

import {
  Button,
  TextField,
  CardContent,
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState, useTransition, FormEvent } from 'react';
import { toast } from 'sonner';
import EmailInput from '@/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/components/molecules/Inputs/PasswordInput/PasswordInput';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, startTransition] = useTransition();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const submitDisabled =
    isPending ||
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !!emailError ||
    !!passwordError ||
    !!confirmPasswordError;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailError && !passwordError && !confirmPasswordError) {
      startTransition(async () => {
        const response = await fetch('/api/auth/sign-up', {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
        const data = await response.json();
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else if (!data.error) {
          const sendResponse = await fetch('/api/send', {
            method: 'POST',
            body: JSON.stringify({
              name,
              email
            }),
          })
          const sendData = await sendResponse.json();
          if (!sendData.errorMessage) {
            toast.success('Signed Up! You will be redirected to app in a blink of an eye');
            await signIn('email-and-password', {
              redirectTo: '/app',
              email,
              password,
            });
          }
        }
      });
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
        title="Sign Up"
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
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={isPending}
          />
          <EmailInput
            value={email}
            errorMessage={emailError}
            onError={setEmailError}
            onChange={e => setEmail(e.target.value)}
            disabled={isPending}
          />
          <PasswordInput
            onError={setPasswordError}
            onChange={e => setPassword(e.target.value)}
            valueBlackList={email && email.includes('@') ? [email, email.split('@')[0]] : []}
            value={password}
            showPasswordStrength
            disabled={isPending}
          />
          <PasswordInput
            onError={setConfirmPasswordError}
            onChange={e => setConfirmPassword(e.target.value)}
            valueBlackList={email && email.includes('@') ? [email, email.split('@')[0]] : []}
            value={confirmPassword}
            showPasswordStrength={false}
            name="confirmPassword"
            label="Confirm Password"
            id="confirm-password"
            isConfirmPassword
            primaryPassword={password}
            disabled={isPending}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitDisabled}
            sx={{
              py: 1.5,
              mt: 2,
              fontWeight: 700,
            }}
          >
            {isPending ? 'Creating account...' : 'Create account'}
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
          Already have an account?{' '}
          <Link
            href="/sign-in"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
