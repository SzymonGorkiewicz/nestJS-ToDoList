import { createTheme } from '@mui/material/styles';

export const customtheme = createTheme({
    palette: {
      primary: {
        main: '#DBB5B5',
        light: '#baff9c', 
        dark: '#C39898', 
        contrastText: '#000000', 
      },
      secondary: {
        main: '#987070', 
        light: '#F1E5D1', 
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
        default: '#F1E5D1',
        paper: '#ffffff', 
      },
    },
  });