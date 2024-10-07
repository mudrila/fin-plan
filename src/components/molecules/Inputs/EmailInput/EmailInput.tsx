import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { emailRegex } from '@/constants/content';

interface EmailInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onError: (errorMessage: string) => void;
  value: string;
  errorMessage: string | null;
  disabled?: boolean;
  required?: boolean;
}

export default function EmailInput({
  onChange,
  onError,
  value,
  errorMessage,
  disabled,
  required = true,
}: EmailInputProps) {
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    onChange(e);

    if (!newEmail.match(emailRegex)) {
      onError('Invalid email format');
    } else {
      onError('');
    }
  };
  return (
    <TextField
      required={required}
      fullWidth
      id="email"
      label="Email"
      name="email"
      value={value}
      disabled={disabled}
      onChange={handleEmailChange}
      error={!!errorMessage}
      helperText={errorMessage}
      autoComplete="email"
    />
  );
}
