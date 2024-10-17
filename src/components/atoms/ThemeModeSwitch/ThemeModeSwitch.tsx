'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, useColorScheme, useTheme } from '@mui/material';

export default function ThemeModeSwitch() {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      sx={{ color: mode === 'dark' ? 'white' : theme.palette.primary.main }}
    >
      {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
