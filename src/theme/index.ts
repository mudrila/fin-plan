'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import palette from './colors';
import { aliceFont, latoFont } from './fonts';

declare module '@mui/material/styles' {
  interface Palette {
    gray: Palette['primary'];
  }
  interface PaletteOptions {
    gray: Palette['primary'];
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
        background: {
          default: palette.gray,
          paper: 'rgba(143,150,191,.1)',
        },
        primary: {
          main: palette.primary,
        },
        secondary: {
          main: palette.secondary,
        },
        tertiary: {
          main: palette.tertiary,
        },
        gray: {
          main: palette.gray,
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#121212',
          paper: '#26262b',
        },
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
        root: {
          borderRadius: 4,
        },
      },
    },
  },
} as ThemeOptions);

export default theme;
