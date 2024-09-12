'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  InputAdornment,
  Button,
  TextField,
  CardContent,
  Card,
  CardHeader,
  CardActions,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useState, useMemo, ChangeEvent } from 'react';

 export const PASSWORD_STRENGTH_DESCRIPTIONS = ['', 'Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [progressColor, setProgressColor] = useState<'error' | 'warning' | 'success'>('error');

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@$!%.*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      setPasswordError(
        'Password must be at least 8 characters, have 1 lowercase, 1 uppercase, 1 number, and 1 special symbol.',
      );
    } else if (newPassword === email.split('@')[0]) {
      setPasswordError('Password should not be the same as email.');
    } else {
      setPasswordError('');
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!newEmail.match(emailRegex)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password && newConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailError && !passwordError && !confirmPasswordError) {
      alert('Form is valid, submitting...');
      // redirect
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
        <TextField
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
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
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
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
        <TextField
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          sx={{ marginBottom: 1 }}
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
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Sign up
        </Button>
      </CardActions>
    </Card>
  );
}
