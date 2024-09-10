'use client'

import { InputAdornment, Box, Button, TextField, Stack, Card , IconButton, Link} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

import SignUpContainer from "@/app/components/sign-up-container"; 

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@$!%.*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let valid = true;

    if (email.match(emailRegex)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (!password.match(passwordRegex)) {
      setPasswordError(
        'Password must be at least 8 characters, have 1 lowercase, 1 uppercase, 1 number, and 1 special symbol.'
      );
      valid = false;
    } else if (password === email.split("@")[0]){
      setPasswordError(
        'Password should not be the same as email.'
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password === confirmPassword) {
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      alert('Form is valid, submitting...');
      // redirect
      
    }
  };
  return (
    <SignUpContainer>
      <Card variant="outlined" sx={{ p: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Stack spacing={2}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={formSubmitted}
              helperText={formSubmitted}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError && formSubmitted}
              helperText={formSubmitted && emailError}
              autoComplete="email"
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError && formSubmitted}
              helperText={formSubmitted && passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError && formSubmitted}
              helperText={formSubmitted && confirmPasswordError}
            />
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onSubmit={validateForm}
          >
            Sign up
          </Button>
        </Box>
      </Card>

    </SignUpContainer>
  );
}
