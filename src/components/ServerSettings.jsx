import React from 'react';

import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import EditServerForm from './Forms/ServerForms/EditServerForm';

function ServerSettings({ closeModal }) {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[800] }}>
      <EditServerForm title handleCloseModal={closeModal} />
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
