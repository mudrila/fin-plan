'use client'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	TextField,
	Button,
	InputAdornment,
	IconButton,
	LinearProgress,
	Typography
} from '@mui/material';
import { useState, ChangeEvent, useMemo } from 'react';

import { PASSWORD_STRENGTH_DESCRIPTIONS } from '../SignUpForm/SingUpForm';

export default function SignInForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [passwordStrength, setPasswordStrength] = useState(0);
  const [progressColor, setProgressColor] = useState<'error' | 'warning' | 'success'>('error');


	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&])[A-Za-z\d@$!%.*?&]{8,}$/;
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

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev)
	}

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newEmail = e.target.value;
    setEmail(newEmail);

		if (!newEmail.match(/^[^\s@]+/)) {
			setEmailError("Email should contain text before '@'")
		} else if (!newEmail.match('@')) {
			setEmailError("Email should contain the '@' symbol");
		} else if (!newEmail.match(/@[^\s@]/)){
			setEmailError("Email should contain a domain after '@'")
		} else if (!newEmail.match(/\.[^\s@]+$/)) {
			setEmailError("Email should contain a domain extension (e.g., '.com')")
		} else {
			setEmailError("")
		}
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		evaluatePasswordStrength(newPassword);

		if (!newPassword.match(passwordRegex)) {
			setPasswordError(
				'Password must be at least 8 characters, have 1 lowercase, 1 uppercase, 1 number, and 1 special symbol',
			);
		} else if (newPassword === email.split('@')[0]) {
			setPasswordError('Password should not be the same as email');
		} else {
			setPasswordError('');
		}
	};

	const isFormValid = () => !emailError && !passwordError;

	const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

		if (isFormValid()) {
			alert('Sign in')
		}
  };

	return (
		<Card
      sx={{
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
				mt: 10
      }}
      component='form'
			onSubmit={handleSubmit}
    >
			<CardHeader
        sx={{
          textAlign: 'center',
        }}
        title='Sign In'
      />
			<CardContent>
				<TextField 
					required
					fullWidth
					id='email'
					label='Email Address'
					value={email}
					onChange={handleEmailChange}
					error={!!emailError}
					helperText={emailError}
					name='email'
					autoComplete='email'
					sx={{ marginBottom: 3 }}
				/>
				<TextField
				required
				fullWidth
				name='password'
      	label='Password'
        id='password'
				value={password}
				onChange={handlePasswordChange}
				error={!!passwordError}
				helperText={passwordError}
				type={showPassword ? 'text' : 'password'}
				sx={{ marginBottom: 3 }}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
							onClick={handleClickShowPassword}
							edge='end'
							>
								{showPassword ? <VisibilityOff />: <Visibility />}
							</IconButton>
						</InputAdornment>
					)
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
			</CardContent>
			<CardActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
					disabled={!isFormValid()}
        >
          Sign in
        </Button>
      </CardActions>

		</Card>
	);
}