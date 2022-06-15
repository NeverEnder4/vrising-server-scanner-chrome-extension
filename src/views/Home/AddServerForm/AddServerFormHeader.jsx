import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import StorageIcon from '@mui/icons-material/Storage';
import {
  Box, Typography, IconButton, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

const STORAGE_ICON_SIZE = 14;
const CLOSE_ICON_SIZE = 20;

function AddServerFormHead({ closeModal, titleId }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StorageIcon
          sx={{
            fill: theme.palette.secondary.light,
            width: STORAGE_ICON_SIZE,
            height: STORAGE_ICON_SIZE,
            marginRight: theme.spacing(1),
          }}
        />
        <Typography
          sx={{ color: theme.palette.secondary.light }}
          variant="body2"
          id={titleId}
        >
          ADD SERVER
        </Typography>
      </Box>
      <IconButton
        aria-label="Close Button"
        sx={{ padding: 0 }}
        onClick={closeModal}
      >
        <CloseIcon
          sx={{
            fill: theme.palette.secondary.light,
            width: CLOSE_ICON_SIZE,
            height: CLOSE_ICON_SIZE,
          }}
        />
      </IconButton>
    </Box>
  );
}

AddServerFormHead.defaultProps = {
  titleId: undefined,
};

AddServerFormHead.propTypes = {
  closeModal: PropTypes.func.isRequired,
  titleId: PropTypes.string,
};

export default AddServerFormHead;
