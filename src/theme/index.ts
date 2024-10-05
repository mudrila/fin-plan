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

const baseTheme = createTheme({
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
} as ThemeOptions);

const coloredTheme = createTheme(baseTheme, {
  palette: {
    primary: baseTheme.palette.augmentColor({
      color: {
        main: palette.primary,
      },
      name: 'primary',
    }),
    secondary: baseTheme.palette.augmentColor({
      color: {
        main: palette.secondary,
      },
      name: 'secondary',
    }),
    tertiary: baseTheme.palette.augmentColor({
      color: {
        main: palette.tertiary,
      },
      name: 'tertiary',
    }),
    gray: baseTheme.palette.augmentColor({
      color: {
        main: palette.gray,
      },
      name: 'gray',
    }),
  },
});

const lightTheme = createTheme(coloredTheme, {
  palette: {
    mode: 'light',
    background: {
      default: coloredTheme.palette.gray.main,
      paper: coloredTheme.palette.gray.light,
    },
  },
});

export default lightTheme;
