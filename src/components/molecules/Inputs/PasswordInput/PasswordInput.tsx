import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  TextField,
  InputAdornment,
  IconButton,
  LinearProgress,
  Typography,
  Box,
} from '@mui/material';
import { useState, ChangeEvent, useMemo } from 'react';

import { PASSWORD_STRENGTH_DESCRIPTIONS, passwordRegex } from '@/constants/content';

interface PasswordInputProps {
  onError: (errorMessage: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  valueBlackList: string[];
  value: string;
  showPasswordStrength?: boolean;
  name?: string;
  label?: string;
  id?: string;
  isConfirmPassword?: boolean;
  primaryPassword?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function PasswordInput({
  onError,
  onChange,
  valueBlackList,
  value,
  showPasswordStrength,
  name = 'password',
  label = 'Password',
  id = 'password',
  isConfirmPassword = false,
  primaryPassword,
  disabled,
  required=true,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordErrorState] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [progressColor, setProgressColor] = useState<'error' | 'warning' | 'success'>('error');

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
    onChange(e);

    if (isConfirmPassword) {
      if (primaryPassword && newPassword !== primaryPassword) {
        const errorMessage = 'Passwords do not match';
        onError(errorMessage);
        setPasswordErrorState(errorMessage);
      } else {
        onError('');
        setPasswordErrorState('');
      }
    } else {
      evaluatePasswordStrength(newPassword);
      if (!passwordRegex.test(newPassword)) {
        const errorMessage =
          'Password must be at least 8 characters, have 1 lowercase, 1 uppercase, 1 number, and 1 special symbol';
        onError(errorMessage);
        setPasswordErrorState(errorMessage);
      } else if (valueBlackList.includes(newPassword)) {
        const errorMessage = 'Password should not be the same as email';
        onError(errorMessage);
        setPasswordErrorState(errorMessage);
      } else {
        onError('');
        setPasswordErrorState('');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <TextField
        required={required}
        fullWidth
        name={name}
        label={label}
        id={id}
        value={value}
        disabled={disabled}
        onChange={handlePasswordChange}
        error={!!passwordError}
        helperText={passwordError}
        type={showPassword ? 'text' : 'password'}
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
      {showPasswordStrength && (
        <>
          <LinearProgress
            variant="determinate"
            value={(passwordStrength / 5) * 100}
            color={progressColor}
            sx={{ height: 10, borderRadius: 5, marginTop: 3 }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {`Password strength: ${passwordStrengthDescription}`}
          </Typography>
        </>
      )}
    </Box>
  );
}
