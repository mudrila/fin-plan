'use client';

import { Button, Card, CardContent, CardHeader, Stack, useTheme } from '@mui/material';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import EmailInput from '@/components/molecules/Inputs/EmailInput/EmailInput';
import { OTPInput } from '@/components/molecules/Inputs/OTPInput/OTPInput';
import{ paperDarkBackground, paperDarkBorder, paperDarkBoxShadow, paperLightBackground, paperLightBorder, paperLightBoxShadow } from '@/theme/tokens';

export default function ForgotPasswordForm() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
        background:
          theme.palette.mode === 'light'
            ? paperLightBackground
            : paperDarkBackground,
        backdropFilter: 'blur(20px)',
        boxShadow:
          theme.palette.mode === 'light'
          ? paperLightBoxShadow
          : paperDarkBoxShadow,
          border: `1px solid ${
          theme.palette.mode === 'light' ? paperLightBorder : paperDarkBorder
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
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!email || !!emailError || loading}
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
