'use client';

import { Button, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'sonner';
import { OTPInput } from '../../../molecules/Inputs/OTPInput/OTPInput';
import EmailInput from '@/components/molecules/Inputs/EmailInput/EmailInput';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.errorMessage) {
        toast.error(data.errorMessage);
      }

      if (data.message) {
        toast.success(data.message);
        setEmailSent(true);
      }
    } catch (e) {
      console.error(e, 'Unexpected error while sending code');
      toast.error('Unexpected error while sending code. Please, try again later', {
        duration: 3000,
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
        title="Forgot password"
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
        {!emailSent ? (
          <Stack spacing={3}>
            <EmailInput
              value={email}
              errorMessage={emailError}
              onError={setEmailError}
              onChange={e => setEmail(e.target.value)}
              // disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!email || !!emailError}
              sx={{
                py: 1.5,
                mt: 2,
                fontWeight: 700,
              }}
            >
              Send code
            </Button>
          </Stack>
        ) : (
          <OTPInput email={email} />
        )}
      </CardContent>
    </Card>
  );
}