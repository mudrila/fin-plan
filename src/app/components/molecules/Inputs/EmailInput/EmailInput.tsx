import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface EmailInputProps {
  setEmail: (email: string) => void;
  setEmailError: (emailError: string) => void;
  email: string;
  emailError: string;
}

export function EmailInput({ setEmail, setEmailError, email, emailError }: EmailInputProps) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!newEmail.match(emailRegex)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };
  return (
    <TextField
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      value={email}
      onChange={handleEmailChange}
      error={!!emailError}
      helperText={emailError}
      autoComplete="email"
      sx={{ marginBottom: 3 }}
    />
  );
}
