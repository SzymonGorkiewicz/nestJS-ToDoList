import { createTheme } from '@mui/material/styles';

export const customtheme = createTheme({
    palette: {
      primary: {
        main: '#8bff87', // Light green color
        light: '#baff9c', // Lighter shade of primary color
        dark: '#6abf6a', // Darker shade of primary color
        contrastText: '#000000', // Text color for primary color
      },
      secondary: {
        main: '#ff9f00', 
        light: '#ffcc33', 
        dark: '#c77d00', 
        contrastText: '#000000', 
      },
      error: {
        main: '#f44336', 
      },
      warning: {
        main: '#ff9800', 
      },
      info: {
        main: '#2196f3', 
      },
      success: {
        main: '#4caf50', 
      },
      text: {
        primary: '#333333',
        secondary: '#555555',
      },
      background: {
        default: '#fafafa',
        paper: '#ffffff', 
      },
    },
  });