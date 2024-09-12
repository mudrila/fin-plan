'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Link,
} from '@mui/material';
import { useState } from 'react';

import { EmailInput } from '@/app/components/molecules/Inputs/EmailInput/EmailInput';
import { PasswordInput } from '@/app/components/molecules/Inputs/PasswordInput/PasswordInput';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const isFormValid = () => !emailError && !passwordError;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
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
        <EmailInput
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          setEmailError={setEmailError}
        />
        <PasswordInput
          setPasswordError={setPasswordError}
          setPassword={setPassword}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          email={email}
          password={password}
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isFormValid()}
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
          Don&apos;t have an account?
        </Typography>
        <Link
          href="/sign-up"
          underline="none"
          variant="body2"
          color="primary"
        >
          Sign Up
        </Link>
      </Box>
    </Card>
  );
}
