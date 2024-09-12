import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, IconButton, LinearProgress, Typography } from '@mui/material';
import { useState, ChangeEvent, useMemo } from 'react';

import { PASSWORD_STRENGTH_DESCRIPTIONS } from '@/constants/content';

interface PasswordInputProps {
  setPasswordError: (error: string) => void;
  setPassword: (password: string) => void;
  setShowPassword: (showPassword: boolean) => void;
  showPassword: boolean;
  email: string;
  password: string;
}

export function PasswordInput({
  setPasswordError,
  setPassword,
  setShowPassword,
  showPassword,
  email,
  password,
}: PasswordInputProps) {
  const [passwordError, setPasswordErrorState] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [progressColor, setProgressColor] = useState<'error' | 'warning' | 'success'>('error');

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%().*?&])[A-Za-z\d@$!%().*?&]{8,}$/;
  const passwordStrengthDescription = useMemo(
    () => PASSWORD_STRENGTH_DESCRIPTIONS[passwordStrength],
    [passwordStrength],
  );

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);

    switch (strength) {
      case 5:
        setProgressColor('success');
        break;
      case 3:
      case 4:
        setProgressColor('warning');
        break;
      default:
        setProgressColor('error');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);

    if (!newPassword.match(passwordRegex)) {
      const errorMessage =
        'Password must be at least 8 characters, have 1 lowercase, 1 uppercase, 1 number, and 1 special symbol';
      setPasswordError(errorMessage);
      setPasswordErrorState(errorMessage);
    } else if (newPassword === email.split('@')[0]) {
      const errorMessage = 'Password should not be the same as email';
      setPasswordError(errorMessage);
      setPasswordErrorState(errorMessage);
    } else {
      setPasswordError('');
      setPasswordErrorState('');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        error={!!passwordError}
        helperText={passwordError}
        type={showPassword ? 'text' : 'password'}
        sx={{ marginBottom: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LinearProgress
        variant="determinate"
        value={(passwordStrength / 5) * 100}
        color={progressColor}
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {`Password strength: ${passwordStrengthDescription}`}
      </Typography>
    </>
  );
}
