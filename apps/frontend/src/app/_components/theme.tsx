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
        main: '#ff9f00', // Complementary secondary color (a warm color that contrasts with green)
        light: '#ffcc33', // Lighter shade of secondary color
        dark: '#c77d00', // Darker shade of secondary color
        contrastText: '#000000', // Text color for secondary color
      },
      error: {
        main: '#f44336', // Default error color (can be customized)
      },
      warning: {
        main: '#ff9800', // Default warning color (can be customized)
      },
      info: {
        main: '#2196f3', // Default info color (can be customized)
      },
      success: {
        main: '#4caf50', // Default success color (can be customized)
      },
      text: {
        primary: '#333333', // Primary text color
        secondary: '#555555', // Secondary text color
      },
      background: {
        default: '#fafafa', // Default background color
        paper: '#ffffff', // Background color for paper components
      },
    },
  });