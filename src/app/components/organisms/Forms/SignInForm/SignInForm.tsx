'use client';

import { Card, CardHeader, CardContent, CardActions, Button, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import EmailInput from '@/app/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/app/components/molecules/Inputs/PasswordInput/PasswordInput';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isFormValid = !emailError && !passwordError;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      alert('Sign in');
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
          />
        </Box>
        <PasswordInput
          onError={setPasswordError}
          onChange={e => setPassword(e.target.value)}
          valueBlackList={email && email.includes('@') ? [email, email.split('@')[0]] : []}
          value={password}
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isFormValid}
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
