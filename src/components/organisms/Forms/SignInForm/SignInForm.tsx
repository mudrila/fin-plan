'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
        minWidth: isMobile ? 'calc(100vw - 32px)' : 600,
        backdropFilter: 'blur(8px)',
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
        <Box sx={{ marginBottom: 3 }}>
          <EmailInput
            value={email}
            errorMessage={emailError}
            onError={setEmailError}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </Box>
        <PasswordInput
          onError={setPasswordError}
          onChange={e => setPassword(e.target.value)}
          valueBlackList={email && email.includes('@') ? [email, email.split('@')[0]] : []}
          value={password}
          showPasswordStrength={false}
          disabled={loading}
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!email || !password || !isFormValid || loading}
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
