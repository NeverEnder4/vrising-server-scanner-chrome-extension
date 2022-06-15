import React from 'react';

import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import Header from './Header';

function PopupLayout({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 470,
        height: 586,
        backgroundColor: theme.palette.grey[800],
        border: `4px solid ${theme.palette.common.white}`,
        boxShadow: theme.shadows[1],
        position: 'relative',
      }}
    >
      <Header />
      {children}
    </Box>
  );
}

PopupLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PopupLayout;
