'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';
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
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
} as ThemeOptions);

export default theme;
