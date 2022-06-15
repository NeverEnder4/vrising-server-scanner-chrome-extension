import React from 'react';

import ErrorIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

function HelperText({ helperText, error }) {
  const theme = useTheme();
  const ERROR_COLOR = theme.palette.error.main;
  const ICON_SIZE = 12;

  if (!error || !helperText) return null;

  return (
    <Box
      role="alert"
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(0.5),
      }}
    >
      <ErrorIcon
        sx={{
          fill: ERROR_COLOR,
          width: ICON_SIZE,
          height: ICON_SIZE,
          marginRight: theme.spacing(0.5),
        }}
      />
      <Typography variant="body2" sx={{ color: ERROR_COLOR, fontSize: 12 }}>
        {helperText}
      </Typography>
    </Box>
  );
}

HelperText.defaultProps = {
  helperText: '',
  error: false,
};

HelperText.propTypes = {
  helperText: PropTypes.string,
  error: PropTypes.bool,
};

export default HelperText;
