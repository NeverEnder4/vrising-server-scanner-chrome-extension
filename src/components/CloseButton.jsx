import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const CLOSE_ICON_SIZE = 20;

function CloseButton({
  handleClose, sx,
}) {
  const theme = useTheme();

  return (
    <IconButton
      aria-label="Close Button"
      sx={{
        padding: 0,
        ...sx,
      }}
      onClick={handleClose}
    >
      <CloseIcon
        sx={{
          fill: theme.palette.secondary.light,
          width: CLOSE_ICON_SIZE,
          height: CLOSE_ICON_SIZE,
        }}
      />
    </IconButton>
  );
}
CloseButton.defaultProps = {
  sx: undefined,
};
CloseButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
  sx: PropTypes.shape({
    position: PropTypes.string,
    transform: PropTypes.string,
    right: PropTypes.number,
    top: PropTypes.number,
    zIndex: PropTypes.number,
  }),
};

export default CloseButton;
