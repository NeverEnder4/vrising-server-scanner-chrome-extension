import React from 'react';

import {
  Box, Typography, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

import CloseButton from '../../CloseButton';

const DEFAULT_ICON_SIZE = 14;

function ModalHeader({ title, renderIcon, handleClose }) {
  const theme = useTheme();

  const titleIcon = typeof renderIcon === 'function'
    ? renderIcon({
      fill: theme.palette.secondary.light,
      width: DEFAULT_ICON_SIZE,
      height: DEFAULT_ICON_SIZE,
      marginRight: theme.spacing(1),
    })
    : null;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: theme.palette.common.black,
        padding: theme.spacing(2, 3),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {titleIcon}
        <Typography
          sx={{ color: theme.palette.secondary.light }}
          variant="body2"
          id={title}
        >
          {title}
        </Typography>
      </Box>
      <CloseButton handleClose={handleClose} />
    </Box>
  );
}

ModalHeader.defaultProps = {
  renderIcon: undefined,
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  renderIcon: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
};

export default ModalHeader;
