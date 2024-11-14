import { Box, Button, Stack, TextField } from '@mui/material';
import { useState, FormEvent, useRef, ChangeEvent } from 'react';
import { toast } from 'sonner';
import PasswordInput from '../PasswordInput/PasswordInput';

interface OTPInputProps {
  email: string;
}

export function OTPInput({ email }: OTPInputProps) {
  const length = 6;
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [otpValid, setOtpValid] = useState<boolean>(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('Text').slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, index) => {
        newOtp[index] = char;
      });
      setOtp(newOtp);

      const lastFilledIndex = Math.min(pastedData.length, length) - 1;
      inputs.current[lastFilledIndex]?.focus();
    }
    e.preventDefault();
  };

  const handleOtpSubmit = async (event: FormEvent) => {
    const otpCode = otp.join('');

    setLoading(true);
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'PUT',
        body: JSON.stringify({ otp: otpCode, email }),
      });

      const data = await response.json();
      if (data.valid) {
        toast.success('OTP verified successfully');
        setOtpValid(true);
      } else {
        toast.error('OTP code is invalid');
      }
    } catch (e) {
      console.error(e, 'Unexpected error while verifying code');
      toast.error('Unexpected error while verifying code. Please, try again later', {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event: FormEvent) => {
    const otpCode = otp.join('');

    event.preventDefault();

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ otp: otpCode, email, password }),
      });

      const data = await response.json();
      if (data.message) {
        toast.success(data.message);
        window.location.href = `/sign-in`;
      }
      if (data.errorMessage) {
        toast.error(data.errorMessage);
      }
    } catch (e) {
      console.error(e, 'Unexpected error while verifying code');
      toast.error('Unexpected error while verifying code. Please, try again later', {
        duration: 3000,
      });
    }
  };

  return !otpValid ? (
    <Stack
      direction="column"
      spacing={2}
      onPaste={handlePaste}
    >
      <Stack
        direction="row"
        spacing={1}
      >
        {otp.map((_, index) => (
          <TextField
            key={index}
            onKeyDown={e => handleKeyDown(e, index)}
            value={otp[index]}
            onChange={e => handleChange(e, index)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center' },
            }}
            inputRef={el => (inputs.current[index] = el)}
          />
        ))}
      </Stack>
      <Button
        onClick={handleOtpSubmit}
        variant="contained"
        disabled={otp.includes('')}
        sx={{ mt: 2 }}
      >
        Submit code
      </Button>
    </Stack>
  ) : (
    <Box>
      <PasswordInput
        onError={setPasswordError}
        onChange={e => setPassword(e.target.value)}
        valueBlackList={email && email.includes('@') ? [email, email.split('@')[0]] : []}
        value={password}
        showPasswordStrength
        disabled={loading}
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
        disabled={loading}
      />
      <Button
        onClick={handlePasswordSubmit}
        variant="contained"
        size="large"
        disabled={!!passwordError || !!confirmPasswordError || loading}
        sx={{
          py: 1.5,
          mt: 2,
          fontWeight: 700,
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
