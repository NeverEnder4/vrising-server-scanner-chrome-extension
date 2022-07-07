import React from 'react';

import DangerousIcon from '@mui/icons-material/Dangerous';
import {
  Box, Typography, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

const ICON_SIZE = 16;

function ConnectionFailedFooter({ queryFailed, absolute }) {
  const theme = useTheme();

  const absoluteStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  };

  let containerStyles = {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (absolute) containerStyles = { ...containerStyles, ...absoluteStyles };

  if (queryFailed) {
    return (
      <Box
        sx={containerStyles}
      >
        <DangerousIcon
          sx={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            fill: theme.palette.common.white,
            marginRight: theme.spacing(0.5),
          }}
        />
        <Typography variant="body1">Connection Failed</Typography>
      </Box>
    );
  }

  return null;
}

ConnectionFailedFooter.defaultProps = {
  absolute: false,
};

ConnectionFailedFooter.propTypes = {
  queryFailed: PropTypes.bool.isRequired,
  absolute: PropTypes.bool,
};

export default ConnectionFailedFooter;
