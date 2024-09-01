import { createTheme } from '@mui/material/styles';

export const customtheme = createTheme({
    palette: {
      primary: {
        main: '#8bff87', // Light green color for primary
        light: '#ade8f4', // Lighter shade of primary color
        dark: '#00b4d8', // Darker shade of primary color (if needed)
        contrastText: '#000000', // Text color for primary color
      },
      secondary: {
        main: '#007f5f', // Darker green color for secondary
        light: '#2a9d8f', // Lighter shade of secondary color
        dark: '#004d40', // Darker shade of secondary color
        contrastText: '#ffffff', // Text color for secondary color
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