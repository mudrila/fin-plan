// Base colors
const primary = '#41228e';
const secondary = '#123456';
const tertiary = '#542cb7';
const lightPrimary = '#6d44d2';

// Light theme colors
const lightBackground = '#ffffff';
const lightPaper = 'rgba(255, 255, 255, 0.8)';
const lightGray = '#f5f5f7';
const lightText = {
  primary: 'rgba(0, 0, 0, 0.87)',
  secondary: 'rgba(0, 0, 0, 0.6)',
};

// Dark theme colors
const darkBackground = '#121212';
const darkPaper = '#1e1e24';
const darkGray = '#2d2d35';
const darkText = {
  primary: '#ffffff',
  secondary: 'rgba(255, 255, 255, 0.7)',
};

const palette = {
  // Base colors
  primary: {
    main: primary,
    light: lightPrimary,
    dark: tertiary,
    contrastText: '#ffffff',
  },
  secondary: {
    main: secondary,
    contrastText: '#ffffff',
  },
  tertiary: {
    main: tertiary,
  },

  // Light theme
  light: {
    background: {
      default: lightBackground,
      paper: lightPaper,
    },
    gray: {
      main: lightGray,
    },
    text: lightText,
  },

  // Dark theme
  dark: {
    background: {
      default: darkBackground,
      paper: darkPaper,
    },
    gray: {
      main: darkGray,
    },
    text: darkText,
    primary: {
      main: lightPrimary,
      light: primary,
      dark: tertiary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64b5f6',
      contrastText: '#ffffff',
    },
  },
};

export default palette;
