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
import { useRouter } from 'next/navigation';
import { useState, useTransition, FormEvent } from 'react';
import { toast } from 'sonner';

import EmailInput from '@/app/components/molecules/Inputs/EmailInput/EmailInput';
import PasswordInput from '@/app/components/molecules/Inputs/PasswordInput/PasswordInput';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, startTransition] = useTransition();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const isFormValid = (
    isPending || !name ||  !email || !password || !confirmPassword || !!emailError || !!passwordError || !!confirmPasswordError 
  )
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailError && !passwordError && !confirmPasswordError) {
      startTransition(async () => {
        const response = await fetch('/api/auth/sign-up', {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
        if (data.errorMessage) {
          toast.error(data.errorMessage);
        } else if (!data.error) {
          toast.success('Signed Up! You will be redirected to app in a blink of an eye')
          router.push('/app');
          router.refresh();
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
            disabled={isPending}
          />
        </Box>
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
          showPasswordStrength={true}
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
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isFormValid}
        >
          {isPending ? 'loading...' : 'Sign up'}
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
