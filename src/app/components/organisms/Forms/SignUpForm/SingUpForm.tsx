'use client';

import {
  Button,
  TextField,
  CardContent,
  Card,
  CardHeader,
  CardActions,
  Box,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';

import { EmailInput } from '@/app/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/app/components/molecules/Inputs/PasswordInput/PasswordInput';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password && newConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailError && !passwordError && !confirmPasswordError) {
      alert('Form is valid, submitting...');
      // redirect
    }
  };

  return (
    <Card
      sx={{
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <CardHeader
        sx={{
          textAlign: 'center',
        }}
        title="Sign Up"
      />
      <CardContent>
        <TextField
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
        <EmailInput
          value={email}
          errorMessage={emailError}
          onError={setEmailError}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordInput
          onError={setPasswordError}
          onChange={e => setPassword(e.target.value)}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          email={email}
          value={password}
        />
        <TextField
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          sx={{ marginBottom: 1 }}
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Sign up
        </Button>
      </CardActions>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          component="span"
          sx={{ marginRight: 1 }}
        >
          Already have an account?
        </Typography>
        <Link href="/sign-in">Sign In</Link>
      </Box>
    </Card>
  );
}
