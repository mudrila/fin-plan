'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, keyframes, useColorScheme, useTheme } from '@mui/material';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export default function ThemeModeSwitch() {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();

  const isDark = mode === 'dark';

  return (
    <IconButton
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      sx={{
        position: 'relative',
        color: isDark ? 'white' : theme.palette.primary.main,
        transition: theme.transitions.create(['background-color', 'transform', 'color'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(65, 34, 142, 0.1)',
          transform: 'scale(1.1)',
          '& .theme-icon': {
            animation: `${rotate} 0.5s ease-in-out, ${pulse} 0.5s ease-in-out`,
          },
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)'
            : 'radial-gradient(circle, rgba(65,34,142,0.1) 0%, rgba(65,34,142,0) 70%)',
          opacity: 0,
          transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shortest,
          }),
        },
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      {isDark ? (
        <DarkModeIcon
          className="theme-icon"
          sx={{
            fontSize: '1.5rem',
            transition: theme.transitions.create(['transform', 'color'], {
              duration: theme.transitions.duration.shortest,
            }),
          }}
        />
      ) : (
        <LightModeIcon
          className="theme-icon"
          sx={{
            fontSize: '1.5rem',
            transition: theme.transitions.create(['transform', 'color'], {
              duration: theme.transitions.duration.shortest,
            }),
          }}
        />
      )}
    </IconButton>
  );
}
