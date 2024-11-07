'use client';
import { createTheme, ThemeOptions, alpha } from '@mui/material/styles';
import palette from './colors';
import { aliceFont, latoFont } from './fonts';

declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary'];
    tertiary: {
      main: string;
    };
  }
  interface PaletteOptions {
    gray: PaletteOptions['primary'];
    tertiary: {
      main: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: latoFont.style.fontFamily,
    h1: {
      fontFamily: aliceFont.style.fontFamily,
      fontWeight: 400,
    },
    h2: {
      fontFamily: aliceFont.style.fontFamily,
      fontWeight: 400,
    },
    h3: {
      fontFamily: aliceFont.style.fontFamily,
      fontWeight: 400,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1.125rem',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        background: palette.light.background,
        primary: palette.primary,
        secondary: palette.secondary,
        tertiary: palette.tertiary,
        gray: palette.light.gray,
        text: palette.light.text,
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        background: palette.dark.background,
        primary: palette.dark.primary,
        secondary: palette.dark.secondary,
        tertiary: palette.tertiary,
        gray: palette.dark.gray,
        text: palette.dark.text,
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1.5rem',
          borderRadius: 8,
          textTransform: 'unset',
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(12px)',
          borderRadius: 8,
          border: `1px solid ${
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'
          }`,
          transition: theme.transitions.create(['transform', 'box-shadow', 'background-color'], {
            duration: theme.transitions.duration.shorter,
          }),
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 8px 24px rgba(0, 0, 0, 0.06)'
                : '0 8px 24px rgba(0, 0, 0, 0.24)',
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(18, 18, 18, 0.95)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background:
              theme.palette.mode === 'light'
                ? 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
          },
          ...(theme.palette.mode === 'light' && {
            backgroundColor: 'rgba(245, 245, 250, 0.4)',
          }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          ...(theme.palette.mode === 'light' && {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
          }),
          ...(theme.palette.mode === 'dark' && {
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
          }),
          backdropFilter: 'blur(8px)',
        }),
      },
    },
  },
} as ThemeOptions);

export default theme;
