import React from 'react';

import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import AddServerForm from './Forms/AddServerForm';

function ServerSettings({ closeModal }) {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[800], minHeight: 418 }}>
      <AddServerForm edit title handleCloseModal={closeModal} />
    </Box>
  );
}

ServerSettings.defaultProps = {
  closeModal: undefined,
};

ServerSettings.propTypes = {
  closeModal: PropTypes.func,
};

export default ServerSettings;
