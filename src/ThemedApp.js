import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Example blue color
    },
    secondary: {
      main: '#28a745', // Example green color
    },
    background: {
      default: '#fff', // White background
    },
    text: {
      primary: '#007bff', // Blue text for primary actions or headings
      secondary: '#28a745', // Green text for secondary information or accents
    },
  },
  // Add any additional customization here
});

function ThemedApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <App />
    </ThemeProvider>
  );
}

export default ThemedApp;
