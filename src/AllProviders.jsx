import React from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';

import { NavigationProvider } from './context/NavigationContext';
import theme from './theme';

function AllProviders({ children }) {
  return (
    <NavigationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NavigationProvider>
  );
}

AllProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AllProviders;
