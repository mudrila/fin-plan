import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
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
import { motion, AnimatePresence } from 'framer-motion';
import { useState, ChangeEvent, useRef } from 'react';
import { passwordRegex } from '@/constants/content';

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

interface PasswordRequirement {
  regex: RegExp;
  label: string;
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { regex: /.{8,}/, label: 'At least 8 characters' },
  { regex: /[A-Z]/, label: 'One uppercase letter' },
  { regex: /[a-z]/, label: 'One lowercase letter' },
  { regex: /[0-9]/, label: 'One number' },
  { regex: /[^A-Za-z0-9]/, label: 'One special character' },
];

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
  required = true,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordError, setPasswordErrorState] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [progressColor, setProgressColor] = useState<'error' | 'warning' | 'success'>('error');
  const inputRef = useRef<HTMLInputElement>(null);

  const evaluatePasswordStrength = (password: string) => {
    const metRequirements = PASSWORD_REQUIREMENTS.filter(req => req.regex.test(password)).length;

    setPasswordStrength(metRequirements);

    switch (metRequirements) {
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
        onFocus={() => setIsFocused(true)}
        onBlur={e => {
          if (!e.relatedTarget?.closest(`#${id}-strength`)) {
            setIsFocused(false);
          }
        }}
        inputRef={inputRef}
      />
      <AnimatePresence>
        {showPasswordStrength && isFocused && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 1,
                backgroundColor: theme =>
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.03)'
                    : 'rgba(255, 255, 255, 0.03)',
              }}
              tabIndex={-1}
            >
              <LinearProgress
                variant="determinate"
                value={(passwordStrength / 5) * 100}
                color={progressColor}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  mb: 2,
                  backgroundColor: theme =>
                    theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 1,
                  }}
                >
                  {PASSWORD_REQUIREMENTS.map((req, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: req.regex.test(value)
                          ? theme => theme.palette.success.main
                          : theme => theme.palette.text.secondary,
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        {req.regex.test(value) ? (
                          <Check fontSize="small" />
                        ) : (
                          <Close fontSize="small" />
                        )}
                      </motion.div>
                      <Typography variant="caption">{req.label}</Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
