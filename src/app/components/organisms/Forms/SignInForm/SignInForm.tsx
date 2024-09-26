'use client';

import { Card, CardHeader, CardContent, CardActions, Button, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import EmailInput from '@/app/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/app/components/molecules/Inputs/PasswordInput/PasswordInput';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPending, startTransition] = useTransition();

  const isFormValid = !emailError && !passwordError;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      startTransition(async () => {
        const response = await fetch('/api/auth/sign-in', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else if (!data.error) {
          toast.success('Signed In! You will be redirected to app in a blink of an eye');
          await signIn('email-and-password', {
            redirectTo: '/app',
            email,
            password,
          });
        }
      });
    }
  };

  return (
    <Card
      sx={{
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
        mt: 10,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <CardHeader
        sx={{
          textAlign: 'center',
        }}
        title="Sign In"
      />
      <CardContent>
        <Box sx={{ marginBottom: 3, width: 488 }}>
          <EmailInput
            value={email}
            errorMessage={emailError}
            onError={setEmailError}
            onChange={e => setEmail(e.target.value)}
            disabled={isPending}
          />
        </Box>
        <PasswordInput
          onError={setPasswordError}
          onChange={e => setPassword(e.target.value)}
          valueBlackList={email && email.includes('@') ? [email, email.split('@')[0]] : []}
          value={password}
          showPasswordStrength={false}
          disabled={isPending}
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isFormValid || isPending}
        >
          Sign in
        </Button>
      </CardActions>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          component="span"
          sx={{ marginRight: 1 }}
        >
          {`Don't have an account?`}
        </Typography>
        <Link href="/sign-up">Sign Up</Link>
      </Box>
    </Card>
  );
}
