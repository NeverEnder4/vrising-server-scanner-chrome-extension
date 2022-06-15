import React from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';

import App from './App';
import { NavigationProvider } from './context/NavigationContext';
import reportWebVitals from './reportWebVitals';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavigationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </NavigationProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
