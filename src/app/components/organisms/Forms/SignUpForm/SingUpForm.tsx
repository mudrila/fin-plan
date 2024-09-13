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
import { useState } from 'react';

import EmailInput from '@/app/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/app/components/molecules/Inputs/PasswordInput/PasswordInput';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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
        <Box sx={{ marginBottom: 3, width: 488 }}>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Box>
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
          showPasswordStrength={true}
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
          isConfirmPassword={true}
          primaryPassword={password}
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
